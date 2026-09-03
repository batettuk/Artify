import "server-only";

import { getVerifiedPosts } from "@/api/cms/server/queries/get-verified-posts";
import { getVerifiedPostType } from "@/api/cms/server/post-types";
import {
  decodeCustomFields,
  getStringValue,
} from "@/api/cms/server/custom-fields";
import type { ProductCardDto } from "@/api/cms/types/public";

export function getProductWebsite(data: unknown): string | null {
  const fields = decodeCustomFields(data, "product-fields");
  const website = getStringValue(fields, "website");
  if (!website) return null;

  try {
    const url = new URL(website);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}

export async function getProducts(language: string): Promise<ProductCardDto[]> {
  const posts = await getVerifiedPosts({
    postType: getVerifiedPostType("buteegdekhuun"),
    language,
    limit: 20,
    sortDirection: "asc",
  });
  return posts.map((post) => {
    if (!post.title || !post.slug) {
      throw new Error(`Published product ${post._id} is missing title or slug`);
    }

    return {
      id: post._id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt ?? null,
      thumbnailUrl: post.thumbnail?.url ?? null,
      logoUrl: post.images?.[0]?.url ?? null,
      websiteUrl: getProductWebsite(post.customFieldsData),
    };
  });
}
