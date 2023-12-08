import { strict as assert } from "node:assert";

import { getTypeName } from "./getTypeName.js";

const sanitizeString = (text: string) =>
  text
    .trim()
    .toLowerCase()
    .replace(/[^\s\w]|_/g, "")
    .split(" ")
    // .filter((x) => x)
    .join("-")
    .replace(/(^.*)(-)$/g, "$1");

export const slugify = (text: string): { slug: string } | { error: Error } => {
  const _text = text;
  const maxLength = 80;

  if (typeof _text !== "string" || _text == null) {
    return {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      error: new Error(`Expected a 'string', received '${getTypeName(_text)}'`),
    };
  }

  if (_text.length > maxLength) {
    return {
      error: new Error(
        `The text's length limit has been reached, please retry with less than ${maxLength} characters (received: ${_text.length}).`
      ),
    };
  }

  return { slug: sanitizeString(_text) };
};

// ///////////////////////////////////////

assert.deepEqual(slugify(" This a test for a slugified string and more.  "), {
  slug: "this-a-test-for-a-slugified-string-and-more",
});
assert.deepEqual(
  slugify(" @Th=is# []a{} %t:es^t,; '-_fo|r\" /a&< (s+)l>ugifi*ed! ~stri`ng?."),
  { slug: "this-a-test-for-a-slugified-string" }
);
assert.notDeepEqual(
  slugify(
    "  @Th=is# []a{} %t:es^t,;   0 '-_fo|r\" /a&< (s+)l>ugifi*ed! ~stri`ng?. "
  ),
  { slug: "this-a-test-for-a-slugified-string" },
  "We can't remove falsy value (0, false...) by using Array.filter because we got a string"
);

slugify(""); /*?*/
// @ts-expect-error expect a `string`
slugify(42); /*?*/
// @ts-expect-error expect a `string`
slugify(); /*?*/
// @ts-expect-error expect a `string`
slugify(null); /*?*/
// @ts-expect-error expect a `string`
slugify({}); /*?*/
// @ts-expect-error expect a `string`
slugify([]); /*?*/

// ///////////////////////////////////////

export {};
