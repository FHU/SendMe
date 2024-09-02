import os

OPTION = os.environ.get("MODE") or "serve"

if OPTION == "serve":
    import uvicorn
    from .api import app

    uvicorn.run(app, port=5000, host="0.0.0.0")
