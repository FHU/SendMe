import uuid
import yaml

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

import send_me.modules.tags.schemas as tags_schemas
from send_me.database.engine import get_db

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
        matching = [t for t in tags_yaml if t["id"] == item.tag_id]

        if not matching:
            raise HTTPException(status_code=404, detail="Tag not found")


        # Create the OpportunityTag from the input schema.
        assoc = models.OpportunityTags(
            opportunity_id = opportunity_id,
            tag_id = item.tag_id
        )
        db.add(assoc)
        opportunity_tags_added.append(assoc)
    for item in input:
        row = tags_schemas.OpportunityTags(
            opportunity=input.opportunity_id,
            tag=input.tag_id,
        )
    
    # This sends all the database operations to the database,
    # but doesn't yet commit them. Other connecting clients will
    # not see this new item until it's committed, which is done
    # in database/engine.py.
    db.flush()

    for opp_tag in opportunity_tags_added:
        db.refresh(opp_tag)
        
    return opportunity_tags_added


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
