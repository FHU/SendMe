from datetime import datetime
from uuid import UUID

from send_me.schemas import SendMeModel


class Conversation(SendMeModel):
    id: UUID
    user: str
    most_recent: str
    is_read: bool
    last_updated: datetime
