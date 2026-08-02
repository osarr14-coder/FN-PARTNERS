export async function verifyRecaptcha(token: string | null): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  // Pas de clé configurée : mode dégradé, on ne bloque pas la soumission tant que
  // reCAPTCHA n'est pas activé.
  if (!secretKey) return true;
  if (!token) return false;

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: secretKey, response: token }),
    });
    const data = (await res.json()) as { success?: boolean; score?: number };
    return Boolean(data.success) && (typeof data.score !== "number" || data.score >= 0.5);
  } catch (error) {
    console.error("[recaptcha] échec de la vérification:", error);
    return false;
  }
}
