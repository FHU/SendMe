

ruff:
  #!/usr/bin/env sh
  cd backend
  poetry run ruff check cross_paths/ --fix
  poetry run ruff format cross_paths/

pyright:
  #!/usr/bin/env sh
  cd backend
  export PYRIGHT_PYTHON_FORCE_VERSION=v1.1.383
  poetry run pyright