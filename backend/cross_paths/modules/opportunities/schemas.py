from datetime import datetime
from uuid import UUID

from cross_paths.schemas import CrossPathsModel

"""
Unlike models, these are not used for database access.
Instead, these provide a sort of strict data type that
is used by FastAPI. FastAPI will kindly provide clean
errors automatically with this, not to mention an
OpenAPI spec.
"""


# Specifies the client's request to create an opportunity.
class CreateOpportunityRequest(CrossPathsModel):
    name: str
    description: str


# This is the general definition of what an Opportunity looks like.
class Opportunity(CrossPathsModel):
    id: UUID
    name: str
    description: str
    created_at: datetime
