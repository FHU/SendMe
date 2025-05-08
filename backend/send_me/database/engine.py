import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine(
    os.environ["SENDME_DB_URL"],
    echo=False,
    pool_size=20,
    max_overflow=30,
    pool_timeout=30,
    pool_recycle=180,
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


"""
This function is used by fastapi to get the database connection.

It provides a database connection and commits the changes.
"""


def get_db():
    """Returns a database session."""
    db = SessionLocal()
    try:
        # This is yield instead of return because it's just how it is.
        yield db

        # This is where data is actually saved to the database.
        db.commit()
    finally:
        db.close()
