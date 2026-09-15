import { ui, defaultLang, type Locale, languages } from './ui';

export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang && lang in ui) {
    return lang as Locale;
  }
  return defaultLang;
}

export function useTranslations(lang: Locale) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    const localeDict = ui[lang] || ui[defaultLang];
    return (localeDict as Record<string, string>)[key] || ui[defaultLang][key] || key;
  };
}

export function getRelativeLocaleUrl(locale: Locale, path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  if (locale === defaultLang) {
    return `/${cleanPath}`;
  }
  return `/${locale}/${cleanPath}`;
}

export interface HreflangEntry {
  lang: string;
  href: string;
}

export function getHreflangTags(pathname: string, siteUrl: string = 'https://browsercut.github.io'): HreflangEntry[] {
  // Normalize pathname to strip any existing locale prefix
  const segments = pathname.split('/').filter(Boolean);
  let subPath = '';

  if (segments.length > 0 && segments[0] in ui) {
    subPath = segments.slice(1).join('/');
  } else {
    subPath = segments.join('/');
  }

  const cleanSubPath = subPath ? `${subPath}/` : '';
  const normalizedSiteUrl = siteUrl.replace(/\/+$/, '');

  const entries: HreflangEntry[] = (Object.keys(languages) as Locale[]).map((loc) => {
    const prefix = loc === defaultLang ? '' : `${loc}/`;
    return {
      lang: loc,
      href: `${normalizedSiteUrl}/${prefix}${cleanSubPath}`,
    };
  });

  // Add x-default pointing to the default language (English)
  entries.push({
    lang: 'x-default',
    href: `${normalizedSiteUrl}/${cleanSubPath}`,
  });

  return entries;
}

/**
 * Format time in seconds to mm:ss or hh:mm:ss
 */
export function formatTime(seconds: number, includeDecimals = false): string {
  if (isNaN(seconds) || seconds < 0) seconds = 0;

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 10);

  const pad = (n: number) => n.toString().padStart(2, '0');

  if (hrs > 0) {
    const base = `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
    return includeDecimals ? `${base}.${ms}` : base;
  }

  const base = `${pad(mins)}:${pad(secs)}`;
  return includeDecimals ? `${base}.${ms}` : base;
}
