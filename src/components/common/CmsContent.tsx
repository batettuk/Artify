import sanitizeHtml from "sanitize-html";
import React from "react";
import { cn } from "@/lib/utils";

const CMS_CONTENT_TAGS = [
  "div",
  "p",
  "br",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "ol",
  "li",
  "blockquote",
  "strong",
  "em",
  "b",
  "i",
  "u",
  "s",
  "span",
  "a",
  "code",
  "pre",
  "hr",
] as const;

type CmsContentProps = {
  html?: string | null;
  as?: React.ElementType;
} & Omit<React.HTMLAttributes<HTMLElement>, "dangerouslySetInnerHTML">;

export function CmsContent({
  html,
  as: Component = "div",
  className,
  ...props
}: CmsContentProps) {
  const sanitizedHtml = sanitizeHtml(html ?? "", {
    allowedTags: [...CMS_CONTENT_TAGS],
    allowedAttributes: { a: ["href"] },
    allowedSchemes: ["https", "http", "mailto", "tel"],
  });

  return (
    <Component
      {...props}
      className={cn("cms-html", className)}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
