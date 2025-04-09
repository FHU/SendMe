from datetime import datetime
from uuid import UUID
from typing import List

from send_me.schemas import SendMeModel
from send_me.modules.users.models import User

from . import models


class Conversation(SendMeModel):
    id: UUID
    newest_message_id: UUID
    last_updated: datetime
    created_at: datetime
    newest_message: models.Message
    users: List[User]

class Message(SendMeModel):
    id: UUID
    sender_id: UUID
    conversation_id: UUID
    content: str

    sender:User
    conversation: Conversation

    created_at: datetime