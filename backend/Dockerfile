FROM python:3.13-bullseye AS requirements

WORKDIR /app
COPY pyproject.toml poetry.lock /app/
RUN pip install poetry
RUN poetry export > requirements.txt


FROM python:3.13-bullseye

WORKDIR /app
COPY --from=requirements  /app/requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt

COPY send_me/ /app/send_me/


CMD ["fastapi", "dev", "--host", "0.0.0.0", "/app/send_me/api.py"]

