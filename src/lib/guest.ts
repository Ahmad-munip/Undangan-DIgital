const DEFAULT_GUEST_NAME = "Bapak/Ibu/Saudara/i";
const GUEST_PARAM_KEYS = ["to", "guest", "name", "nama", "untuk"];

const cleanGuestName = (value: string | null) => {
  if (!value) return "";

  return value
    .replace(/\+/g, " ")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
};

export const getGuestNameFromUrl = () => {
  if (typeof window === "undefined") return DEFAULT_GUEST_NAME;

  const params = new URLSearchParams(window.location.search);
  const rawName = GUEST_PARAM_KEYS.map((key) => params.get(key)).find(Boolean) ?? "";
  const guestName = cleanGuestName(rawName);

  if (guestName) {
    window.localStorage.setItem("wedding_guest_name", guestName);
    return guestName;
  }

  return cleanGuestName(window.localStorage.getItem("wedding_guest_name")) || DEFAULT_GUEST_NAME;
};

export const createInvitationLink = (baseUrl: string, guestName: string) => {
  const normalizedBaseUrl = baseUrl.trim().replace(/\?+$/, "");
  const url = new URL(normalizedBaseUrl || "https://example.com");
  url.searchParams.set("to", cleanGuestName(guestName) || DEFAULT_GUEST_NAME);
  return url.toString();
};

export { DEFAULT_GUEST_NAME };
