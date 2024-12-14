
import 'backend/lint.just'

kind-reset:
    #!/usr/bin/env sh
    kind delete cluster

kind-start:
    #!/usr/bin/env sh
    kind create cluster --config kind-cluster-config.yaml
    kubectl config use-context kind-kind

dev: kind-start
    #!/usr/bin/env sh
    skaffold dev


# Run while api server is running.
openapi:
    #!/usr/bin/env sh
    cd ./frontend

    npx @openapi-qraft/cli --plugin tanstack-query-react --plugin openapi-typescript http://localhost:5500/openapi.json --output-dir ./app/api/qraft

