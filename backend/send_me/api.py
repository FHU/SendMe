import logging
from fastapi import FastAPI, APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from send_me.database.router import router as database_router
from send_me.modules.opportunities.router import router as opportunities_router
from send_me.schemas import SendMeModel
from datetime import datetime
from typing import List
from . import schemas, models  # Adjust imports based on your project structure
from .database import get_db  # Assuming get_db is a function that returns a DB session

# Initialize logging with detailed error logging
logging.basicConfig(level=logging.DEBUG)

app = FastAPI()

# General exception handler to log errors
@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    logging.error(f"Unhandled error: {exc}")
    return {"detail": "Internal Server Error"}

# Include the routers
app.include_router(opportunities_router)
app.include_router(database_router)

class HelloWorldResponse(SendMeModel):
    message: str

@app.get("/hello", response_model=HelloWorldResponse)
async def hello_world():
    return HelloWorldResponse(message="Hello, World!")

# APIRouter for the conversation tags endpoint
router = APIRouter()

@router.get("/conversation/tags", response_model=List[schemas.ConversationTag])
async def get_conversation_tags(db: Session = Depends(get_db)):
    try:
        logging.info("Fetching conversation tags from the database.")

        # Replace this mock data with real DB query once integrated
        mock_conversations = [
            {
                "id": 1,
                "user_name": "Test",
                "message_preview": "Hello",
                "timestamp": str(datetime.utcnow()),
                "read_message": True,
                "conversation": []  # An empty list of conversation messages for this mock data
            }
        ]
        
        # Simulate a DB call using mock data
        # In a real-world application, replace this with the actual DB query
        # conversations = db.query(models.ConversationTag).all()
        
        if not mock_conversations:
            logging.warning("No conversation tags found.")
        
        # Returning mock data for now
        return [schemas.ConversationTag(**conv) for conv in mock_conversations]

    except Exception as e:
        logging.error(f"Error fetching conversation tags: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

# Register the router
app.include_router(router)
