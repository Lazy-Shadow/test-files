// Product data storage
let products = JSON.parse(localStorage.getItem('sellerProducts')) || [];
let productIdToDelete = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
});

// Render products
function renderProducts() {
    const productList = document.getElementById('productList');
    const emptyState = document.getElementById('emptyState');

    if (products.length === 0) {
        productList.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';
    productList.innerHTML = products.map(product => `
        <div class="col-md-6 col-lg-4">
            <div class="card h-100 shadow-sm">
                <div class="card-img-top position-relative" style="height: 200px; overflow: hidden;">
                    <img src="${product.image || 'https://via.placeholder.com/300x200?text=No+Image'}" 
                         class="card-img-top w-100 h-100 object-fit-cover" 
                         alt="${product.name}">
                    <span class="position-absolute top-2 start-2 badge bg-danger">${product.category}</span>
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-truncate">${product.name}</h5>
                    <p class="card-text text-muted small mb-2">${product.description.substring(0, 100)}${product.description.length > 100 ? '...' : ''}</p>
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <span class="h4 fw-bold text-danger">$${product.price.toFixed(2)}</span>
                        <span class="badge bg-success">In Stock: ${product.stock}</span>
                    </div>
                    <div class="d-flex gap-2 mt-auto">
                        <button class="btn btn-sm btn-outline-primary flex-grow-1" onclick="viewProduct(${product.id})">
                            <i class="fas fa-eye me-1"></i>View
                        </button>
                        <button class="btn btn-sm btn-outline-warning flex-grow-1" onclick="editProduct(${product.id})">
                            <i class="fas fa-edit me-1"></i>Edit
                        </button>
                        <button class="btn btn-sm btn-outline-danger flex-grow-1" onclick="deleteProduct(${product.id})">
                            <i class="fas fa-trash me-1"></i>Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Add product
function addProduct() {
    const form = document.getElementById('addProductForm');
    
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const newProduct = {
        id: Date.now(),
        name: document.getElementById('productName').value,
        price: parseFloat(document.getElementById('productPrice').value),
        category: document.getElementById('productCategory').value,
        stock: parseInt(document.getElementById('productStock').value),
        description: document.getElementById('productDescription').value,
        image: document.getElementById('productImage').value
    };

    products.push(newProduct);
    localStorage.setItem('sellerProducts', JSON.stringify(products));
    renderProducts();
    form.reset();
    bootstrap.Modal.getInstance(document.getElementById('addProductModal')).hide();
}

// Edit product
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    document.getElementById('editProductId').value = product.id;
    document.getElementById('editProductName').value = product.name;
    document.getElementById('editProductPrice').value = product.price;
    document.getElementById('editProductCategory').value = product.category;
    document.getElementById('editProductStock').value = product.stock;
    document.getElementById('editProductDescription').value = product.description;
    document.getElementById('editProductImage').value = product.image;

    new bootstrap.Modal(document.getElementById('editProductModal')).show();
}

// Update product
function updateProduct() {
    const form = document.getElementById('editProductForm');
    
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const id = parseInt(document.getElementById('editProductId').value);
    const index = products.findIndex(p => p.id === id);
    
    if (index !== -1) {
        products[index] = {
            ...products[index],
            name: document.getElementById('editProductName').value,
            price: parseFloat(document.getElementById('editProductPrice').value),
            category: document.getElementById('editProductCategory').value,
            stock: parseInt(document.getElementById('editProductStock').value),
            description: document.getElementById('editProductDescription').value,
            image: document.getElementById('editProductImage').value
        };

        localStorage.setItem('sellerProducts', JSON.stringify(products));
        renderProducts();
        form.reset();
        bootstrap.Modal.getInstance(document.getElementById('editProductModal')).hide();
    }
}

// View product
function viewProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const details = document.getElementById('viewProductDetails');
    details.innerHTML = `
        <div class="row g-4">
            <div class="col-md-6">
                <img src="${product.image || 'https://via.placeholder.com/400x300?text=No+Image'}" 
                     class="img-fluid rounded shadow" 
                     alt="${product.name}">
            </div>
            <div class="col-md-6">
                <h4 class="fw-bold mb-3">${product.name}</h4>
                <span class="badge bg-danger mb-3">${product.category}</span>
                <h3 class="text-danger fw-bold mb-3">$${product.price.toFixed(2)}</h3>
                <p class="text-muted mb-3">${product.description}</p>
                <div class="d-flex align-items-center gap-3 mb-3">
                    <span class="badge bg-success"><i class="fas fa-check-circle me-1"></i>In Stock: ${product.stock}</span>
                </div>
                <div class="border-top pt-3">
                    <small class="text-muted">Product ID: ${product.id}</small>
                </div>
            </div>
        </div>
    `;

    new bootstrap.Modal(document.getElementById('viewProductModal')).show();
}

// Delete product
function deleteProduct(id) {
    productIdToDelete = id;
    new bootstrap.Modal(document.getElementById('deleteProductModal')).show();
}

// Confirm delete
function confirmDelete() {
    if (productIdToDelete !== null) {
        products = products.filter(p => p.id !== productIdToDelete);
        localStorage.setItem('sellerProducts', JSON.stringify(products));
        renderProducts();
        productIdToDelete = null;
        bootstrap.Modal.getInstance(document.getElementById('deleteProductModal')).hide();
    }
}