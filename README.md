# SendMe

## What's the project?

We connect service-minded people to mission efforts. Missionaries can post opportunities
and specify specific talents needed (think language skills, medical skills, etc.)
Users can create profiles listing their talents, and find matching opportunities.

Our end-product will not be a website per-se, but an open-source server that can be deployed
by administrators, including you! A test site will be maintained that can be demo'd. Instructions
will be provided on how to host. Most likely in the form of a docker container and fly.io. I
anticipate maintaining a closed site for FHU as well which the Bible department could govern.

## Commands needed

- [just](https://github.com/casey/just)
- Docker Desktop [kind](https://kind.sigs.k8s.io/)
- kubectl (Should be included with Docker Desktop)
- [skaffold](https://skaffold.dev/)
- helm
- NodeJS Version >=20
- npm
- python
- poetry

Use `just check` to make sure everything is installed properly. Here is known good output of the command as of 12/18/24:

Known working output:

```
NPM:
10.2.4
NodeJS:
v20.11.1
Python 3.13.1
Poetry (version 1.8.5)
Skaffold:
v2.13.2
Helm:
version.BuildInfo{Version:"v3.16.4", GitCommit:"7877b45b63f95635153b29a42c0c2f4273ec45ca", GitTreeState:"dirty", GoVersion:"go1.23.4"}
Kubectl:
Client Version: v1.32.0
Kustomize Version: v5.5.0
Server Version: v1.32.0
```

## How to run

1. `just setup` to install dependencies from poetry and npm.
2. `just dev-backend` in one terminal. This runs the backend. Keep it running.
3. `just dev-frontend` in another terminal. This runs Vite with the frontend.
4. `just init` in another terminal. This initializes the database. When database changes are made, it will need to be re-initialized.

TODO: Make sure these scripts run on Windows.

The server is on port 5500: [http://localhost:5500](http://localhost:5500)
The webapp is on port 5173: [http://localhost:5173](http://localhost:5173)

## FAQs

### Why not use React 19?

As of 12/18/24, `@openapi-qraft/react` doesn't seem compatible with it.
