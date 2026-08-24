// ============================================================================
//  CONTACT DETAILS — ⬇️ EDIT THESE TWO with your real info.
// ============================================================================

// The email address people should reach you on.
export const EMAIL = "uulhaq@gmail.com";

// Your WhatsApp number in INTERNATIONAL format, digits only:
// country code + number, with NO "+", spaces or dashes.
// e.g. +92 300 1234567  →  '923001234567'
export const WHATSAPP = "923315075274";

// Pre-filled text that lands in the email body / WhatsApp message.
export const PREFILL = {
  subject: " ",
  message: "Hi Usman, ",
};

// Opens Gmail on the web with a fresh compose window — your address already in
// the "To" field, plus a subject and body. Falls back to the user's own login.
export const gmailComposeUrl = () =>
  "https://mail.google.com/mail/?view=cm&fs=1" +
  `&to=${encodeURIComponent(EMAIL)}` +
  `&su=${encodeURIComponent(PREFILL.subject)}` +
  `&body=${encodeURIComponent(PREFILL.message)}`;

// Opens WhatsApp straight to a chat with you (app on mobile, web on desktop),
// with the message pre-typed and ready to send.
export const whatsappUrl = () =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(PREFILL.message)}`;
