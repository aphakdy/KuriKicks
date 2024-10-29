document.addEventListener('DOMContentLoaded', async () => {
    const products = await fetchProducts();
    displayProducts(products);
});

async function fetchProducts() {
    try {
        const response = await fetch('/json/products.json'); // Adjusted path to match your folder structure
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
    products.forEach(product => {
        const productElement = createProductElement(product);
        container.appendChild(productElement);
    });
}

function createProductElement(product) {
    const productDiv = document.createElement('div');
    productDiv.className = 'product-item';
    productDiv.innerHTML = `
        <a href="#" data-id="${product._id}" class="product-link" data-toggle="modal" data-target="#productModal">
            <img src="/images/${product.img_name}" alt="${product.name}">
        </a>
        <h3>${product.name}</h3>
        <h4>Size ${product.size}</h4>
    `;

    // Add event listener to the link
    const link = productDiv.querySelector('.product-link');
    link.addEventListener('click', function(event) {
        event.preventDefault();
        showProductDetails(product);
    });

    return productDiv;
}
function showProductDetails(product) {
    const modalBody = document.querySelector('.modal-body'); // Changed to querySelector
    modalBody.innerHTML = `
        <img src="/images/${product.img_name}" alt="${product.name}" class="img-fluid mb-2">
        <h4>${product.name}</h4>
        <p>${product.description}</p>
        <p><strong>Color:</strong> ${product.color}</p>
        <p><strong>Size:</strong> ${product.size}</p>
        <p><strong>Price:</strong> $${product.price}</p>
        <p><strong>Brand:</strong> ${product.brand}</p>
    `;
    $('#productModal').modal('show');
}
