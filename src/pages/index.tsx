import { api } from "~/utils/api";

import { env } from "~/env/index";
import { signIn, signOut, useSession } from "next-auth/react";

export default function IndexPage() {
  console.log(env);

  const { data: sessionData } = useSession();

  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div>
      <p className="text-2xl text-black">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
        {hello.data ? hello.data.greeting : "Loading tRPC query..."}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
