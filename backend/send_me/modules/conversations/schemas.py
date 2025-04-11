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

    user: User

    created_at: datetime


class Conversation(SendMeModel):
    id: UUID
    profile_picture: str | None = None
    users: List[User]
    messages: List[Message]
    last_updated: datetime
    has_been_read: bool 
    

    class Config:
        from_attributes = True
