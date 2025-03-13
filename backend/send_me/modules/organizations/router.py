from fastapi import APIRouter, Depends
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
    "/organizations",
    response_model=list[schemas.Organization],
    operation_id="list_organizations",
)
def get_organizations(
    db: Session = Depends(get_db),
):
    return [
        schemas.Organization(
            id=0,
            name="Oak Tree Church of Christ",
            location="Dallas, TX, USA",
            type="church",
            description="Dedicated gathering of Christians striving to live life according to the pattern and direction of Jesus and the Apostles!",
            created_at="2025-03-05T11:20:00Z",
        ),
        schemas.Organization(
            id=1,
            name="Hope Haven Community Center",
            location="Houston, TX, USA",
            type="nonprofit",
            description="A faith-based community center providing resources, mentorship, and outreach programs for families in need.",
            created_at='2025-04-13T03:52:07.492266Z',
        ),
        schemas.Organization(
            id=2,
            name="New Light Church of Christ",
            location="Atlanta, GA, USA",
            type="church",
            description="A welcoming congregation focused on worship, discipleship, and community service to spread the message of Christ.",
            created_at="2025-03-13T03:52:07.492266Z",
        ),
    ]
