

ruff:
  #!/usr/bin/env sh
  cd backend
  poetry run ruff check sendme/ --fix
  poetry run ruff format sendme/

pyright:
  #!/usr/bin/env sh
  cd backend
  export PYRIGHT_PYTHON_FORCE_VERSION=v1.1.383
  poetry run pyright