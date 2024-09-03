import type { MetaFunction } from "@remix-run/node";
import { Button } from "@mui/material";
export const meta: MetaFunction = () => {
  return [
    { title: "CrossPaths" },
    { name: "description", content: "Welcome to Remix (SPA Mode)!" },
  ];
};

export default function Index() {
  return (
    <div>
      <Button variant="contained">Hello world</Button>
    </div>
  );
}
