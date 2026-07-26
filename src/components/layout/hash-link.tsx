"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

type HashLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

// Homepage section anchors ("#home", "#product", ...) only resolve on the
// homepage itself. From any other route, Next.js needs the leading "/" to
// navigate back to "/" first and then jump to the anchor, rather than
// trying to scroll to an anchor that doesn't exist on the current page.
export function HashLink({ href, ...props }: HashLinkProps) {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const resolved = isHomepage ? href : `/${href}`;
  // Same-page anchors on the homepage need no prefetch — there's no route
  // to fetch. Only a real cross-route link back to "/" benefits from it.
  return <Link href={resolved} prefetch={!isHomepage} {...props} />;
}
