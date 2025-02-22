from fastapi import FastAPI

from send_me.database.router import router as database_router
from send_me.modules.opportunities.router import router as opportunities_router
from send_me.schemas import SendMeModel

app = FastAPI()

app.include_router(opportunities_router)
app.include_router(database_router)


class HelloWorldResponse(SendMeModel):
    message: str


@app.get("/hello", response_model=HelloWorldResponse)
async def hello_world():
    return HelloWorldResponse(message="Hello, World!")
