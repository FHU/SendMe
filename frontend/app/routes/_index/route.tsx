import type { MetaFunction } from "react-router";
import api from "@sendme/api";
import { SlButton } from "@shoelace-style/shoelace/dist/react";
export const meta: MetaFunction = () => {
  return [
    { title: "SendMe" },
    { name: "description", content: "SendMe Mission" },
  ];
};

export default function Index() {
  const { data } = api.hello.helloWorldHelloGet.useQuery();

  return (
    <div>
      Here's a<SlButton>Click</SlButton>message from our server: {data?.message}
    </div>
  );
}
