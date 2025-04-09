from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from send_me.database.engine import get_db

from . import models, schemas

import uuid
from datetime import datetime, timedelta

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

@router.post("/opportunities/seed",status_code=201,operation_id="seed_opportunities")
def seed_opportunities(
    db: Session = Depends(get_db),
):
    sample_opps = [ 
        models.Opportunity(
            name="Tech Internship Program",
            description="A summer internship for students interested in backend engineering.",
            short_description="Summer backend internship.",
            location="Remote",
            event_date=datetime(2025, 6, 1),
        ),
        models.Opportunity(
            name="AI Research Fellowship",
            description="A fellowship for students interested in AI research.",
            short_description="AI research fellowship.",
            location="New York",
            event_date=datetime(2025, 8, 15),
        ),
    ]

    db.add_all(sample_opps)
    db.commit()
    db.flush()
    # models.Opportunity(
    #     name="Women in Tech Scholarship",
    #     description="Scholarship for women pursuing STEM degrees.",
    #     short_description="Support for women in STEM.",
    #     location="Online",
    #     event_date=(2025, 12, 14),
    # )

    return {"message": f"Seeded {len(sample_opps)} opportunities"}
