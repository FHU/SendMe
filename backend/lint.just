

ruff:
  #!/usr/bin/env sh
  cd backend
  poetry run ruff check send_me/ --fix
  poetry run ruff format send_me/

pyright:
  #!/usr/bin/env sh
  cd backend
  export PYRIGHT_PYTHON_FORCE_VERSION=v1.1.383
  poetry run pyright