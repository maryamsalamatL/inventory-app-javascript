import Storage from "./Storage.js";
import CategoryView from "./CategoryView.js";
const productTitle = document.querySelector("#product-title");
const productQuantity = document.querySelector("#product-quantity");
const productCategory = document.querySelector("#product-category");
const addProductBtn = document.querySelector(".add-product-btn");
const productDOM = document.querySelector(".product-list");
const search = document.querySelector("#search-product");
const sort = document.querySelector("#sort-product");
const modal = document.querySelector(".modal-container");
const badge = document.querySelector(".badge");

const modalTitle = document.querySelector("#modal-product-title");
const modalQuantity = document.querySelector("#modal-product-quantity");
const modalCategory = document.querySelector("#modal-product-category");

const modalBtn = document.querySelector(".add-edited-product ");
const modalform = document.querySelector(".modal-form");

class ProductView {
  constructor() {
    addProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    search.addEventListener("input", (e) => this.searchProducts(e));
    sort.addEventListener("click", (e) => this.sortProducts(e));
    modalBtn.addEventListener("click", (e) => this.addEditedProduct(e));
    this.products = [];
  }
  addNewProduct(e) {
    e.preventDefault();
    const title = productTitle.value;
    const quantity = productQuantity.value;
    const category = productCategory.value;
    if (!title || !quantity || !category) {
      return;
    }
    Storage.saveProduct({ title, quantity, category });
    this.setApp();
    this.createProductList(this.products);
    productTitle.value = "";
    productQuantity.value = "";
    productCategory.value = 0;
  }
  setApp() {
    this.products = Storage.getAllProducts();
  }
  createProductList(products) {
    productDOM.innerHTML = "";
    let result = ``;

    products.forEach((p) => {
      const findedCategory = Storage.getAllCategories().find(
        (c) => c.id == p.category
      );
      result += `<div class="product">
                <h3>${p.title}</h3>
                <div class="product-desc">
                    <span class="product-list-quantity">${p.quantity}</span>
                    <span class="product-date">${new Date(
                      p.createdAt
                    ).toLocaleDateString("fa-IR")}</span>
                    <span class="product-list-category">${
                      findedCategory.title
                    }</span>
                    <button class="edit-product-btn"  data-id=${
                      p.id
                    }>ادیت</button>
                    <button class="delete-product-btn" data-id=${
                      p.id
                    }>حذف</button>
                </div></div> `;
    });
    productDOM.innerHTML = result;
    const deleteBtns = document.querySelectorAll(".delete-product-btn");
    const editBtns = document.querySelectorAll(".edit-product-btn");
    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => this.deleteProduct(e));
    });
    editBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => this.editProduct(e));
    });
  }
  searchProducts(e) {
    const value = e.target.value.trim();
    const filteredProducts = this.products.filter((p) => {
      return p.title.includes(value);
    });
    this.createProductList(filteredProducts);
  }
  sortProducts(e) {
    const value = e.target.value;
    if (value == "newest") {
      this.createProductList(Storage.getAllProducts());
    } else if (value == "oldest") {
      const sortedProducts = this.products.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      this.createProductList(sortedProducts);
    }
  }
  deleteProduct(e) {
    const id = e.target.dataset.id;
    Storage.deleteProduct(id);
    this.setApp();
    this.createProductList(this.products);
  }
  createModalCategoryList() {
    let result = `<option value="0" selected>یک گروه انتخاب کنید</option>`;
    Storage.getAllCategories().forEach((c) => {
      result += `<option value="${c.id}">${c.title}</option>`;
    });
    modalCategory.innerHTML = result;
  }
  editProduct(e) {
    const id = e.target.dataset.id;
    const findedProduct = this.products.find((p) => p.id == id);
    modal.classList.add("active");
    modalTitle.value = findedProduct.title;
    modalQuantity.value = findedProduct.quantity;
    this.createModalCategoryList();
    modalCategory.value = findedProduct.category;
    modalform.dataset.id = findedProduct.id;
  }
  addEditedProduct(e) {
    e.preventDefault();
    const title = modalTitle.value;
    const quantity = modalQuantity.value;
    const category = modalCategory.value;
    const id = modalform.dataset.id;
    if (!title || !quantity || !category) {
      return;
    }
    Storage.saveProduct({ title, quantity, category, id });
    this.setApp();
    this.createProductList(this.products);
    modal.classList.remove("active");
  }
}

export default new ProductView();
