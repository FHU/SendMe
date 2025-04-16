import uuid

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session
import yaml

from send_me.database.engine import get_db
from . import models, schemas

TAGS_FILE = './tags.yaml'

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
@router.get(
    "/tags/{opportunity_id}",
    response_model = list[schemas.Tag],
    operation_id = "get_opportunity_tags",
)
def get_opportunity_tags(
    opportunity_id: uuid.UUID,
    db: Session = Depends(get_db),
):
    query = select(models.OpportunityTags.tag_id).where(
        models.OpportunityTags.opportunity_id == opportunity_id)

    opportunity_tag_list = db.execute(query)

    return opportunity_tag_list
