import "server-only";

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export function getFormsClient() {
  const uri = process.env.GRAPHQL_URL;
  if (!uri) throw new Error("GRAPHQL_URL is required for erxes form submissions");

  return new ApolloClient({
    link: new HttpLink({ uri, fetchOptions: { cache: "no-store" } }),
    cache: new InMemoryCache(),
  });
}
