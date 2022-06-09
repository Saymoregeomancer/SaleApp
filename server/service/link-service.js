const osmosis = require("osmosis");

async function scrapeATB(marketUrl) {
  const prom = await new Promise((resolve, reject) => {
    let results = [];
    osmosis
      .get(marketUrl[0])
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
        (item.marketPicture = "atb"),
          (item.marketUrl = marketUrl[0]),
          item.salePrice / 100,
          item.salePrice / 100,
          (item.id = marketUrl[1]);
      })
      .data((item) => results.push(item))
      .then(() => resolve(results));
  });

  let ret = await prom[0];
  return ret;
}
// async function scrapeSilpo(marketUrl) {
//   const prom = await new Promise((resolve, reject) => {
//     let results = [];
//     osmosis
//       .get(marketUrl)
//       .find(".product-preview_info")
//       .set({
//         title: "h1.title",
//       })
//       .data((item) => item.marketPicture = 'silpo'
//       )
//       .data((item) => results.push(item))
//       .then(() => resolve(results));
//   });

//   let ret = await prom[0];
//   return ret;
// }

module.exports = async function cl(links) {
  let arr = [];
  for (let i = 0; i <= links.length - 1; i++) {
    if (links[i][0].includes("atbmarket.com")) {
      let r = await scrapeATB(links[i]);
      await arr.push(r);
    }
    // if (links[i].includes("shop.silpo.ua")) {
    //   let r = await scrapeSilpo(links[i]);
    //   await arr.push(r);
    // }
  }
  return arr;
};
