from datetime import datetime
from typing import List, Type
from uuid import UUID

from send_me.modules.users.models import User
from send_me.schemas import SendMeModel

from . import models


class GetConversationsResponse(SendMeModel):
    conversations: List[Type[models.Conversation]]


class GetMessagesResponse(SendMeModel):
    messages: List[Type[models.Message]]


class Conversation(SendMeModel):
    id: UUID
    newest_message_id: UUID
    last_updated: datetime
    created_at: datetime
    newest_message: Type[models.Message]
    users: List[Type[User]]


class Message(SendMeModel):
    id: UUID
    sender_id: UUID
    conversation_id: UUID
    content: str

    sender: Type[User]
    conversation: Type[models.Conversation]

    created_at: datetime
