export async function verifyRecaptcha(token: string | null): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  // Fail-closed : sans clé configurée, on bloque plutôt que de désactiver silencieusement
  // la protection anti-spam. L'appelant doit vérifier que le service est configuré avant
  // d'atteindre ce point (voir app/api/devis/route.ts).
  if (!secretKey) return false;
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
