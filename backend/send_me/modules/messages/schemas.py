from datetime import datetime
from uuid import UUID

from send_me.schemas import SendMeModel


class Message(SendMeModel):
    id: UUID
    sender: UUID
    receiver: UUID
    conversation_id: UUID
    created_at: datetime
