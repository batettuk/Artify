import { getTranslations } from "next-intl/server";
import EmptyState from "@/components/common/EmptyState";
import Image from "@/components/common/Image";
import { FadeIn } from "@/components/motion/FadeIn";
import type {
  CmsCollectionDto,
  CmsPageDto,
  PartnerLogoDto,
} from "@/api/cms/types/public";

function LogoItem({ partner }: { partner: PartnerLogoDto }) {
  return (
    <div className="flex shrink-0 items-center justify-center px-6 py-2 lg:px-10 lg:py-4">
      <Image
        src={partner.logoUrl}
        alt={partner.name}
        width={4351}
        height={472}
        className="h-12 w-auto max-w-[160px] object-contain grayscale brightness-0 lg:h-14 lg:max-w-[200px]"
      />
    </div>
  );
}

export async function MarqueeSection({
  page,
  partners,
  locale,
}: {
  page: CmsPageDto | null;
  partners: CmsCollectionDto<PartnerLogoDto>;
  locale: string;
}) {
  const t = await getTranslations({ locale, namespace: "partners" });
  const items = partners.status === "ready" ? partners.items : [];
  const doubled = [...items, ...items];

  return (
    <section className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 px-3 py-10 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-[1600px]">
        <FadeIn>
          <h2 className="mb-6 text-center font-display text-2xl font-semibold text-foreground lg:mb-8 lg:text-4xl">
            {page?.name ?? ""}
          </h2>
          <p className="mb-6 text-center text-muted-foreground lg:mb-8">
            {page?.description ?? ""}
          </p>
        </FadeIn>

        {partners.status === "unconfigured" ? (
          <EmptyState title={t("emptyTitle")} description={t("emptyDescription")} />
        ) : items.length === 0 ? (
          <EmptyState title={t("noPartnersTitle")} description={t("noPartnersDescription")} />
        ) : (
          <FadeIn delay={0.1}>
            <div className="overflow-hidden bg-white/80 px-4 py-5 shadow-sm backdrop-blur lg:px-8 lg:py-7">
              <div className="flex w-max animate-marquee items-center">
                {doubled.map((partner, index) => (
                  <LogoItem key={`${partner.id}-${index}`} partner={partner} />
                ))}
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
