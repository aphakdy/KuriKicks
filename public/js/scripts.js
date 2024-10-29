document.addEventListener('DOMContentLoaded', async () => {
    const products = await fetchProducts();
    displayProducts(products);
});

async function fetchProducts() {
    try {
        const response = await fetch('json/products.json');
        const products = await response.json();
        console.log("Products loaded:", products);
        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

function displayProducts(products) {
    const container = document.querySelector('.inventoryproduct-container');
    products.slice(0, 5).forEach(product => {
        const productElement = createProductElement(product);
        container.appendChild(productElement);
    });
}

function createProductElement(product) {
    const productDiv = document.createElement('div');
    productDiv.className = 'product-item';
    productDiv.innerHTML = `
        <a href="#" data-id="${product.id}">
            <img src="images/${product.img_name}" alt="${product.name}">
        </a>
        <h3>${product.name}</h3>
        <h4>Size ${product.size}</h4>
    `;

    // add event listener to the link
    const link = productDiv.querySelector('a');
    link.addEventListener('click', function(event) {
        event.preventDefault();
        showProductDetails(product);
    });

    return productDiv;
}


function showProductDetails(product) {
    const modal = document.getElementById('productModal');
    const modalBody = modal.querySelector('.modal-body');
    modalBody.innerHTML = `
        <img src="images/${product.img_name}" alt="${product.name}" class="img-fluid mb-2">
        <h4>${product.name}</h4>
        <p>${product.description}</p>
        <p><strong>Color:</strong> ${product.color}</p>
        <p><strong>Size:</strong> ${product.size}</p>
        <p><strong>Price:</strong> $${product.price}</p>
        <p><strong>Brand:</strong> ${product.brand}</p>
    `;
    $('#productModal').modal('show');
}
