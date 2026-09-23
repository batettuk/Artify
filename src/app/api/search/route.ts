import { NextResponse } from "next/server";
import { getProducts } from "@/api/cms/server/queries/get-products";
import { getBlogPosts } from "@/api/cms/server/queries/get-blog-posts";
import { getProjects } from "@/api/cms/server/queries/get-home-collection";

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

  // Static site pages to include in search
  const staticPages: SearchResultItem[] = [
    {
      id: "page-home",
      title: isMn ? "Нүүр хуудас" : "Home Page",
      category: "pages",
      categoryLabel: isMn ? "Хуудас" : "Pages",
      url: "/",
      excerpt: isMn
        ? "ARTIFY BRAND — Инженерийн нарийн тооцоолол, ухаалаг агааржуулалт, захиалгат ховор материалын цогц шийдлээр амьдралын чанарыг урлана."
        : "ARTIFY BRAND — crafting the quality of life",
      thumbnailUrl: "/images/artify-logo-white.png",
    },
    {
      id: "page-about",
      title: isMn ? "Бидний тухай" : "About Us",
      category: "pages",
      categoryLabel: isMn ? "Хуудас" : "Pages",
      url: "/#about",
      excerpt: isMn
        ? "Компанийн танилцуулга, үнэт зүйлс, үйл ажиллагааны үндсэн чиглэл"
        : "Company philosophy, values, and core service pillars",
      thumbnailUrl: "/images/about-1.jpg",
    },
    {
      id: "page-products",
      title: isMn ? "Бүтээгдэхүүн, Шийдлүүд" : "Products & Solutions",
      category: "pages",
      categoryLabel: isMn ? "Хуудас" : "Pages",
      url: "/products",
      excerpt: isMn
        ? "Зөвлөх үйлчилгээ, Zehnder агааржуулалт, онцгой хийцлэл, сургалт"
        : "Consulting, Zehnder clean air systems, bespoke fabrication, masterclass",
      thumbnailUrl: "/images/consulting-1.jpg",
    },
    {
      id: "page-blog",
      title: isMn ? "Мэдээ, Нийтлэл" : "News & Articles",
      category: "pages",
      categoryLabel: isMn ? "Хуудас" : "Pages",
      url: "/blog",
      excerpt: isMn
        ? "Барилгын салбарын сүүлийн үеийн мэдээ, шинэ технологийн нийтлэл"
        : "Latest construction news, sustainable trends, and engineering articles",
      thumbnailUrl: "/images/about-2.jpg",
    },
    {
      id: "page-contact",
      title: isMn ? "Холбоо барих, Захиалга" : "Contact & Consultation",
      category: "pages",
      categoryLabel: isMn ? "Хуудас" : "Pages",
      url: "/contact",
      excerpt: isMn
        ? "Төслийн зөвлөгөө авах, шууд утас, төв оффис, захиалгын маягт"
        : "Request consultation, phone numbers, HQ location, and inquiry form",
      thumbnailUrl: "/images/consulting-2.jpg",
    },
  ];

  try {
    const [products, posts, projects] = await Promise.all([
      getProducts(locale).catch(() => []),
      getBlogPosts({ language: locale, limit: 30 }).catch(() => []),
      getProjects(locale).catch(() => []),
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

    const allItems = [
      ...productResults,
      ...blogResults,
      ...projectResults,
      ...staticPages,
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
    // Fallback to searching static pages
    const filteredStatic = staticPages.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt?.toLowerCase().includes(q)
    );
    return NextResponse.json({ results: filteredStatic });
  }
}
