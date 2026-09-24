import "server-only";

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { cookies } from "next/headers";
import { cache } from "react";

// Singleton instance for static/public queries (same headers & app token, no cookies)
let staticClient: ReturnType<typeof makeClient> | null = null;


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
      fetchOptions:
        process.env.NODE_ENV !== "production"
          ? { cache: "no-store" }
          : staticBuild
          ? { next: { revalidate: 60 } }
          : { cache: "no-store" },
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: { fetchPolicy: "no-cache" },
      watchQuery: { fetchPolicy: "no-cache" },
    },
  });
}



export const getServerApolloClient = cache(async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return makeClient(token);
});

export function getStaticApolloClient() {
  if (!staticClient) {
    staticClient = makeClient(undefined, true);
  }
  return staticClient;
}

