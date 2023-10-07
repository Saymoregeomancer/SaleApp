const { Router } = require("express");
const Link = require("../models/Links");
const auth = require("../middleware/auth.middleware");
const router = Router();
const scrape = require("../service/link-service");

router.post("/addlink", auth, async (req, res) => {
  try {
    const { url } = req.body;

    const existing = await Link.findOne({ from: url });

    if (existing) {
      throw "Посилання вже існує";
    }

    const link = new Link({
      from: url,
      owner: req.user.userId,
    });
    await link.save();

    res.status(200).json({ message: "Посилання додано" });
  } catch (e) {
    res
      .status(400)
      .json({ message: e || "Виникла помилка при збереженні посилання" });
  }
});

router.get("/getlinks", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });

    const LinksArray = links.filter((i) => {
      if (
        i.from.includes("www.atbmarket.com") ||
        i.from.includes("shop.silpo.ua") ||
        i.from.includes("kaluna.te.ua") ||
        i.from.includes("market.rukavychka.ua")
      ) {
        return { url: i.from, id: i.id };
      }
    });

    const response = LinksArray.map((link) => {
      return { id: link._id, url: link.from };
    });
    res.status(200).json({ links: response });
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так, приходь пызніше" });
  }
});

router.post("/getItem", auth, async (req, res) => {
  try {
    const { url } = req.body;

    const result = await scrape(url);


    res.status(200).json({ ...result });
  } catch (e) {
    res
      .status(400)
      .json({ message: e || "Виникла помилка при збереженні посилання" });
  }
});

module.exports = router;
