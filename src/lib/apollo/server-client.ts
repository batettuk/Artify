import "server-only";

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { cookies } from "next/headers";

function makeClient(token?: string, staticBuild = false) {
  const uri = process.env.GRAPHQL_URL;
  const appToken = process.env.ERXES_APP_TOKEN;

  if (!uri || !appToken) {
    throw new Error(
      "GRAPHQL_URL and ERXES_APP_TOKEN are required for server-side erxes access",
    );
  }

  return new ApolloClient({
    link: new HttpLink({
      uri,
      headers: {
        "x-app-token": appToken,
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
      fetchOptions: staticBuild
        ? { next: { revalidate: 60 } }
        : { cache: "no-store" },
    }),
    cache: new InMemoryCache(),
  });
}

export async function getServerApolloClient() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return makeClient(token);
}

export function getStaticApolloClient() {
  return makeClient(undefined, true);
}
