import Storage from "./Storage.js";

const categoryTitle = document.querySelector('#category-title');
const categoryDesc = document.querySelector('#category-description')
const addCategoryBtn = document.querySelector('.add-category-btn');
const cancelBtn = document.querySelector('.cancel-btn');
const categoryDOM = document.querySelector('#product-category')
const toggleForm = document.querySelector('.toggle-form')
const categoryForm = document.querySelector('.category-form')

class CategoryView {
    constructor() {
        addCategoryBtn.addEventListener('click', e => this.addNewCategory(e));
        toggleForm.addEventListener('click', () => this.toggleCategoryForm());
        cancelBtn.addEventListener('click', (e) => this.cancelCreateCategory(e))
        this.categories = [];
    }
    addNewCategory(e) {
        e.preventDefault()
        const title = categoryTitle.value;
        const description = categoryDesc.value;
        if (!title || !description) { return }
        Storage.saveCategory({ title, description })
        this.setApp();
        this.createCategoryList();
        categoryTitle.value = "";
        categoryDesc.value = "";
        toggleForm.classList.remove('hidden');
        categoryForm.classList.add('hidden');


    }
    setApp() {
        this.categories = Storage.getAllCategories()
    }
    createCategoryList() {
        let result = `<option value="0" selected>یک گروه انتخاب کنید</option>`;
        this.categories.forEach(c => {
            result += `<option value="${c.id}">${c.title}</option>`
        })
        categoryDOM.innerHTML = result

    }

    toggleCategoryForm() {
        toggleForm.classList.add('hidden');
        categoryForm.classList.remove('hidden')
    }
    cancelCreateCategory() {
        e.preventDefault();
        toggleForm.classList.remove('hidden');
        categoryForm.classList.add('hidden')
    }
}

export default new CategoryView()