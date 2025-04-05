from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from send_me.database.engine import get_db

from . import models, schemas

router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)


@router.post(
    "/",
    response_model=schemas.CreateUserRequest,
    status_code=201,
    operation_id="create_user",
)
def make_user(input: schemas.CreateUserRequest, db: Session = Depends(get_db)):
    # TODO add form validation
    new_user = models.User(
        email=input.email,
        display_name=input.display_name,
        first_name=input.first_name,
        last_name=input.last_name,
    )

    db.add(new_user)
    db.flush()
    db.refresh(new_user)

    return new_user


# @router.get(
#     "/profiles/{user_id}",
#     response_model=schemas.GetProfileResponse,
#     operation_id="get_profile",
# )
# def get_profile(user_id, db: Session = Depends(get_db)):
#     pass
