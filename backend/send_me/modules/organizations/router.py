from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from send_me.database.engine import get_db

from . import models, schemas

router = APIRouter(
    tags=["oorganizations"],
    responses={404: {"description": "Not found"}},
)

"""
The handler to create an organization.
"""


@router.post(
    "/organizations",
    response_model=schemas.Organization,
    status_code=201,
    operation_id="create",
)
def create_organization(
    input: schemas.CreateOrganizationRequest,
    db: Session = Depends(get_db),
):
    # Create the organization from the input schema.
    item = models.Organization(
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


"""
This handler just gets a simple list of the opportunities.
"""


@router.get(
    "/organizations", response_model=list[schemas.Organization], operation_id="list"
)
def get_organizations(
    db: Session = Depends(get_db),
):
    # This is a very basic select request with sqlaclhemy.
    query = select(models.Organization).order_by(models.Organization.created_at.desc())

    # Any conditions in the future should be added here.

    result = db.execute(query).scalars().all()

    return result
