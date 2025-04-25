import uuid
import yaml

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from send_me.database.engine import get_db
import send_me.modules.opportunities.models as opps_models

from . import schemas

TAGS_FILE = "./tags.yaml"

router = APIRouter(
    tags=["opportunity_tags"],
    responses={404: {"description": "Not found"}},
)


@router.get(
    "/tags",
    response_model=list[schemas.Tag],
    operation_id="list_all_tags",
)
# Get all tags data to list on Opps page
def get_tags():
    with open(TAGS_FILE) as file:
        tags = yaml.safe_load(file)
    return tags
