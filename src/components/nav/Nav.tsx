"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import monogram from "../../../public/logo-monogram.png";
import { LanguageSwitch } from "@/components/nav/LanguageSwitch";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/i18n/routes";
import type { Locale } from "@/i18n/config";

export function Nav({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).nav;
  const home = localePath(locale, { kind: "home" });
  const LINKS = [
    { href: home, label: t.home },
    { href: localePath(locale, { kind: "portfolio" }), label: t.portfolio },
    { href: localePath(locale, { kind: "contact" }), label: t.contact },
  ];
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === home ? pathname === home : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-md border-b border-line/70"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="shell flex items-center justify-between h-[4.5rem]">
        <Link
          href={home}
          aria-label={t.homeAria}
          className="flex items-center gap-2.5 group"
          onClick={() => setOpen(false)}
        >
          <Image
            src={monogram}
            alt=""
            height={30}
            className="h-[26px] w-auto"
            priority
          />
          <span className="font-display font-semibold tracking-[0.24em] text-[0.82rem] uppercase text-ink leading-none pt-px">
            Manuel Torres
          </span>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-1 font-display">
          {LINKS.map((l, i) => (
            <li key={l.href} className="flex items-center">
              {i > 0 && (
                <span className="mx-3 text-accent/70 select-none" aria-hidden>
                  ·
                </span>
              )}
              <Link
                href={l.href}
                className={`uppercase tracking-[0.18em] text-[0.74rem] font-semibold py-2 transition-colors ${
                  isActive(l.href)
                    ? "text-ink"
                    : "text-muted hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="ml-4 flex items-center border-l border-line pl-3">
            <LanguageSwitch locale={locale} variant="compact" label={t.language} />
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
          aria-label={open ? t.closeMenu : t.openMenu}
          aria-expanded={open}
        >
          <span
            className={`block h-px w-6 bg-ink transition-transform duration-300 ${
              open ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-ink transition-opacity duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-ink transition-transform duration-300 ${
              open ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile panel */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-500 ease-out ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="shell flex flex-col gap-1 pb-6 pt-1 font-display">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block uppercase tracking-[0.18em] text-sm font-semibold py-3 text-muted hover:text-ink border-b border-line/60"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="pt-5">
            <LanguageSwitch
              locale={locale}
              variant="full"
              label={t.language}
              onNavigate={() => setOpen(false)}
            />
          </li>
        </ul>
      </div>
    </header>
  );
}
