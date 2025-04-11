from datetime import datetime
from typing import List
from uuid import UUID

from send_me.modules.users.schemas import User
from send_me.schemas import SendMeModel


class Message(SendMeModel):
    id: UUID
    sender_id: UUID
    content: str
    created_at: datetime
    users: List[User]
    isUser: bool = False
    profile_picture: str | None = None
    

    


class Conversation(SendMeModel):
    id: UUID
    profile_picture: str | None = None
    users: List[User]
    messages: List[Message]
    last_updated: datetime
    has_been_read: bool = False

    class Config:
        from_attributes = True
