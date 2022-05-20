type CookieGetter = (cookieHeader: string | null, name: string) => string | null;

const getCookieValue: CookieGetter = (cookieHeader, name) => {
  return cookieHeader?.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || null;
}

export default getCookieValue;