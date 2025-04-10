from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import IntegrityError
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
    operation_id="createUser",
)
def make_user(input: schemas.CreateUserRequest, db: Session = Depends(get_db)):
    new_user = models.User(
        email=input.email,
        first_name=input.first_name,
        last_name=input.last_name,
        location=input.location,
        bio=input.bio,
        profile_picture=input.profile_picture,
        facebook=input.facebook,
        x=input.x,
        instagram=input.instagram,
        linkedin=input.linkedin
    )

    db.add(new_user)

    try:
        db.flush()
    except IntegrityError as e:
        raise HTTPException(
            status_code=400, detail=f"Duplicate Email Used: {input.email}"
        ) from e

    db.refresh(new_user)

    return new_user


# @router.get(
#     "/profiles/{user_id}",
#     response_model=schemas.GetProfileResponse,
#     operation_id="getProfile",
# )
# def get_profile(user_id, db: Session = Depends(get_db)):
#     pass
