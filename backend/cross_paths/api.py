from fastapi import FastAPI

from cross_paths.modules.opportunities.router import router as opportunities_router

app = FastAPI()

app.include_router(opportunities_router)


@app.get("/hello")
async def hello_world():
    return {"Hello": "World!"}
