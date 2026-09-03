import {
  decodeCustomFields,
  getStringValue,
} from "@/api/cms/server/custom-fields";
import { CmsContent } from "@/components/common/CmsContent";
import { FadeIn } from "@/components/motion/FadeIn";
import Image from "@/components/common/Image";
import type { CmsPageDto } from "@/api/cms/types/public";

export function CeoSection({ page }: { page: CmsPageDto | null }) {
  if (!page) return null;

  const fields = decodeCustomFields(page.customFieldsData, "home-ceo-fields");
  const bottomText = getStringValue(fields, "ceoRole");

  return (
    <section className="bg-secondary px-3 py-10 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <FadeIn direction="up" className="order-2 lg:order-1">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden bg-card shadow-sm">
              <Image
                src={page.thumbnailUrl}
                alt={page.name}
                fill
                className="h-full w-full object-cover object-top"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="order-1 lg:order-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {page.name}
              </span>
              <CmsContent
                html={page.description}
                className="mt-4 font-display text-xl font-semibold leading-snug text-foreground lg:text-3xl"
              />
              {bottomText && (
                <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {bottomText}
                </p>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
