from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session
import uuid

from send_me.database.engine import get_db
from send_me.modules.authentication.dependencies import get_user
from send_me.modules.users.models import User

from . import models, schemas

router = APIRouter(
    tags=["conversations"],
    responses={404: {"description": "Not found"}},
    prefix="/conversation"
)

# List Conversations
@router.get("/", response_model=list[schemas.Conversation], operation_id="getAllConversations")
def get_conversations(db: Session = Depends(get_db), user: User = Depends(get_user)):
    query = select(models.Conversation).where(user in models.Conversation.users).order_by(models.Conversation.created_at.desc())

    # Can throw an error -- deal with later
    conversations = db.execute(query).scalars().all()

    return conversations

# List messages in a conversation
@router.get("/messages/{conversation_id}", response_model=list[models.Message], operation_id="getMessagesInConversation")
def get_messages(conversation_id: uuid.UUID,db: Session = Depends(get_db), user: User = Depends(get_user)):
    query = select(models.Message).where(models.Message.conversation_id == conversation_id, user in models.Message.conversation.users)

    # This can cause errors. Deal with later
    messages = db.execute(query).scalars().all()

    return messages

# Creating messages
# Creating Conversations