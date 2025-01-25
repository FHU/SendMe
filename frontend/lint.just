biome:
  #!/usr/bin/env sh
  cd frontend/
  npx @biomejs/biome check --write

ts:
  #!/usr/bin/env sh
  cd frontend/
  npm run typecheck