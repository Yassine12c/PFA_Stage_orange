// backend/utils/safeBrowsing.js
import fetch from "node-fetch";

export async function checkUrlSafety(url) {
  const apiKey = process.env.GOOGLE_API_KEY;
  const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;

  const body = {
    client: {
      clientId: "phishing-detector",
      clientVersion: "1.0.0",
    },
    threatInfo: {
      threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
      platformTypes: ["ANY_PLATFORM"],
      threatEntryTypes: ["URL"],
      threatEntries: [{ url }],
    },
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    console.log("🔍 Réponse SafeBrowsing:", data);

    if (data && data.matches && data.matches.length > 0) {
      const threat = data.matches[0].threatType;
      if (threat === "SOCIAL_ENGINEERING") return "phishing";
      if (threat === "MALWARE") return "malware";
    }
    return "safe";
  } catch (error) {
    console.error("❌ Erreur SafeBrowsing:", error);
    return "unknown";
  }
}
