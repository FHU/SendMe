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

