from datetime import datetime
from typing import List
from uuid import UUID

from send_me.modules.users.schemas import User
from send_me.schemas import SendMeModel


class Message(SendMeModel):
    id: UUID
    sender_id: UUID
    conversation_id: UUID
    content: str
    sender: User

    created_at: datetime


class Conversation(SendMeModel):
    id: UUID
    users: List[User]
    messages: List[Message]
    last_updated: datetime
    has_been_read: bool = False


class CreateMessageRequest(SendMeModel):
    content: str


class CreateConversationRequest(SendMeModel):
    reciever_id: UUID
