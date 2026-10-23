export interface NavItemConfig {
  label: string;
  href: string;
  sectionId: string;
  routeMatch?: (pathname: string) => boolean;
}

export const navigationItems: NavItemConfig[] = [
  {
    label: "Work",
    href: "/#work",
    sectionId: "work",
    routeMatch: (pathname: string) =>
      pathname.startsWith("/project") || pathname.startsWith("/projects"),
  },
  {
    label: "About",
    href: "/#about",
    sectionId: "about",
    routeMatch: (pathname: string) =>
      pathname === "/about" || pathname.startsWith("/about/"),
  },
  {
    label: "Writing",
    href: "/writing",
    sectionId: "writing",
    routeMatch: (pathname: string) =>
      pathname === "/writing" || pathname.startsWith("/writing/"),
  },
  {
    label: "Contact",
    href: "/#contact",
    sectionId: "contact",
  },
];

export const HOMEPAGE_SECTION_IDS: string[] = [
  "hero",
  "work",
  "about",
  "stack",
  "engineering",
  "experience",
  "writing",
  "contact",
];
