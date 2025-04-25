import yaml

from fastapi import APIRouter

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
