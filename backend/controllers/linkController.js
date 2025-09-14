// controllers/linkController.js
const axios = require("axios");
const History = require("../models/History");

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// Liens de test connus pour dev / démonstration
const testUrls = {
  "http://testsafebrowsing.appspot.com/s/phishing.html": "phishing",
  "http://testsafebrowsing.appspot.com/s/malware.html": "malware",
  "http://testsafebrowsing.appspot.com/s/social-engineering.html": "phishing",
  "http://malware.testing.google.test/testing/malware/": "malware",
  "http://unwanted.testing.google.test/": "unwanted"
};

// Fonction pour vérifier un lien via Google Safe Browsing API
const checkUrlWithGoogle = async (url) => {
  const body = {
    client: {
      clientId: "phishing-detector",
      clientVersion: "1.0.0",
    },
    threatInfo: {
      threatTypes: [
        "MALWARE",
        "SOCIAL_ENGINEERING",
        "UNWANTED_SOFTWARE",
        "POTENTIALLY_HARMFUL_APPLICATION",
      ],
      platformTypes: ["ANY_PLATFORM"],
      threatEntryTypes: ["URL"],
      threatEntries: [{ url }],
    },
  };

  const response = await axios.post(
    `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${GOOGLE_API_KEY}`,
    body
  );

  return response.data;
};

exports.checkLink = async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL manquante" });

  try {
    let safe = true;
    let threats = [];
    let message = " Le lien est correct et ne présente pas de danger.";

    // Gestion des liens de test connus
    if (testUrls[url]) {
      safe = false;
      threats = [testUrls[url].toUpperCase()];
      message = ` Attention ! Ce lien est ${testUrls[url]}`;
    } else {
      // Appel réel à l'API Google Safe Browsing
      const result = await checkUrlWithGoogle(url);
      if (result && result.matches && result.matches.length > 0) {
        safe = false;
        threats = result.matches.map((m) => m.threatType);
        message = `❌ Attention ! Ce lien contient des menaces : ${threats.join(", ")}`;
      }
    }

    // Sauvegarder dans l’historique
    const history = new History({ userId: req.user.id, url, safe, threats });
    await history.save();

    res.json({ url, safe, threats, message });
  } catch (err) {
    console.error("Erreur API Safe Browsing:", err.response?.data || err.message);
    res.status(500).json({ error: "Erreur lors de l'analyse du lien" });
  }
};
