export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    // eslint-disable-next-line no-useless-escape
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(
  name: string,
  value: string, 
  props?: {
    expires: number | string; 
    [name: string]: string | number | boolean;
  }): void {
  let localProps = {...props};
  let exp: number | string | Date | undefined = localProps.expires;
  if (typeof exp === 'number') {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = d;
  }
  if (exp instanceof Date ) {
    localProps.expires = exp.toUTCString();
  }
  const strValue: string = typeof value === 'string' ? encodeURIComponent(value) : '';
  let updatedCookie: string = name + '=' + strValue;
  for (const propName in localProps) {
    updatedCookie += '; ' + propName;
    const propValue: boolean | string | number  = localProps[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string): void {
  setCookie(name, '', { expires: -1 });
}