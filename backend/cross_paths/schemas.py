from pydantic import BaseModel, ConfigDict


class CrossPathsModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)
