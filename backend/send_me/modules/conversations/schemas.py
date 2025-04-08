from datetime import datetime
from uuid import UUID

from send_me.schemas import SendMeModel


class Conversation(SendMeModel):
    id: UUID
    newest_message_id: UUID
    last_updated: datetime
    created_at: datetime

class UserConversations(SendMeModel):
    user_id: UUID
    conversation_id: UUID
    read: boolean
