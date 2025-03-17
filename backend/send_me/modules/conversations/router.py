from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from send_me.database.engine import get_db

"PLEASE PUT STATIC DATA IN THE router.get FUNCTION"

router = APIRouter(
    tags=["opportunities"],
    responses={404: {"description": "Not found"}},
)


@router.get(
    "/conversation/tags",
    response_model=list[None],
    operation_id="list_tags",
)
def get_conversation_tags(
    db: Session = Depends(get_db),
):
    pass
