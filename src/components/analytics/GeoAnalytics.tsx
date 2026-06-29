"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ENDPOINT = "/__geo_event";
const CONTACT_HOSTS = new Map([
  ["x.com", "click_contact_x"],
  ["twitter.com", "click_contact_x"],
  ["t.me", "click_contact_telegram"],
  ["telegram.me", "click_contact_telegram"],
  ["github.com", "click_contact_github"],
  ["linkedin.com", "click_contact_linkedin"],
]);

type GeoEvent = {
  eventId: string;
  type: string;
  path: string;
  referrer: string;
  target?: string;
  lang: string;
  title: string;
};

export function GeoAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    sendEvent("page_view");
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const link = target.closest("a");
      if (!link || !link.href) {
        return;
      }

      const eventType = classifyLink(link.href);
      if (!eventType) {
        return;
      }

      sendEvent(eventType, link.href);
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}

function classifyLink(href: string): string {
  let url: URL;
  try {
    url = new URL(href, window.location.href);
  } catch {
    return "";
  }

  if (url.protocol === "mailto:") {
    return "click_contact_email";
  }

  if (url.protocol === "tel:") {
    return "click_contact_phone";
  }

  const host = url.hostname.replace(/^www\./, "");
  const currentHost = window.location.hostname.replace(/^www\./, "");

  if (host === currentHost) {
    if (url.pathname === "/work-with-me" || url.pathname === "/contact") {
      return "click_contact_internal";
    }
    return "";
  }

  return CONTACT_HOSTS.get(host) ?? "click_outbound";
}

function sendEvent(type: string, target?: string) {
  const payload: GeoEvent = {
    eventId: crypto.randomUUID(),
    type,
    path: window.location.pathname + window.location.search,
    referrer: document.referrer,
    target,
    lang: navigator.language,
    title: document.title,
  };
  const body = JSON.stringify(payload);

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    if (navigator.sendBeacon(ENDPOINT, blob)) {
      return;
    }
  }

  void fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => undefined);
}
