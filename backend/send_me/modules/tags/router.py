import uuid

import yaml
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

import send_me.modules.opportunities.models as opps_models
from send_me.database.engine import get_db

from . import models, schemas

TAGS_FILE = "./tags.yaml"

router = APIRouter(
    tags=["tags"],
    responses={404: {"description": "Not found"}},
)


@router.get(
    "/tags",
    response_model=list[schemas.Tag],
    operation_id="list_tags",
)
# Get all tags data to list on Opps page
def get_tags():
    with open(TAGS_FILE) as file:
        tags = yaml.safe_load(file)
    return tags


# Backend route to get tags associated with a certain opportunity
def get_opportunity_tags(
    opportunity_id: uuid.UUID,
    db: Session = Depends(get_db),
):
    # Check if the requested opportunity exists
    opportunity = db.query(opps_models.Opportunity).where(
        opps_models.Opportunity.id == opportunity_id
    )
    if not opportunity:
        raise HTTPException(status_code=404, detail="Opportunity not found")

    query = select(models.OpportunityTags.tag_id).where(
        models.OpportunityTags.opportunity_id == opportunity_id
    )

    opportunity_tag_list = db.execute(query)

    return opportunity_tag_list
