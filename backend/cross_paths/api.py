from fastapi import FastAPI

from cross_paths.modules.opportunities.router import router as opportunities_router

from cross_paths.schemas import CrossPathsModel
app = FastAPI()

app.include_router(opportunities_router)


class HelloWorldResponse(CrossPathsModel):
    message: str

@app.get("/hello", response_model=HelloWorldResponse)
async def hello_world():
    return HelloWorldResponse(message="Hello, World!")
