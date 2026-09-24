const url = "https://artifynew.next.erxes.io/gateway/graphql";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRQb3J0YWxJZCI6InpULXNjYlhEbGhfbmV0d1ZRdjMwWCIsImlhdCI6MTc4Mjk2NDg2OH0.NHW9faZ_S3ZNZobMA9NSLN9yKUfs9m7cvC8cxI7F74c";

async function query(q: string, vars: Record<string, unknown> = {}) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-app-token": token },
    body: JSON.stringify({ query: q, variables: vars }),
  });
  return res.json();
}

async function addPost(post: Record<string, unknown>) {
  const mutation = `
    mutation CpCmsPostsAdd($input: PostInput!) {
      cpCmsPostsAdd(input: $input) {
        _id
        slug
        title
      }
    }
  `;
  return query(mutation, { input: post });
}

const additionalPosts = [
  // Catalogs as separate individual posts
  {
    clientPortalId: "zT-scbXDlh_netwVQv30X",
    title: "Zehnder радиатор, алчуур хатаагч",
    slug: "catalog-radiator",
    excerpt: "Германы Zehnder брэндийн дизайнер радиатор, алчуур хатаагчийн албан ёсны техникийн каталоги.",
    content: "File: /catalogs/zehnder-radiator-towel-dryer.pdf\nSize: 13.8 MB\nFilename: Zehnder радиатор, алчуур хатаагч.pdf",
    status: "published",
    translations: [
      {
        language: "en",
        title: "Zehnder Designer Radiator & Bathroom Towel Warmer",
        excerpt: "Official Zehnder designer radiator & bathroom towel warmer technical specifications.",
        content: "File: /catalogs/zehnder-radiator-towel-dryer.pdf\nSize: 13.8 MB\nFilename: Zehnder радиатор, алчуур хатаагч.pdf"
      }
    ]
  },
  {
    clientPortalId: "zT-scbXDlh_netwVQv30X",
    title: "ERV системийн ач холбогдол ба хэрэглээ  TechInvent",
    slug: "catalog-erv-system",
    excerpt: "Дулаан ба чийг сэргээгчтэй ухаалаг ERV агааржуулалтын систем, барилгын төсөлд үзүүлэх давуу тал.",
    content: "File: /catalogs/erv-system-significance-techinvent.pdf\nSize: 7.5 MB\nFilename: ERV системийн ач холбогдол ба хэрэглээ  TechInvent.pdf",
    status: "published",
    translations: [
      {
        language: "en",
        title: "ERV System Significance & Applications TechInvent",
        excerpt: "Comprehensive technical guide and health advantages of Energy Recovery Ventilation (ERV) systems.",
        content: "File: /catalogs/erv-system-significance-techinvent.pdf\nSize: 7.5 MB\nFilename: ERV системийн ач холбогдол ба хэрэглээ  TechInvent.pdf"
      }
    ]
  },
  {
    clientPortalId: "zT-scbXDlh_netwVQv30X",
    title: "Comfoscholl catalog 20251104-x (Монгол)",
    slug: "catalog-comfoschool",
    excerpt: "Сургууль, цэцэрлэг болон олон нийтийн барилгад зориулсан эрүүл, цэвэр агаар сэлгэлтийн систем.",
    content: "File: /catalogs/comfoschool-catalog-mn.pdf\nSize: 1.1 MB\nFilename: Comfoscholl catalog 20251104-x (Монгол).pdf",
    status: "published",
    translations: [
      {
        language: "en",
        title: "Comfoschool Catalog (Mongolia)",
        excerpt: "Smart fresh air ventilation systems specifically engineered for schools and modern facilities.",
        content: "File: /catalogs/comfoschool-catalog-mn.pdf\nSize: 1.1 MB\nFilename: Comfoscholl catalog 20251104-x (Монгол).pdf"
      }
    ]
  },
  {
    clientPortalId: "zT-scbXDlh_netwVQv30X",
    title: "CAW300 User Manual MN",
    slug: "catalog-caw300",
    excerpt: "Zehnder CAW300 төхөөрөмжийн ашиглалт, тохиргоо, суурилуулалтын албан ёсны гарын авлага.",
    content: "File: /catalogs/caw300-user-manual-mn.pdf\nSize: 955 KB\nFilename: CAW300 User Manual MN.pdf",
    status: "published",
    translations: [
      {
        language: "en",
        title: "CAW300 User Manual MN",
        excerpt: "Operation, technical specifications, and maintenance guide for Zehnder CAW300 fresh air units.",
        content: "File: /catalogs/caw300-user-manual-mn.pdf\nSize: 955 KB\nFilename: CAW300 User Manual MN.pdf"
      }
    ]
  },
  // Individual Sidebar Information for product pages
  {
    clientPortalId: "zT-scbXDlh_netwVQv30X",
    title: "Блок Академи Сургалт",
    slug: "sidebar-masterclass",
    excerpt: "Барилгын төслийн менежмент, инженерийн практик сургалтуудыг Блок Академиар дамжуулан аваарай.",
    content: "Facebook: https://www.facebook.com/profile.php?id=61583605854922\nWebsite: https://academy.artify.mn",
    status: "published",
    translations: [
      {
        language: "en",
        title: "Block Academy Masterclass",
        excerpt: "Join our professional engineering and construction management masterclasses powered by Block Academy.",
        content: "Facebook: https://www.facebook.com/profile.php?id=61583605854922\nWebsite: https://academy.artify.mn"
      }
    ]
  },
  {
    clientPortalId: "zT-scbXDlh_netwVQv30X",
    title: "Zehnder Эрүүл Агаар",
    slug: "sidebar-clean-air",
    excerpt: "Германы 120 жилийн түүхтэй Zehnder брэндийн албан ёсны төлөөлөгчөөс инженерийн тооцоолуур, суурилуулалт аваарай.",
    content: "Portal: https://www.techinvent.mn/en",
    status: "published",
    translations: [
      {
        language: "en",
        title: "Zehnder Clean Air Solutions",
        excerpt: "Official Zehnder heating and ventilation solutions engineered for health, silence, and optimal energy efficiency.",
        content: "Portal: https://www.techinvent.mn/en"
      }
    ]
  },
  {
    clientPortalId: "zT-scbXDlh_netwVQv30X",
    title: "Зөвлөгөө авах",
    slug: "sidebar-advisory",
    excerpt: "Манай инженерийн багтай холбогдон төслийнхөө шаардлагад нийцсэн шийдлийг тооцоолуулна уу.",
    content: "Email: info@artifybrand.com\nPhone: +976 77710 155",
    status: "published",
    translations: [
      {
        language: "en",
        title: "Request Consultation",
        excerpt: "Contact our engineering team to evaluate the best solutions tailored to your project requirements.",
        content: "Email: info@artifybrand.com\nPhone: +976 77710 155"
      }
    ]
  }
];

async function main() {
  const existingRes = await query(`query { cpPosts { slug } }`);
  const existingSlugs = new Set((existingRes.data?.cpPosts || []).map((p: { slug: string }) => p.slug));

  for (const post of additionalPosts) {
    if (existingSlugs.has(post.slug)) {
      console.log(`Post with slug "${post.slug}" already exists in CMS. Skipping.`);
      continue;
    }
    console.log(`Adding post: ${post.slug} ("${post.title}")...`);
    const res = await addPost(post);
    if (res.data?.cpCmsPostsAdd) {
      console.log(`✓ Added: ${res.data.cpCmsPostsAdd.slug} (_id: ${res.data.cpCmsPostsAdd._id})`);
    } else {
      console.error(`✗ Error adding ${post.slug}:`, JSON.stringify(res));
    }
  }
}

main().catch(console.error);
