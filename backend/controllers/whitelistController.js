const Whitelist = require('../models/Whitelist');

exports.getWhitelist = async (req, res) => {
  try {
    let wl = await Whitelist.findOne({ userId: req.user.id });
    if (!wl) {
      wl = await Whitelist.create({ userId: req.user.id, urls: [] });
    }
    res.json(wl.urls);
  } catch {
    res.status(500).json({ error: 'Erreur récupération liste blanche' });
  }
};

exports.addWhitelist = async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL manquante' });

  try {
    const wl = await Whitelist.findOne({ userId: req.user.id });
    if (!wl.urls.includes(url)) wl.urls.push(url);
    await wl.save();
    res.json(wl.urls);
  } catch {
    res.status(500).json({ error: 'Erreur ajout liste blanche' });
  }
};

exports.removeWhitelist = async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL manquante' });

  try {
    const wl = await Whitelist.findOne({ userId: req.user.id });
    wl.urls = wl.urls.filter(u => u !== url);
    await wl.save();
    res.json(wl.urls);
  } catch {
    res.status(500).json({ error: 'Erreur suppression liste blanche' });
  }
};
