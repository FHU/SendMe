import uuid
import yaml

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from send_me.database.engine import get_db
import send_me.modules.tags.schemas as tags_schemas
import send_me.modules.tags.models as tags_models

from . import models, schemas

TAGS_FILE = "../tags/tags.yaml"

router = APIRouter(
    tags=["opportunities"],
    responses={404: {"description": "Not found"}},
)

"""
The handler to create an opportunity. PLEASE PUT STATIC DATA IN THE router.get FUNCTION
"""


@router.post(
    "/opportunities",
    response_model=schemas.Opportunity,
    status_code=201,
    operation_id="create",
)
def create_opportunity(
    input: schemas.CreateOpportunityRequest,
    db: Session = Depends(get_db),
):
    # Create the opportunity from the input schema.
    item = models.Opportunity(
        name=input.name,
        description=input.description,
    )
    # Add the item to the database.
    db.add(item)

    # This sends all the database operations to the database,
    # but doesn't yet commit them. Other connecting clients will
    # not see this new item until it's committed, which is done
    # in database/engine.py.
    db.flush()
    # The object (item) will be invalid at this point.

    # Refresh it and return it, now with the id and create time.
    db.refresh(item)
    return item


@router.post(
    "/opportunities/{opportunity_id}/tags",
    response_model=list[tags_schemas.OpportunityTags],
    status_code=201,
    operation_id="create_opportunity_tags",
)
def create_opportunity_tag(
    input: list[tags_schemas.CreateOpportunityTagsRequest],
    opportunity_id: uuid.UUID,
    db: Session = Depends(get_db),
):
    opportunity = db.scalars(select(models.Opportunity).where(
        models.Opportunity.id == opportunity_id
    ))

    # Check if the opportunity exists
    if not opportunity:
        raise HTTPException(status_code=404, detail="Opportunity not found")

    with open(TAGS_FILE) as file:
        tags_yaml = yaml.safe_load(file)

    opportunity_tags_added = []

    # Validate the tags against the YAML file
    for item in input:
        matching = [t for t in tags_yaml if t["id"] == item.tag]

        if not matching:
            raise HTTPException(status_code=404, detail="Tag not found")


        # Create the OpportunityTag from the input schema.
        assoc = models.OpportunityTags(
            opportunity_id = opportunity_id,
            tag_id = item.tag
        )
        db.add(assoc)
        opportunity_tags_added.append(assoc)

    # This sends all the database operations to the database,
    # but doesn't yet commit them. Other connecting clients will
    # not see this new item until it's committed, which is done
    # in database/engine.py.
    db.flush()

    for opp_tag in opportunity_tags_added:
        db.refresh(opp_tag)

    return opportunity_tags_added

@router.get(
    "/opportunities/{opportunity_id}/tags",
    response_model = list[tags_schemas.Tag],
    operation_id = "list_opp_tags",
)
# Backend route to get tags for a certain opportunity
def get_opportunity_tags(
    opportunity_id: uuid.UUID,
    db: Session = Depends(get_db),
):
    # Check if the requested opportunity exists
    opportunity = db.scalars(models.Opportunity).where(
        models.Opportunity.id == opportunity_id
    )
    if not opportunity:
        raise HTTPException(status_code=404, detail="Opportunity not found")

    tag_ids_for_opp = db.execute(select(
        tags_models.OpportunityTags.tag_id).where
        (tags_models.OpportunityTags.opportunity_id == opportunity_id))

    opp_tags = []

    with open(TAGS_FILE) as tags_file:
        all_tags = yaml.safe_load(tags_file)
        for opp_tag in tag_ids_for_opp:
            for tag in all_tags:
                if tag["id"] == opp_tag.tag_id:
                    opp_tags.append(tag["name"])

    return opp_tags


"""
This handler just gets a simple list of the opportunities.
"""

@router.get(
    "/opportunities",
    response_model=list[schemas.Opportunity],
    operation_id="list_opportunities",
)
def get_opportunities(
    db: Session = Depends(get_db),
):
    # This is a very basic select request with sqlaclhemy.
    query = select(models.Opportunity).order_by(models.Opportunity.created_at.desc())

    # Any conditions in the future should be added here.

    result = db.execute(query).scalars().all()

    return result
