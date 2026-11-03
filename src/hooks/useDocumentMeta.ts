import { useEffect } from "react";
import { SITE_META, SITE_ORIGIN } from "../data/tools";

const setMeta = (title: string, description: string, canonical: string) => {
  document.title = title;
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", description);
  document.querySelector('link[rel="canonical"]')?.setAttribute("href", canonical);
};

/**
 * Title, description and canonical for a page reached inside the app. Direct
 * visits get the same values from the tool's generated HTML file, so leaving
 * sets the site defaults outright: what's in the document may be this page's.
 */
export function useDocumentMeta(title: string, description: string, path: string) {
  useEffect(() => {
    setMeta(title, description, `${SITE_ORIGIN}${path}`);
    return () => setMeta(SITE_META.title, SITE_META.description, SITE_META.canonical);
  }, [title, description, path]);
}
