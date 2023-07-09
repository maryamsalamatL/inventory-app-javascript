import CategoryView from "./CategoryView.js";
import Productview from "./Productview.js";
import Storage from "./Storage.js";
document.addEventListener("DOMContentLoaded", () => {
  CategoryView.setApp();
  Productview.setApp();
  CategoryView.createCategoryList();
  Productview.createProductList(Storage.getAllProducts());
});
