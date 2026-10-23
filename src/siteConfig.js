export const EMAIL = "mosaicmeevents@gmail.com";
// Replace this once to update Instagram links on both pages.
export const INSTAGRAM_URL = "https://www.instagram.com/";

export function emailLink(subject, lines) {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\r\n"))}`;
}

export const digitalOrder = emailLink("Mosaic Me | Digital mosaic order", [
  "Hi Mosaic Me,",
  "",
  "I'd like to order three personalised digital mosaics in colour and black and white.",
  "",
  "My name:",
  "Occasion:",
  "Date needed (if any):",
  "",
  "My main photos (up to three):",
  "(Attach these separately or describe which photos you want us to use.)",
  "",
  "My collection of smaller photos:",
  "(Attach your photos or paste a Google Drive/download link here.)",
  "",
  "For Google Drive, share the folder with mosaicmeevents@gmail.com so we can view and download the photos.",
  "",
  "Thanks!",
]);
