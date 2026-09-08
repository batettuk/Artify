import "server-only";

import { cache } from "react";
import { CP_POST } from "@/graphql/cms/queries/post";
import type {
  CpPostData,
  CpPostVariables,
} from "@/graphql/cms/queries/post";
import {
  cmsPublicQueryContext,
  getCmsClient,
  getCmsPortalId,
} from "@/api/cms/server/client";
import { getVerifiedPostType } from "@/api/cms/server/post-types";
import { getProductWebsite } from "@/api/cms/server/queries/get-products";
import type { ProductDetailDto } from "@/api/cms/types/public";

const defaultProductAssets: Record<string, { thumbnail: string; logo?: string; websiteUrl?: string }> = {
  "consulting": {
    thumbnail: "/images/consulting-1.jpg",
    logo: "/images/artify-logo-white.png",
    websiteUrl: "/products",
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
    websiteUrl: "https://www.facebook.com/artify.mn",
  },
};

export const getProductDetail = cache(
  async ({
    slug,
    language,
  }: {
    slug: string;
    language: string;
  }): Promise<ProductDetailDto | null> => {
    if (!slug || !language) {
      throw new Error("CMS product slug and language are required");
    }

    const postType = getVerifiedPostType("buteegdekhuun");
    const portalId = getCmsPortalId();
    const { data } = await getCmsClient().query<CpPostData, CpPostVariables>({
      query: CP_POST,
      variables: { slug, language },
      context: cmsPublicQueryContext,
    });
    const product = data?.cpPost;
    if (!product) return null;

    if (!product.title || !product.slug) {
      throw new Error(`Published product ${product._id} is missing title or slug`);
    }
    if (
      product.status !== "published" ||
      product.clientPortalId !== portalId ||
      product.customPostType?._id !== postType.id ||
      product.customPostType.code !== postType.code ||
      product.customPostType.clientPortalId !== portalId
    ) {
      throw new Error(`Product detail returned an unexpected post for ${product._id}`);
    }

    const fallback = defaultProductAssets[product.slug];

    return {
      id: product._id,
      title: product.title,
      slug: product.slug,
      excerpt: product.excerpt ?? null,
      content: product.content ?? null,
      thumbnailUrl: product.thumbnail?.url || fallback?.thumbnail || null,
      logoUrl: product.images?.[0]?.url || fallback?.logo || null,
      websiteUrl: getProductWebsite(product.customFieldsData) || fallback?.websiteUrl || null,
    };
  },
);
