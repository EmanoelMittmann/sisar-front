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
  expired_at: number;
  iat: number;
}

export interface DecodedJwt {
  header: Record<string, any>;
  payload: JwtUser;
  signature: string;
}

export function decodeJWT(token: string): DecodedJwt {
  const copy = token;
  console.log(copy);
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
