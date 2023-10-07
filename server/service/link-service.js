const osmosis = require("osmosis");
const puppeteer = require("puppeteer");

async function scrapeATB(marketUrl) {
  const prom = await new Promise((resolve, reject) => {
    let results = [];
    osmosis
      .get(marketUrl)

      .find(".product-price")
      .set({
        price: "data.product-price__top > span",
        salePrice: "data.product-price__bottom > span",
      })
      .find(".cardproduct-tabs__item > picture")
      .set({
        mainPicture: "img@src",
      })
      .find(".product-page__row")
      .set({
        title: ".page-title",
      })
      .data((item) => {
        item.marketPicture = "atb";
        item.marketUrl = marketUrl;

        let price1 = item.price.replace(/[^\d.]/g, "");
        let price2 = item.salePrice
          ? item?.salePrice.replace(/[^\d.]/g, "")
          : null;

        if (price2) {
          item.price = price2;
          item.salePrice = price1;
        } else {
          item.price = price1;
        }
      })
      .data((item) => results.push(item))
      .then(() => resolve(results));
  });

  let ret = await prom[0];
  return ret;
}
async function scrapeRukavychka(marketUrl) {
  const prom = await new Promise((resolve, reject) => {
    let results = [];
    osmosis
      .get(marketUrl)
      .find(".fm-module-price")
      .set({
        price: "span.fm-module-price-new",
        salePrice: "span.fm-module-price-old",
      })

      .find("div.fm-product-slide")
      .set({
        mainPicture: "a@href",
      })
      .find("#product-product")
      .set({
        title: "h1.fm-main-title",
      })
      .data((item) => {
        item.marketPicture = "rukavychka";
        item.marketUrl = marketUrl;

        let price1 = item.price.replace(/[^\d.]/g, "");
        let price2 = item.salePrice
          ? item?.salePrice.replace(/[^\d.]/g, "")
          : null;

        if (price2) {
          item.price = price2;
          item.salePrice = price1;
        } else {
          item.price = price1;
        }
      })
      .data((item) => results.push(item))
      .then(() => resolve(results));
  });

  let ret = await prom[0];
  return ret;
}

async function scrapeKaluna(marketUrl) {
  const resault = await (async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.goto(marketUrl, { waitUntil: "domcontentloaded" });

    const productTitle = await page.$eval(
      ".product_name",
      (element) => element.textContent
    );
    const productPrice = await page.$eval(
      ".current_price",
      (element) => element.textContent
    );

    let productSalePrice;

    try {
      productSalePrice = await page.$eval(
        ".stable_price",
        (element) => element.textContent
      );
    } catch (error) {
      productSalePrice = null;
    }

    productimage = await page.$eval(
      ".photo",
      (element) => `https://kaluna.te.ua${element.getAttribute("src")}`
    );

    await browser.close();

    let price1 = productPrice.replace(/[^\d.]/g, "");
    let price2 = productSalePrice
      ? productSalePrice.replace(/[^\d.]/g, "")
      : null;

    if (price2) {
      let buff = price1;
      price1 = price2;
      price2 = buff;
    }

    let buffer = {
      title: productTitle,
      price: price1,
      salePrice: price2,
      marketUrl: marketUrl,
      marketPicture: "kaluna",
      mainPicture: productimage,
    };

    return buffer;
  })();

  return resault;
}

async function scrapeSilpo(marketUrl) {
  const resault = await (async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.goto(marketUrl, { waitUntil: "domcontentloaded" });

    // await page.waitForTimeout(2000);

    const productTitle = await page.$eval(
      ".product-page__data div",
      (element) => element.textContent
    );

    const productimage = await page.evaluate(() => {
      const div = document.querySelector(".product-page__img");
      const style = window.getComputedStyle(div);

      const backgroundImageStyle = style.getPropertyValue("background-image");
      const matches = backgroundImageStyle.match(/url\("(.+)"\)/);

      if (matches && matches.length >= 2) {
        return matches[1];
      } else {
        return null;
      }
    });

    const productPrice = await page.$eval(
      ".product-page-price__main",
      (element) => element.textContent
    );

    let productSalePrice;

    try {
      productSalePrice = await page.$eval(
        ".product-page-price__old",
        (element) => element.textContent
      );
    } catch (error) {
      productSalePrice = null;
    }

    await browser.close();

    let price1 = productPrice.replace(/[^\d.]/g, "");
    let price2 = productSalePrice
      ? productSalePrice.replace(/[^\d.]/g, "")
      : null;

    if (price2) {
      let buff = price1;
      price1 = price2;
      price2 = buff;
    }

    let buffer = {
      title: productTitle,
      price: price1,
      salePrice: price2,
      marketUrl: marketUrl,
      marketPicture: "silpo",
      mainPicture: productimage,
    };

    return buffer;
  })();

  return resault;
}

module.exports = async function scrape(link) {
  let result;
  if (link.includes("atbmarket.com")) {
    result = await scrapeATB(link);
  }
  if (link.includes("market.rukavychka.ua")) {
    result = await scrapeRukavychka(link);
  }
  if (link.includes("shop.silpo.ua")) {
    result = await scrapeSilpo(link);
  }
  if (link.includes("kaluna.te.ua")) {
    result = await scrapeKaluna(link);
  }

  return result;
};
