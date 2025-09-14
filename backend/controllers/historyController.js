const History = require('../models/History');

exports.getUserHistory = async (req, res) => {
  try {
    const history = await History.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur récupération historique' });
  }
};

exports.deleteSelectedHistory = async (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids)) return res.status(400).json({ error: 'IDs invalides' });

  try {
    await History.deleteMany({ _id: { $in: ids }, userId: req.user.id });
    const history = await History.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur suppression' });
  }
};

exports.deleteAllHistory = async (req, res) => {
  try {
    await History.deleteMany({ userId: req.user.id });
    res.json([]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur suppression totale' });
  }
};
