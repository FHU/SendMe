import { createLazyFileRoute } from "@tanstack/react-router";
import { SlButton } from "@shoelace-style/shoelace/dist/react";
import api from "@sendme/api";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { data } = api.hello.helloWorldHelloGet.useQuery();
  return (
    <div>
      <h3>Server message: {data?.message}</h3>
      <SlButton>Test</SlButton>
    </div>
  );
}
