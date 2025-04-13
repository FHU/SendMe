# This import is for testing
import secrets
import uuid
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy import select
from sqlalchemy.orm import Session as DatabaseSession

from send_me.database.engine import get_db
from send_me.modules.authentication.dependencies import get_user
from send_me.modules.authentication.models import Session
from send_me.modules.users.models import User

from . import models, schemas

router = APIRouter(
    tags=["conversations"],
    responses={404: {"description": "Not found"}},
    prefix="/conversations",
)


# List Conversations
@router.get(
    "/",
    response_model=list[schemas.Conversation],
    operation_id="getAllConversations",
)
def get_conversations(
    db: DatabaseSession = Depends(get_db), user: User = Depends(get_user)
):
    query = (
        select(models.Conversation)
        .where(models.Conversation.users.contains(user))
        .order_by(models.Conversation.last_updated.desc())
    )

    # Can throw an error -- deal with later
    conversations = db.execute(query).scalars().all()

    return conversations


@router.get(
    "/{conversation_id}",
    response_model=schemas.Conversation,
    operation_id="getConversation",
)
def get_conversation(
    conversation_id: uuid.UUID,
    db: DatabaseSession = Depends(get_db),
    user: User = Depends(get_user),
):
    query = select(models.Conversation).where(
        models.Conversation.id == conversation_id,
        models.Conversation.users.contains(user),
    )

    conversation = db.execute(query).scalars().one()

    return conversation


# TODO
# Creating messages
@router.post(
    "/conversation/{conversation_id}/messages",
    operation_id="createMessage",
    status_code=201,
    response_model=schemas.Message,
)
def create_message(
    conversation_id: uuid.UUID,
    input: schemas.CreateMessageRequest,
    db: DatabaseSession = Depends(get_db),
    user: User = Depends(get_user),
):
    conversation = db.get(models.Conversation, conversation_id)

    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")

    if user not in conversation.users:
        raise HTTPException(status_code=403, detail="User not in conversation")

    if input.content == "":
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    message = models.Message(
        content=input.content,
        sender=user,
        conversation=conversation,
    )

    # When the db session is returned to the get_db function, the conversation change will be committed.
    conversation.last_updated = datetime.now()

    db.add(message)
    db.flush()
    db.refresh(message)

    return message


# Creating Conversations
@router.post(
    "/conversation",
    operation_id="createConversation",
    status_code=201,
    response_model=schemas.Conversation,
)
def create_conversation(
    input: schemas.CreateConversationRequest,
    db: DatabaseSession = Depends(get_db),
    user: User = Depends(get_user),
):
    reciever = db.get(User, input.reciever_id)

    if not reciever:
        raise HTTPException(status_code=404, detail="Reciever not found")

    conversation = models.Conversation(users=[user, reciever])

    db.add(conversation)
    db.flush()
    db.refresh(conversation)

    return conversation


# Route to seed db for testing
@router.post("/seed", operation_id="seedConversations", status_code=201)
def seed_dummy_data(response: Response, db: DatabaseSession = Depends(get_db)):
    # Create Users
    user1 = User(
        email="alice@example.com",
        display_name="Alice",
        location="Wonderland",
        bio="Explorer of the unreal",
        profile_picture=None,
    )
    user2 = User(
        email="bob@example.com",
        display_name="Bob",
        location="Builderland",
        bio="Can we fix it? Yes, we can!",
        profile_picture=None,
    )

    db.add_all([user1, user2])
    db.flush()
    db.refresh(user1)
    db.refresh(user2)

    conversation = models.Conversation(users=[user1, user2])

    db.add(conversation)
    db.flush()
    db.refresh(conversation)

    # Create Messages
    message1 = models.Message(
        sender_id=user1.id,
        conversation_id=conversation.id,
        content="Hey Bob, how’s it going?",
        sender=user1,
        conversation=conversation,
        created_at=datetime.now(),
    )

    message2 = models.Message(
        sender_id=user2.id,
        conversation_id=conversation.id,
        content="Good Alice! Building stuff as usual.",
        sender=user2,
        conversation=conversation,
        created_at=datetime.now(),
    )

    db.add_all([message1, message2])
    db.flush()
    db.refresh(message2)  # Use the second message as newest

    # Update conversation with actual newest message ID
    # conversation.newest_message_id = message2.id
    conversation.last_updated = message2.created_at

    db.add(conversation)
    db.flush()

    # Create session for testing endpoints
    session = Session(session_token=secrets.token_urlsafe(32), user_id=user1.id)

    db.add(session)

    response.set_cookie(
        key="token", value=session.session_token, httponly=True, samesite="strict"
    )

    return {"message": "Dummy data seeded successfully"}
