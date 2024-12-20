from fastapi import APIRouter

from .models import Base

from .engine import engine


router = APIRouter(
    tags=["database"],
    responses={404: {"description": "Not found"}},
)


@router.post("/database/init")
def database_init():
    Base.metadata.create_all(bind=engine)



@router.post("/database/delete")
def database_data():
    Base.metadata.drop_all(bind=engine)