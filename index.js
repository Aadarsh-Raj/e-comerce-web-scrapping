console.log("Arya");
console.log("------------------------------------------");
const axios = require("axios");
const cheerio = require("cheerio");
const xlsx = require("xlsx");
const products = [];
const getDataFromApi = async () => {
  try {
    const response = await axios.get(
      "https://app.zenserp.com/api/v2/search?apikey=b5306fe0-d233-11ee-9268-e7d3b73f2bea&q=Iphone%2012&tbm=shop"
    );
    const data = response.data.shopping_results;
    data.forEach((ele) => {
      products.push({
        title: ele.title,
        price: ele.price,
      });
    });
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(products);
    xlsx.utils.book_append_sheet(workbook, worksheet, "sheet1");
    xlsx.writeFile(workbook, "output.xlsx");
    console.log(products);
  } catch (error) {
    console.log("error", error);
  }
};
getDataFromApi();
