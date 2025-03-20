
import 'backend/lint.just'
import 'frontend/lint.just'

check:
    #!/usr/bin/env sh
    echo "NPM:"
    npm --version
    echo "NodeJS:"
    node --version
    python --version
    poetry --version
    echo "Skaffold:"
    skaffold version
    echo "Helm:"
    helm version
    echo "Kubectl:"
    kubectl version

setup:
    #!/usr/bin/env sh
    cd backend/
    poetry install --with lint,types
    cd ../frontend
    npm install

kind-reset:
    #!/usr/bin/env sh
    kind delete cluster

kind-start:
    #!/usr/bin/env sh
    kind create cluster --config kind-cluster-config.yaml
    kubectl config use-context kind-kind

dev-backend:
    #!/usr/bin/env sh
    skaffold dev

# Run after dev
init:
    #!/usr/bin/env sh
    curl -X POST http://localhost:30500/database/init

# Reset an already initialized database
reset:
    #!/usr/bin/env sh
    curl -X POST http://localhost:30500/database/delete
    echo ""
    curl -X POST http://localhost:30500/database/init
    echo ""


dev-frontend:
    #!/usr/bin/env sh
    cd frontend/
    npm run dev


# Run while api server is running.
openapi:
    #!/usr/bin/env sh
    cd ./frontend

    npx openapi-qraft --plugin tanstack-query-react --plugin openapi-typescript http://localhost:30500/openapi.json --output-dir ./src/api/qraft

routes:
    #!/usr/bin/env sh
    cd ./frontend
    npx tsr generate


pr: ruff pyright biome ts