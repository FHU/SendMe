
import 'backend/lint.just'

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

dev:
    #!/usr/bin/env sh
    skaffold dev

frontend:
    #!/usr/bin/env sh
    cd frontend/
    npm run dev


# Run while api server is running.
openapi:
    #!/usr/bin/env sh
    cd ./frontend

    npx @openapi-qraft/cli --plugin tanstack-query-react --plugin openapi-typescript http://localhost:5500/openapi.json --output-dir ./app/api/qraft

