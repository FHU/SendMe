from send_me.schemas import SendMeModel
from uuid import UUID

'''Pydantic type-checking for Tags. These are stored and accessed using a YAML file.
'''

class Tag(SendMeModel):
    id: int
    name: str

class OpportunityTags(SendMeModel):
    opportunity: UUID
    tag: int