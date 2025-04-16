from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
import uuid

from send_me.database.engine import get_db

from . import models, schemas
import send_me.modules.tags.models as tags_models
import send_me.modules.tags.schemas as tags_schemas

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
    "/opportunities/{opportunity_id}/tags/{tag_id}",
    response_model=tags_schemas.OpportunityTags,
    status_code=201,
    operation_id="create_opportunity_tags"
)
def create_opportunity_tag(
    input: tags_schemas.OpportunityTags,
    opportunity_id: uuid.UUID,
    tag_id: int,
    db: Session = Depends(get_db),
):
    opportunity = db.query(models.Opportunity).where(models.Opportunity.id == opportunity_id)

    #Check if the opportunity exists
    if not opportunity:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    
    tag = db.query(tags_models.Tag).where(tags_models.Tag.id == tag_id)

    #Check if the tag exists
    if not tag:
        raise HTTPException(status_code=404, detail="Tag not found")
    
    # Create the OpportunityTag from the input schema.
    item = tags_schemas.OpportunityTags(
        opportunity=input.opportunity_id,
        tag = input.tag_id,
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
