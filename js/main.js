const getProducts = async () => {
    const url = "https://fakestoreapi.com/products";
    const response = await fetch(url);
    const products = await response.json();
    return products;
};

const getCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart;
};

const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

const updateCartCount = () => {
    const cart = getCart();
    const cartCount = document.querySelector("#cart-count");
    cartCount.textContent = cart.length;
};

const addProductToCart = (product) => {
    let cart = getCart();
    cart.push(product);
    saveCart(cart);
    updateCartCount();
};

const renderProductCard = (product) => {
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

    const cardAddButton = document.createElement("button");
    cardAddButton.classList.add("card-button");
    cardAddButton.textContent = "Agregar";
    cardAddButton.addEventListener("click", () => {
        addProductToCart(product);
    });

    cardPicture.appendChild(cardImage);

    cardContent.appendChild(cardTitle);
    cardContent.appendChild(cardPrice);

    cardArticle.appendChild(cardPicture);
    cardArticle.appendChild(cardContent);
    cardArticle.appendChild(cardAddButton);

    return cardArticle;
};

const renderProducts = async () => {
    const products = await getProducts();
    const productCardsContainer = document.querySelector("#products");

    products.forEach((product) => {
        productCardsContainer.appendChild(renderProductCard(product));
    });
};

document.addEventListener("DOMContentLoaded", () => {
    getCart();
    updateCartCount();
    renderProducts();
});
