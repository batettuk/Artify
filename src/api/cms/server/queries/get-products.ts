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

const defaultProductAssets: Record<string, { thumbnail: string; logo?: string; websiteUrl?: string }> = {
  "consulting": {
    thumbnail: "/images/consulting-1.jpg",
    logo: "/images/artify-logo-white.png",
    websiteUrl: "/products/consulting",
  },
  "custom-materials": {
    thumbnail: "/images/about-1.jpg",
    logo: "/images/artify-logo-white.png",
    websiteUrl: "/products/custom-materials",
  },
  "tech-invent": {
    thumbnail: "/images/consulting-2.jpg",
    logo: "/images/zehnder-logo.png",
    websiteUrl: "https://www.techinvent.mn/en",
  },
  "blok-akademi": {
    thumbnail: "/images/masterclass.jpg",
    logo: "/images/block-academy-white.png",
    websiteUrl: "https://www.facebook.com/profile.php?id=61583605854922",
  },
};

export async function getProducts(language: string): Promise<ProductCardDto[]> {
  const posts = await getVerifiedPosts({
    postType: getVerifiedPostType("buteegdekhuun"),
    language,
    limit: 20,
    sortDirection: "asc",
  });
  const ORDER_MAP: Record<string, number> = {
    "consulting": 1,
    "custom-materials": 2,
    "tech-invent": 3,
    "blok-akademi": 4,
  };

  const mapped = posts.map((post) => {
    if (!post.title || !post.slug) {
      throw new Error(`Published product ${post._id} is missing title or slug`);
    }

    const fallback = defaultProductAssets[post.slug];

    return {
      id: post._id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt ?? null,
      thumbnailUrl: post.thumbnail?.url || fallback?.thumbnail || null,
      logoUrl: post.images?.[0]?.url || fallback?.logo || null,
      websiteUrl: getProductWebsite(post.customFieldsData) || fallback?.websiteUrl || null,
    };
  });

  return mapped.sort((a, b) => {
    const orderA = ORDER_MAP[a.slug] ?? 99;
    const orderB = ORDER_MAP[b.slug] ?? 99;
    return orderA - orderB;
  });
}
