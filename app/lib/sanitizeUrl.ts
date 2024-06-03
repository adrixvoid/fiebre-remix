/**
 * Sanitize URL
 * https://github.com/braintree/sanitize-url/
 *
 *
 * USAGE:
 *
  var sanitizeUrl = require("@braintree/sanitize-url").sanitizeUrl;

  sanitizeUrl("https://example.com"); // 'https://example.com'
  sanitizeUrl("http://example.com"); // 'http://example.com'
  sanitizeUrl("www.example.com"); // 'www.example.com'
  sanitizeUrl("mailto:hello@example.com"); // 'mailto:hello@example.com'
  sanitizeUrl(
    "&#104;&#116;&#116;&#112;&#115;&#0000058//&#101;&#120;&#97;&#109;&#112;&#108;&#101;&#46;&#99;&#111;&#109;"
  ); // https://example.com

  sanitizeUrl("javascript:alert(document.domain)"); // 'about:blank'
  sanitizeUrl("jAvasCrIPT:alert(document.domain)"); // 'about:blank'
  sanitizeUrl(decodeURIComponent("JaVaScRiP%0at:alert(document.domain)")); // 'about:blank'
  // HTML encoded javascript:alert('XSS')
  sanitizeUrl(
    "&#0000106&#0000097&#0000118&#0000097&#0000115&#0000099&#0000114&#0000105&#0000112&#0000116&#0000058&#0000097&#0000108&#0000101&#0000114&#0000116&#0000040&#0000039&#0000088&#0000083&#0000083&#0000039&#0000041"
  ); // 'about:blank'
 */

// CONSTANTS
export const invalidProtocolRegex = /^([^\w]*)(javascript|data|vbscript)/im;
export const htmlEntitiesRegex = /&#(\w+)(^\w|;)?/g;
export const htmlCtrlEntityRegex = /&(newline|tab);/gi;
export const ctrlCharactersRegex =
  /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim;
export const urlSchemeRegex = /^.+(:|&colon;)/gim;
export const relativeFirstCharacters = ['.', '/'];
export const BLANK_URL = 'about:blank';

// LOGIC

function isRelativeUrlWithoutProtocol(url: string): boolean {
  return relativeFirstCharacters.indexOf(url[0]) > -1;
}

// adapted from https://stackoverflow.com/a/29824550/2601552
function decodeHtmlCharacters(str: string) {
  const removedNullByte = str.replace(ctrlCharactersRegex, '');
  return removedNullByte.replace(htmlEntitiesRegex, (match, dec) => {
    return String.fromCharCode(dec);
  });
}

export function sanitizeUrl(url?: string): string {
  if (!url) {
    return BLANK_URL;
  }
  let charsToDecode;
  let decodedUrl = url;
  do {
    decodedUrl = decodeHtmlCharacters(decodedUrl)
      .replace(htmlCtrlEntityRegex, '')
      .replace(ctrlCharactersRegex, '')
      .trim();
    charsToDecode =
      decodedUrl.match(ctrlCharactersRegex) ||
      decodedUrl.match(htmlEntitiesRegex) ||
      decodedUrl.match(htmlCtrlEntityRegex);
  } while (charsToDecode && charsToDecode.length > 0);
  const sanitizedUrl = decodedUrl;
  if (!sanitizedUrl) {
    return BLANK_URL;
  }

  if (isRelativeUrlWithoutProtocol(sanitizedUrl)) {
    return sanitizedUrl;
  }

  const urlSchemeParseResults = sanitizedUrl.match(urlSchemeRegex);

  if (!urlSchemeParseResults) {
    return sanitizedUrl;
  }

  const urlScheme = urlSchemeParseResults[0];

  if (invalidProtocolRegex.test(urlScheme)) {
    return BLANK_URL;
  }

  return sanitizedUrl;
}
