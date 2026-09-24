import { NextResponse } from "next/server";
import { getProducts } from "@/api/cms/server/queries/get-products";
import { getBlogPosts } from "@/api/cms/server/queries/get-blog-posts";
import { getProjects } from "@/api/cms/server/queries/get-home-collection";
import { getPages } from "@/api/cms/server/queries/get-pages";

export interface SearchResultItem {
  id: string;
  title: string;
  slug?: string;
  category: "products" | "blog" | "projects" | "pages";
  categoryLabel: string;
  url: string;
  excerpt?: string | null;
  thumbnailUrl?: string | null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").trim().toLowerCase();
  const locale = searchParams.get("locale") || "mn";

  if (!q || q.length < 1) {
    return NextResponse.json({ results: [] });
  }

  const isMn = locale === "mn";

  try {
    const [products, posts, projects, pages] = await Promise.all([
      getProducts(locale).catch(() => []),
      getBlogPosts({ language: locale, limit: 30 }).catch(() => []),
      getProjects(locale).catch(() => []),
      getPages(locale).catch(() => []),
    ]);

    const productResults: SearchResultItem[] = products.map((p) => ({
      id: `product-${p.id}`,
      title: p.title,
      slug: p.slug,
      category: "products",
      categoryLabel: isMn ? "Бүтээгдэхүүн" : "Products",
      url: `/products/${p.slug}`,
      excerpt: p.excerpt,
      thumbnailUrl: p.thumbnailUrl,
    }));

    const blogResults: SearchResultItem[] = posts.map((b) => ({
      id: `blog-${b.id}`,
      title: b.title,
      slug: b.slug,
      category: "blog",
      categoryLabel: isMn ? "Мэдээ, Нийтлэл" : "Blog & News",
      url: `/blog/${b.slug}`,
      excerpt: b.excerpt,
      thumbnailUrl: b.thumbnailUrl,
    }));

    const projectResults: SearchResultItem[] = projects.map((pr) => ({
      id: `project-${pr.id}`,
      title: pr.title,
      category: "projects",
      categoryLabel: isMn ? "Төсөл" : "Projects",
      url: `/products`,
      excerpt: pr.tags.join(" • "),
      thumbnailUrl: pr.thumbnailUrl,
    }));

    const pageResults: SearchResultItem[] = pages
      .filter((page) => page.slug !== "contact-text")
      .map((page) => {
        const cleanSlug = page.slug.replace(/^\/+/, "");
        let url = `/${cleanSlug}`;
        if (cleanSlug === "home") url = "/";
        if (cleanSlug === "about") url = "/#about";
        return {
          id: `page-${page.id}`,
          title: page.name,
          slug: page.slug,
          category: "pages",
          categoryLabel: isMn ? "Хуудас" : "Pages",
          url,
          excerpt: page.description,
          thumbnailUrl: page.thumbnailUrl,
        };
      });

    const allItems = [
      ...productResults,
      ...blogResults,
      ...projectResults,
      ...pageResults,
    ];

    const filtered = allItems.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchExcerpt = item.excerpt?.toLowerCase().includes(q);
      const matchCategory = item.categoryLabel.toLowerCase().includes(q);
      const matchSlug = item.slug?.toLowerCase().includes(q);
      return matchTitle || matchExcerpt || matchCategory || matchSlug;
    });

    return NextResponse.json({ results: filtered });
  } catch (error) {
    console.error("[Search API] Error searching CMS content:", error);
    return NextResponse.json({ results: [] });
  }
}

