export const EMAIL = "mosaicmeevents@gmail.com";
// Replace this once to update Instagram links on both pages.
export const INSTAGRAM_URL = "https://www.instagram.com/";

export function emailLink(subject, lines) {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\r\n"))}`;
}

export const digitalOrder = emailLink("Mosaic Me | Digital mosaic order", [
  "Hi Mosaic Me,",
  "",
  "I'd like to order a personalised digital photo mosaic.",
  "",
  "My name:",
  "Occasion / who it is for:",
  "Date I need it by (if any):",
  "Intended print size (if I plan to print it):",
  "Anything else I have in mind:",
  "",
  "MY MAIN IMAGE",
  "This is the large picture the finished mosaic should show.",
  "Main image filename or link:",
  "",
  "MY SMALLER PHOTOS",
  "I have attached my photos, or shared them here:",
  "Photo folder / download link:",
  "",
  "Before sending: label the main image MAIN IMAGE so it is easy to identify.",
  "Attach a small collection directly. For a larger collection, share a Google Drive folder with mosaicmeevents@gmail.com or include another download link we can access. Please check that we can view and download the files.",
  "",
  "Please confirm the final price and timing before starting. I'd like both colour and black-and-white versions of the finished digital artwork.",
  "",
  "Thanks!",
]);
