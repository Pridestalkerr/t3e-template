import { api } from "~/utils/api";

import { env } from "~/env/index";

export default function IndexPage() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  console.log("client: ", env);

  return (
    <div>
      <p className="text-2xl text-black">
        {hello.data ? hello.data.greeting : "Loading tRPC query..."}
      </p>
    </div>
  );
}
