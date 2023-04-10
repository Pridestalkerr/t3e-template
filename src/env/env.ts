import { type z, type ZodObject, type ZodRawShape } from "zod";

export const validate = <
  ServerEnv extends ZodRawShape,
  ClientEnv extends ZodRawShape
>(
  server: ZodObject<ServerEnv>,
  client: ZodObject<ClientEnv>,
  unpack: Record<
    keyof z.infer<typeof server> | keyof z.infer<typeof client>,
    string | undefined
  >
) => {
  const isServer = typeof window === "undefined";
  const merged = server.merge(client);

  type MergedInput = z.input<typeof merged>;
  type MergedOutput = z.infer<typeof merged>;
  type MergedSafeParseReturn = z.SafeParseReturnType<MergedInput, MergedOutput>;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore this can't be typed properly because it might run on the server or the client
  const parsed: MergedSafeParseReturn = isServer
    ? merged.safeParse(unpack)
    : client.safeParse(unpack);

  if (parsed.success === false) {
    console.log("processEnv: ", unpack.NEXT_PUBLIC_CLIENTVAR);
    console.log("parsed client: ", parsed);
    console.error(
      "❌ Invalid environment variables:",
      parsed.error.flatten().fieldErrors
    );
    throw new Error("Invalid environment variables");
  }

  const env = new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== "string") return undefined;
      // Throw a descriptive error if a server-side env var is accessed on the client
      // Otherwise it would just be returning `undefined` and be annoying to debug
      if (!isServer && !prop.startsWith("NEXT_PUBLIC_"))
        throw new Error(
          process.env.NODE_ENV === "production"
            ? "❌ Attempted to access a server-side environment variable on the client"
            : `❌ Attempted to access server-side environment variable '${prop}' on the client`
        );
      // Zod leaking any (see https://github.com/typescript-eslint/typescript-eslint/issues/3856)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return target[prop];
    },
  });

  return env;
};
