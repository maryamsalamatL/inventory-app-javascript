const categories = [{
        id: 1,
        title: "food",
        description: "this is a food",
        createdAt: "2022-09-20T11:54:12.561Z"
    },
    {
        id: 2,
        title: "food",
        description: "this is a food",
        createdAt: "2021-09-20T11:54:12.561Z"
    }, {
        id: 3,
        title: "food",
        description: "this is a food",
        createdAt: "2022-10-20T11:54:12.561Z"
    }
]
const products = [{
        id: 1,
        title: "گوشت",
        category: 'pp',
        quantity: 5,
        createdAt: "2022-09-20T11:54:12.561Z"
    },
    {
        id: 2,
        title: "گوشت",
        quantity: 3,
        category: 'pp',
        createdAt: "2021-09-20T11:54:12.561Z"
    }, {
        id: 3,
        title: "گوشت",
        quantity: 2,
        category: 'pp',
        createdAt: "2022-10-20T11:54:12.561Z"
    }
]
export default class Storage {
    static getAllCategories() {
        const allCategories = JSON.parse(localStorage.getItem('categories')) || [];
        return allCategories.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
    }
    static saveCategory(categoryToSave) {
        const allCategories = Storage.getAllCategories();
        const existItem = allCategories.find(c => c.id == categoryToSave.id);
        if (existItem) {
            existItem.title = categoryToSave.title;
            existItem.description = categoryToSave.description;
            existItem.createdAt = new Date().toISOString();
        } else {
            categoryToSave.id = Math.random();
            categoryToSave.createdAt = new Date().toDateString();
            allCategories.push(categoryToSave);
        }

        localStorage.setItem('categories', JSON.stringify(allCategories))
    }
    static getAllProducts() {
        const allProducts = JSON.parse(localStorage.getItem('products')) || [];
        return allProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            // if (value == "newest") {
            //     return allProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            // } else if (value == "oldest") {
            //     return allProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            // }

    }
    static saveProduct(productstoSave) {
        const allProducts = Storage.getAllProducts();
        const existItem = allProducts.find(p => p.id == productstoSave.id);
        if (existItem) {
            existItem.title = productstoSave.title;
            existItem.quantity = productstoSave.quantity;
            existItem.category = productstoSave.category;
            existItem.createdAt = new Date().toISOString();
        } else {
            productstoSave.id = Math.random();
            productstoSave.createdAt = new Date().toISOString();
            allProducts.push(productstoSave);
        }

        localStorage.setItem('products', JSON.stringify(allProducts))
    }
    static deleteProduct(id) {
        const filteredProducts = Storage.getAllProducts().filter(p => p.id != id);
        localStorage.setItem('products', JSON.stringify(filteredProducts))
    }
}