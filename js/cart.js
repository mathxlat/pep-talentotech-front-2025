const getCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart;
};

const getCartTotal = () => {
    const cart = getCart();
    return cart.reduce((total, product) => total + product.price, 0);
};

const getCartCount = () => {
    return getCart().length;
};

const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

const clearCart = () => {
    localStorage.setItem("cart", JSON.stringify([]));
};

const completePurchase = () => {
    clearCart();
    window.location.href = "./index.html";
};

const updateCartTotal = () => {
    const total = document.querySelector("#total");
    total.innerHTML = "";

    if (getCartCount() !== 0) {
        const totalElement = document.createElement("p");
        totalElement.innerHTML = `&#128176; Total: $${getCartTotal()} USD`;
        total.appendChild(totalElement);
    }
};

const updateCart = () => {
    renderProductsCart();
    updateCartTotal();
    updateCartCount();
};

const updateCartCount = () => {
    const cartCount = document.querySelector("#cart-count");
    cartCount.textContent = getCartCount();
};

const addProductToCart = (product) => {
    let cart = getCart();
    cart.push(product);
    saveCart(cart);
    updateCart();
};

const deleteProductFromCart = (productIndex) => {
    let cart = getCart();
    cart.splice(productIndex, 1);
    saveCart(cart);
    updateCart();
};

const renderProductCartCard = (product, index) => {
    const { title, image, price } = product;
    const cardArticle = document.createElement("article");
    cardArticle.classList.add("card");
    cardArticle.style = `--card-bg: url('${image}');`;

    const cardPicture = document.createElement("picture");
    cardPicture.classList.add("card-picture");

    const cardImage = document.createElement("img");
    cardImage.src = image;
    cardImage.alt = `Foto de ${title}`;
    cardImage.classList.add("card-image");

    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    const cardTitle = document.createElement("h3");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = title;

    const cardPrice = document.createElement("p");
    cardPrice.classList.add("card-price");
    cardPrice.textContent = `$${price} USD`;

    const cardDeleteButton = document.createElement("button");
    cardDeleteButton.classList.add("card-button");
    cardDeleteButton.textContent = "Eliminar";
    cardDeleteButton.addEventListener("click", () => {
        deleteProductFromCart(index);
    });

    cardPicture.appendChild(cardImage);

    cardContent.appendChild(cardTitle);
    cardContent.appendChild(cardPrice);

    cardArticle.appendChild(cardPicture);
    cardArticle.appendChild(cardContent);
    cardArticle.appendChild(cardDeleteButton);

    return cardArticle;
};

const renderProductsCart = () => {
    const cart = getCart();

    const productCartCardsContainer = document.querySelector("#products");
    const actionsCart = document.querySelector("#actions");

    productCartCardsContainer.innerHTML = "";
    actionsCart.innerHTML = "";

    if (getCartCount() !== 0) {
        cart.forEach((product, index) => {
            productCartCardsContainer.appendChild(
                renderProductCartCard(product, index)
            );
        });

        const clearCartButton = document.createElement("button");
        clearCartButton.classList.add("cart-button");
        clearCartButton.textContent = "Vaciar carrito";
        clearCartButton.addEventListener("click", () => {
            if (confirm("¿Está seguro de vaciar el carrito?")) {
                clearCart();
                updateCart();
            }
        });

        const completePurchaseButton = document.createElement("button");
        completePurchaseButton.classList.add("cart-button");
        completePurchaseButton.textContent = "Completar compra";
        completePurchaseButton.addEventListener("click", () => {
            alert("¡Gracias por la compra! :)");
            completePurchase();
        });

        actionsCart.appendChild(clearCartButton);
        actionsCart.appendChild(completePurchaseButton);
    } else {
        const cartEmptyMessage = document.createElement("p");
        cartEmptyMessage.textContent = "No hay productos en el carrito";

        productCartCardsContainer.appendChild(cartEmptyMessage);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    getCart();
    updateCart();
});
