const { Router } = require("express");
const Link = require("../models/Links");
const auth = require("../middleware/auth.middleware");
const router = Router();
const scrape = require("../service/link-service");


router.post("/addlink", auth, async (req, res) => {
  try {
    const { from } = req.body;

    const existing = await Link.findOne({ from });

    if (existing) {
      return res.json({ link: existing });
    }

    const link = new Link({
      from,
      owner: req.user.userId,
    });

    await link.save();

    res.status(201).json({ link });
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так" });
  }
});

router.get("/getlinks", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });

    const LinksArray = await links.map((i) => {
      return [i.from, i.id];
    });

    const response = await scrape(LinksArray);

    res.json(response);
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так, приходь пызніше" });
  }
});

module.exports = router;
