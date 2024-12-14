import type { MetaFunction } from "@remix-run/node";
import api from "@sendme/api";

export const meta: MetaFunction = () => {
  return [
    { title: "SendMe" },
    { name: "description", content: "SendMe Mission" },
  ];
};

export default function Index() {
  const { data } = api.hello.helloWorldHelloGet.useQuery();

  return <div>Here's a message from our server: {data?.message}</div>;
}
