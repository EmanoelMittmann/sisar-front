function base64UrlDecode(str: string) {
  // Corrige o padding e os caracteres do base64url
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) {
    str += "=";
  }
  return Buffer.from(str, "base64").toString("utf-8");
}

export interface JwtUser {
  sub: string;
  role: "USER" | "ADMIN";
  image: string;
  expired_at: number;
  iat: number;
  username: string;
}

export interface DecodedJwt {
  header: Record<string, any>;
  payload: JwtUser;
  signature: string;
}

export function decodeJWT(token: string): DecodedJwt {
  if (!token || typeof token !== "string") {
    throw new Error("Token JWT inválido");
  }

  const [headerB64, payloadB64, signatureB64] = token.split(".");

  if (!headerB64 || !payloadB64) {
    throw new Error("JWT inválido");
  }

  const header = JSON.parse(base64UrlDecode(headerB64));
  const payload = JSON.parse(base64UrlDecode(payloadB64));

  return {
    header,
    payload,
    signature: signatureB64,
  };
}
