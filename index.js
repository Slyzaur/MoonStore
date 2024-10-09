let products = JSON.parse(localStorage.getItem('products')) || [];

// Función para agregar un producto
function addProduct() {
    const name = document.getElementById('productName').value.trim();
    const quantity = parseInt(document.getElementById('productQuantity').value);
    const imageInput = document.getElementById('productImage');

    let image = null;

    // Verificar si se ha seleccionado una imagen
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            image = e.target.result; // Convertir la imagen a Base64
            saveProduct(name, quantity, image);
        };
        reader.readAsDataURL(imageInput.files[0]); // Leer la imagen como Data URL
    } else {
        saveProduct(name, quantity, image);
    }
}

// Función para guardar el producto en el arreglo y el localStorage
function saveProduct(name, quantity, image) {
    if (name && quantity > 0) {
        const existingProduct = products.find(product => product.name.toLowerCase() === name.toLowerCase());
        if (existingProduct) {
            existingProduct.quantity += quantity;
            existingProduct.image = image || existingProduct.image; // Actualizar imagen si hay una nueva
        } else {
            products.push({ name, quantity, image });
        }
        localStorage.setItem('products', JSON.stringify(products));
        document.getElementById('productName').value = '';
        document.getElementById('productQuantity').value = '';
        document.getElementById('productImage').value = '';
        displayProducts();
    }
}

// Función para mostrar los productos en la sección de inventario
function displayProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p>Cantidad: ${product.quantity}</p>
            ${product.image ? `<img src="${product.image}" alt="${product.name}" class="product-image">` : ''}
            <button onclick="removeProduct('${product.name}')">Eliminar</button>
        `;
        productList.appendChild(productCard);
    });
}

// Función para eliminar un producto
function removeProduct(name) {
    products = products.filter(product => product.name.toLowerCase() !== name.toLowerCase());
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
}

// Función para actualizar un producto
function updateProduct() {
    const name = document.getElementById('updateProductName').value.trim();
    const newQuantity = parseInt(document.getElementById('updateProductQuantity').value);

    const product = products.find(product => product.name.toLowerCase() === name.toLowerCase());
    if (product && newQuantity > 0) {
        product.quantity = newQuantity;
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
    }
}

displayProducts();
