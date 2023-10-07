import atb from "./resourses/atb.png";
import silpo from "./resourses/silpo.png";
import kaluna from './resourses/kaluna.png';
import rukavychka from "./resourses/rukavichka.png";


export const logos = {
    atb: atb,
    silpo: silpo,
    rukavychka: rukavychka,
    kaluna: kaluna,
  };

  const shopCycle = [null, "atb", "silpo", "kaluna", "rukavichka"];


export  const shops = [
    {
      link: "https://kaluna.te.ua/catalog/",
      logo: kaluna,
      title: "Калина",
      name: "kaluna",
    },
    {
      link: "https://www.atbmarket.com/",
      logo: atb,
      title: "АТБ",
      name: "atb",
    },
    {
      link: "https://shop.silpo.ua/",
      logo: silpo,
      tile: "Сільпо",
      name: "silpo",
    },
    {
      link: "https://market.rukavychka.ua/",
      logo: rukavychka,
      title: "Рукавичка",
      name: "rukavychka",
    },
  ];