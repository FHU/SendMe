from datetime import datetime
from uuid import UUID

from send_me.schemas import SendMeModel

"""
Unlike models, these are not used for database access.
Instead, these provide a sort of strict data type that
is used by FastAPI. FastAPI will kindly provide clean
errors automatically with this, not to mention an
OpenAPI spec.
"""


# Specifies the client's request to create an opportunity.
class CreateOpportunityRequest(SendMeModel):
    id: UUID
    organization: str | None
    contact_user: str
    location: str | None
    tags: list[str] | None
    summary: str | None
    description: str
    # organization_id: UUID | None
    created_at: datetime


# This is the general definition of what an Opportunity looks like.
class Opportunity(SendMeModel):
    id: UUID
    organization: str | None
    contact_user: str
    location: str | None
    tags: list[str] | None
    summary: str | None
    description: str
    # organization_id: UUID | None
    created_at: datetime
