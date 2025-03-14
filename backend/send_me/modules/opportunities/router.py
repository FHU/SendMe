from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from send_me.database.engine import get_db

from . import models, schemas

router = APIRouter(
    tags=["opportunities", "conversation/tags"],
    responses={404: {"description": "Not found"}},
)

"""
The handler to create an opportunity.
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
    "/opportunities", response_model=list[schemas.Opportunity], operation_id="list"
)
def get_opportunities(
    db: Session = Depends(get_db),
):
    # This is a very basic select request with sqlaclhemy.
    query = select(models.Opportunity).order_by(models.Opportunity.created_at.desc())

    # Any conditions in the future should be added here.

    result = db.execute(query).scalars().all()

    return result


@router.get(
    "/conversation/tags", response_model=list[schemas.ConversationTag], operation_id="list_tags"
)
def get_conversation_tags(
    db: Session = Depends(get_db),
):
    return [
        schemas.ConversationTag(
            id=0,
            user_name="John Smith",
            user_profile_picture="/images/christian-buehner-DItYlc26zVI-unsplash.jpg",
            timestamp="3:50 PM",
            message_preview="Hey! I heard about Servant's Day and would love to contribute...",
            read_message=True,
            conversation=[
                schemas.ConversationMessage(
                    id=0,
                    text="Hey! I heard about Servant’s Day and I would love to contribute. Do you have any open projects?",
                    timestamp="3:50 PM",
                    is_user=False
                ),
                schemas.ConversationMessage(
                    id=1,
                    text="We desperately need people to paint Bradfield Hall’s lobby if you’re interested.",
                    timestamp="3:52 PM",
                    is_user=True
                ),
                schemas.ConversationMessage(
                    id=2,
                    text="That sounds great! I have lots of experience painting so I think I could be a good fit. What’s the next step?",
                    timestamp="3:53 PM",
                    is_user=False
                ),
            ]
        ),
        schemas.ConversationTag(
            id=1,
            user_name="Clara Donovan",
            user_profile_picture="/images/microsoft-365-7mBictB_urk-unsplash.jpg",
            timestamp="1:23 PM",
            message_preview="Hello! My name is Clara and I was wondering if there might...",
            read_message=True,
            conversation=[
                schemas.ConversationMessage(
                    id=1,
                    text="Hello! My name is Clara and I was wondering if there might be an opening for volunteers?",
                    timestamp="1:23 PM",
                    is_user=False
                ),
                schemas.ConversationMessage(
                    id=2,
                    text="Sure! We’re always looking for volunteers to help around the church.",
                    timestamp="1:25 PM",
                    is_user=True
                ),
            ]
        ),
        schemas.ConversationTag(
            id=2,
            user_name="Estes Church of Christ",
            user_profile_picture="/images/cosmic-timetraveler-_R1cc2IHk70-unsplash.jpg",
            timestamp="2:40 AM",
            message_preview="We have an opening for a 5th grade teacher. We saw you had...",
            read_message=False,
            conversation=[
                schemas.ConversationMessage(
                    id=2,
                    text="We have an opening for a 5th grade teacher. We saw you had experience with teaching children. Would you be interested?",
                    timestamp="2:40 AM",
                    is_user=False
                ),
                schemas.ConversationMessage(
                    id=3,
                    text="Thank you for reaching out! I’m interested. Can you provide more details about the position?",
                    timestamp="2:45 AM",
                    is_user=True
                ),
            ]
        ),
        schemas.ConversationTag(
            id=3,
            user_name="Henderson Church of Christ",
            user_profile_picture="/images/karl-fredrickson-JRsZWmRd_Ws-unsplash.jpg",
            timestamp="9:00 AM",
            message_preview="We wanted to take a moment to thank you for your incredible...",
            read_message=False,
            conversation=[
                schemas.ConversationMessage(
                    id=3,
                    text="We wanted to take a moment to thank you for your incredible work in the community. Your support means a lot to us!",
                    timestamp="9:00 AM",
                    is_user=False
                ),
                schemas.ConversationMessage(
                    id=4,
                    text="You're very welcome! I’m always happy to help out. I appreciate the recognition.",
                    timestamp="9:10 AM",
                    is_user=True
                ),
            ]
        ),
    ]
