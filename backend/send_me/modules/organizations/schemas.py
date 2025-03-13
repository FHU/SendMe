
from send_me.schemas import SendMeModel

"""
Unlike models, these are not used for database access.
Instead, these provide a sort of strict data type that
is used by FastAPI. FastAPI will kindly provide clean
errors automatically with this, not to mention an
OpenAPI spec.
"""


# Specifies the client's request to create an organization.
class CreateOrganizationRequest(SendMeModel):
    name: str
    description: str
    location: str
    type: str


# This is the general definition of what an Organization looks like.
class Organization(SendMeModel):
    id: int # This will be a UUID in the DB, but for the purposes of static data an int will suffice
    name: str
    description: str
    location: str
    type: str
    created_at: str # Will be a proper datetime object in the DB, but a string is good for now
