// Prepend the GitHub Pages basePath to a static asset URL so plain
// <img src> tags resolve under e.g. /tanka-web-current/figma/foo.svg.
// next/image handles basePath automatically; this helper exists for the
// many places that use raw <img>.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}
