from pydantic import BaseModel, ConfigDict


class SendMeModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)
