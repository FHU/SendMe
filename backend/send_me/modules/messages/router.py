from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from send_me.database.engine import get_db

from . import models, schemas

"PLEASE PUT STATIC DATA IN THE router.get FUNCTION"

router = APIRouter(
    tags=["messages"],
    responses={404: {"description": "Not found"}},
)


@router.get("/messages", response_model=list[schemas.Message])
def get_messages(db: Session = Depends(get_db)):
    query = select(models.Message)

    result = db.execute(query).scalars().all()

    return result
