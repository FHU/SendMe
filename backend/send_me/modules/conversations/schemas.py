from datetime import datetime
from uuid import UUID

from send_me.modules.messages.schemas import Message
from send_me.schemas import SendMeModel


class Conversation(SendMeModel):
    id: UUID
    most_recent: Message
    is_read: bool
    last_updated: datetime
