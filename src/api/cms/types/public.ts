export type CmsPageDto = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  content: string | null;
  thumbnailUrl: string | null;
  videoUrl: string | null;
  customFieldsData: unknown;
  customFieldsMap: unknown;
};

export type BlogCardDto = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  publishedDate: string | null;
  thumbnailUrl: string | null;
};

export type BlogPostDetailDto = BlogCardDto & {
  content: string | null;
};

export type ProjectCardDto = {
  id: string;
  title: string;
  content: string | null;
  thumbnailUrl: string | null;
  tags: string[];
};

export type PartnerLogoDto = {
  id: string;
  name: string;
  logoUrl: string | null;
};

export type ProductCardDto = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  thumbnailUrl: string | null;
  logoUrl: string | null;
  websiteUrl: string | null;
};

export type ProductDetailDto = ProductCardDto & {
  content: string | null;
};

export type ContactInfoDto = {
  address: string;
  phone: string;
  email: string;
  hours?: string;
  facebook: string | null;
  instagram: string | null;
};

export type MenuItemDto = {
  id: string;
  label: string;
  url: string;
  external: boolean;
};

export type CmsCollectionDto<T> =
  | { status: "ready"; items: T[] }
  | { status: "unconfigured"; postType: string };
