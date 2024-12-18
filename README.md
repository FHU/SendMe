# CrossPaths


## Commands needed
- [just](https://github.com/casey/just)
- [kind](https://kind.sigs.k8s.io/)
- kubectl
- [skaffold](https://skaffold.dev/)

## How to run

1. Run `just dev` in one terminal. This runs the backend.
2. Run `just frontend` in another terminal.
2. It's running.

The server is on port 5500: [http://localhost:5500](http://localhost:5500)
The webapp is on port 5173: [http://localhost:5173](http://localhost:5173)

## Resetting

1. Run `just kind-reset`.
