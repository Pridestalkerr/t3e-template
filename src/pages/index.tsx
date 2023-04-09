import { api } from "~/utils/api";

export default function IndexPage() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <div>
      <p className="text-2xl text-black">
        {hello.data ? hello.data.greeting : "Loading tRPC query..."}
      </p>
    </div>
  );
}
