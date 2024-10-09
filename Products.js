// Cargar los productos desde el localStorage
let products = JSON.parse(localStorage.getItem('products')) || [];

// Función para mostrar los productos en la pantalla de Ver Productos
function displayAllProducts() {
    const allProductsList = document.getElementById('allProductsList');
    allProductsList.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p>Cantidad: ${product.quantity}</p>
            ${product.image ? `<img src="${product.image}" alt="${product.name}" class="product-image">` : ''}
        `;
        allProductsList.appendChild(productCard);
    });
}

// Llamar a la función para mostrar los productos cuando se cargue la página
displayAllProducts();
