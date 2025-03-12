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


from typing import List
from datetime import datetime

app = FastAPI()

@app.get("/conversation/tags", response_model=List[ConversationTag])
async def get_conversation_tags():
    return [
        ConversationTag(
            id=1,
            user_name="John Doe",
            user_profile_picture="https://example.com/profile.jpg",
            timestamp=str(datetime.utcnow()),
            message_preview="Hello, how are you?",
            read_message=True,
            conversation=[
                ConversationMessage(
                    id=1, text="Hello!", timestamp=str(datetime.utcnow()), is_user=True
                )
            ]
        )
    ]
