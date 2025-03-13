# From https://www.doctave.com/blog/python-export-fastapi-openapi-spec

import argparse
import json

import yaml

parser = argparse.ArgumentParser(prog="extract-openapi.py")
parser.add_argument(
    "--out", help="Output file ending in .json or .yaml", default="openapi.yaml"
)

if __name__ == "__main__":
    args = parser.parse_args()

    from send_me.api import app

    openapi = app.openapi()
    version = openapi.get("openapi", "unknown version")

    # print(f"writing openapi spec v{version}")
    with open(args.out, "w") as f:
        if args.out.endswith(".json"):
            json.dump(openapi, f, indent=2)
        else:
            yaml.dump(openapi, f, sort_keys=False)

    # print(f"spec written to {args.out}")
