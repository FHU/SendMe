from fastapi import Depends, FastAPI

from send_me.database.router import router as database_router
from send_me.authentication.dependancy import get_session
from send_me.authentication.router import router as authorization_router
from send_me.modules.opportunities.router import router as opportunities_router
from send_me.schemas import SendMeModel

app = FastAPI()

app.include_router(opportunities_router)
app.include_router(database_router)
app.include_router(authorization_router)


class HelloWorldResponse(SendMeModel):
    message: str


@app.get("/hello", response_model=HelloWorldResponse)
async def hello_world():
    return HelloWorldResponse(message="Hello, World!")


@app.get("/protected")
async def protected_example(session=Depends(get_session)):
    return {"message": "protected content"}
