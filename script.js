const foodContainer = document.getElementById("foodContainer");
const foodItemsTemplate = document.getElementById("itemsTemplate");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartItemsTemplate = document.getElementById("cartItemsTemplate");
const cartActionsContainer = document.getElementById("cartActionsContainer");
const cartActionsTemplate = document.getElementById("cartActionsTemplate");
const cartsNumberElement = document.getElementById("cart-number");
const cartsContainer = document.getElementById("cartContainer");
const menuBar = document.getElementById("menuBar");
const popupContainer = document.getElementById("popupContainer");
const popup = document.getElementById("popup");
const confirmBtn = document.getElementById("confirmBtn");
const thumbnailTemplate = document.getElementById("thumbnailsCartsTemplate");
const thumbnailCarts = document.getElementById("thumbnailCarts");
const startOrderButton = document.getElementById("startOrderButton");

const items = [
  {
    id: 1,
    name: "Waffle",
    description: "Waffle with Berries",
    price: 6.5,
    imagePathMobile: "./assets/images/image-waffle-mobile.jpg",
    imagePathTablet: "./assets/images/image-waffle-tablet.jpg",
    imagePathDesktop: "./assets/images/image-waffle-desktop.jpg",
    thumbnail: "./assets/images/image-waffle-thumbnail.jpg",
  },
  {
    id: 2,
    name: "Creme Brulee",
    description: "Vanlila Bean Creme Brulee",
    price: 7.5,

    imagePathMobile: "./assets/images/image-creme-brulee-mobile.jpg",
    imagePathTablet: "./assets/images/image-creme-brulee-tablet.jpg",
    imagePathDesktop: "./assets/images/image-creme-brulee-desktop.jpg",
    thumbnail: "./assets/images/image-creme-brulee-thumbnail.jpg",
  },
  {
    id: 3,
    name: "Macaron",
    description: "Macaron Mix of Five",
    price: 8.0,

    imagePathMobile: "./assets/images/image-macaron-thumbnail.jpg",
    imagePathTablet: "./assets/images/image-macaron-tablet.jpg",
    imagePathDesktop: "./assets/images/image-macaron-desktop.jpg",
    thumbnail: "./assets/images/image-macaron-thumbnail.jpg",
  },
  {
    id: 4,
    name: "Tiramisu",
    description: "Classic Tiramisu",
    price: 5.5,

    imagePathMobile: "./assets/images/image-tiramisu-mobile.jpg",
    imagePathTablet: "./assets/images/image-tiramisu-tablet.jpg",
    imagePathDesktop: "./assets/images/image-tiramisu-desktop.jpg",
    thumbnail: "./assets/images/image-tiramisu-thumbnail.jpg",
  },
  {
    id: 5,
    name: "Baklava",
    description: "Pistachio Baklava",
    price: 4.0,

    imagePathMobile: "./assets/images/image-baklava-mobile.jpg",
    imagePathTablet: "./assets/images/image-baklava-tablet.jpg",
    imagePathDesktop: "./assets/images/image-baklava-desktop.jpg",
    thumbnail: "./assets/images/image-baklava-thumbnail.jpg",
  },
  {
    id: 6,
    name: "Pie",
    description: "Lemon Meringue Pie",
    price: 5.0,

    imagePathMobile: "./assets/images/image-meringue-mobile.jpg",
    imagePathTablet: "./assets/images/image-meringue-tablet.jpg",
    imagePathDesktop: "./assets/images/image-meringue-desktop.jpg",
    thumbnail: "./assets/images/image-meringue-thumbnail.jpg",
  },
  {
    id: 7,
    name: "Cake",
    description: "Red Velvet Cake",
    price: 4.5,
    imagePathMobile: "./assets/images/image-cake-mobile.jpg",
    imagePathTablet: "./assets/images/image-cake-tablet.jpg",
    imagePathDesktop: "./assets/images/image-cake-desktop.jpg",
    thumbnail: "./assets/images/image-cake-thumbnail.jpg",
  },
  {
    id: 8,
    name: "Browine",
    description: "Salted Caramel Brownie",
    price: 5.5,

    imagePathMobile: "./assets/images/image-brownie-mobile.jpg",
    imagePathTablet: "./assets/images/image-brownie-tablet.jpg",
    imagePathDesktop: "./assets/images/image-brownie-desktop.jpg",
    thumbnail: "./assets/images/image-brownie-thumbnail.jpg",
  },
  {
    id: 9,
    name: "Panna",
    description: "Vanilla Panna Cotta",
    price: 6.0,
    imagePath: "./assets/images/image-waffle-thumbnail.jpg",

    imagePathMobile: "./assets/images/image-panna-cotta-mobile.jpg",
    imagePathTablet: "./assets/images/image-panna-cotta-tablet.jpg",
    imagePathDesktop: "./assets/images/image-panna-cotta-desktop.jpg",
    thumbnail: "./assets/images/image-panna-cotta-thumbnail.jpg",
  },
];

const LOCAL_STORAGE_CARTS = "myCarts.carts";
let carts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CARTS)) || [];

const handleAddToCart = (id, element) => {
  //variable to checks if the item exists in the cart
  const isNewCartExists = carts.some((cart) => (cart.id == id ? true : false));

  //change the add to cart button to increment and decrement button
  activeCartBtn(id);

  //remove the empty cart image and append cart actions to the container
  if (carts.length === 0) {
    document.getElementById("emptyCart").style.display = "none";
    cartActionsContainer.style.display = "flex";
  }

  //increment the quantity if the item exists in the cart
  //and if not create a new cart object and append to the carts object
  if (isNewCartExists) {
    carts.forEach((cart) => {
      if (cart.id == id) {
        cart.quantity++;
      }
    });
  } else {
    carts.push({ id: id, quantity: 1, isActive: true });
  }
  /*   const cart = carts.find((cart) => cart.id == id);
  if (cart.quantity == 0) {
    element.style.display = "flex";
    element.nextElementSibling.style.display = "none";
  } else {
    element.style.display = "none";
    element.nextElementSibling.style.display = "flex";
  } */

  populateCarts();
};

const handleDeleteCart = (id) => {
  // Find the index of the cart item
  const cartIndex = carts.findIndex((cart) => cart.id === id);

  if (cartIndex !== -1) {
    const item = document.querySelector(`[data-id="${id}"]`);

    if (item) {
      const addToCartBtn = item.querySelector(".addToCartBtn");
      const removeFromCartBtn = item.querySelector(".removeFromCartBtn");

      if (addToCartBtn && removeFromCartBtn) {
        addToCartBtn.style.display = "flex";
        removeFromCartBtn.style.display = "none";
        removeFromCartBtn.querySelector("p").textContent = "1";
      }
    }

    // Remove item from the carts array
    carts.splice(cartIndex, 1);
  }

  if (carts.length === 0) {
    cartActionsContainer.style.display = "none";
    cartsNumberElement.textContent = "0";
    document.getElementById("emptyCart").style.display = "flex";
  }

  populateCarts();
};

const populateCarts = () => {
  // Clear existing cart items
  cartItemsContainer.innerHTML = "";

  if (carts.length === 0) {
    cartActionsContainer.style.display = "none";
    document.getElementById("emptyCart").style.display = "flex";
    document.getElementById("totalPrice").textContent = "0.00";
    cartsNumberElement.textContent = "(0)";
    return;
  }

  cartActionsContainer.style.display = "flex";
  document.getElementById("emptyCart").style.display = "none";

  let totalPrice = 0;
  let cartsNumber = 0;

  carts.forEach((cart) => {
    const item = items.find((item) => item.id === cart.id);
    if (!item) return;

    cartsNumber += cart.quantity;
    totalPrice += cart.quantity * item.price;

    const cartItemsTemplateClone = cartItemsTemplate.content.cloneNode(true);
    cartItemsTemplateClone.querySelector(".title").textContent = item.name;
    cartItemsTemplateClone.querySelector(".item-price").textContent =
      item.price.toFixed(2);
    cartItemsTemplateClone.querySelector(".total-price").textContent = (
      cart.quantity * item.price
    ).toFixed(2);
    cartItemsTemplateClone.querySelector(
      ".quantity"
    ).textContent = `${cart.quantity}x`;

    cartItemsTemplateClone
      .querySelector(".deleteBtn")
      .addEventListener("click", () => {
        handleDeleteCart(cart.id);
      });

    cartItemsContainer.appendChild(cartItemsTemplateClone);
  });

  document.getElementById("totalPrice").textContent = totalPrice.toFixed(2);
  cartsNumberElement.textContent = `(${cartsNumber})`;

  saveToLocalStorage();
};

const handleIncrement = (element, id) => {
  const targetedElement = element.closest("button");
  carts.forEach((cart) => {
    if (cart.id == id) {
      cart.quantity++;
      cartActionsContainer.style.display = "flex";
      targetedElement.querySelector("p").innerHTML = cart.quantity;

      populateCarts();
    }
  });
};

const handleDecrement = (element, id) => {
  const targetedElement = element.closest("button");
  for (let i = 0; i < carts.length; i++) {
    if (carts[i].id == id) {
      carts[i].quantity--;

      targetedElement.querySelector("p").innerHTML = carts[i].quantity;
    }

    if (carts[i].id == id && carts[i].quantity == 0) {
      carts.splice(i, 1);
      targetedElement.style.display = "none";
      targetedElement.previousElementSibling.style.display = "flex";
      if (carts.length === 0) {
        cartActionsContainer.style.display = "none";
        document.getElementById("emptyCart").style.display = "flex";
        targetedElement.querySelector("p").innerHTML = 1;
      }
      populateCarts();
      break;
    }
    populateCarts();
  }
};
const createItems = () => {
  foodContainer.innerHTML = "";

  items.forEach((item) => {
    const foodItemsTemplateClone = foodItemsTemplate.content.cloneNode(true);
    foodItemsTemplateClone.querySelector(".title").innerHTML = item.name;
    foodItemsTemplateClone.querySelector(".subtitle").innerHTML =
      item.description;
    foodItemsTemplateClone.querySelector(".price").innerHTML =
      item.price.toFixed(2);

    foodItemsTemplateClone
      .querySelector(".desktop-image")
      .setAttribute("src", item.imagePathDesktop);
    foodItemsTemplateClone
      .querySelector(".mobile-image")
      .setAttribute("src", item.imagePathMobile);
    foodItemsTemplateClone.querySelector("#item").dataset.id = item.id;
    /*    foodItemsTemplateClone
      .querySelector("#item")
      .addEventListener("click", (e) => {
        const targetedElement = e.target.closest("button");

        if (!targetedElement?.classList.contains("addToCartBtn")) {
          return;
        }
        console.log(targetedElement);
      }); */
    foodItemsTemplateClone
      .querySelector(".addToCartBtn")
      .addEventListener("click", (e) => {
        const targetedElement = e.target.closest("button");

        if (!targetedElement?.classList.contains("addToCartBtn")) {
          return;
        }

        handleAddToCart(item.id, targetedElement);
      });
    foodItemsTemplateClone
      .querySelector(".decrementBtn")
      .addEventListener("click", (e) => handleDecrement(e.target, item.id));
    foodItemsTemplateClone
      .querySelector(".incrementBtn")
      .addEventListener("click", (e) => handleIncrement(e.target, item.id));
    const cart = carts.find((cart) => cart.id == item.id);
    if (cart?.isActive) {
      foodItemsTemplateClone.querySelector(".addToCartBtn").style.display =
        "none";
      foodItemsTemplateClone.querySelector(".removeFromCartBtn").style.display =
        "flex";
    }
    foodContainer.appendChild(foodItemsTemplateClone);
  });
};

const activeCartBtn = (id) => {
  const element = document
    .querySelector(`[data-id="${id}"]`)
    .querySelector(".addToCartBtn");
  element.style.display = "none";
  element.nextElementSibling.style.display = "flex";
};

const populateCartThumbnail = () => {
  thumbnailCarts.innerHTML = "";
  carts.forEach((cart) => {
    const item = items.find((item) => item.id == cart.id);
    const thumbnailsCartsTemplateClone =
      thumbnailTemplate.content.cloneNode(true);
    thumbnailsCartsTemplateClone
      .querySelector("#thumbnailCartImage")
      .setAttribute("src", item.thumbnail);
    thumbnailsCartsTemplateClone.querySelector(".title").innerHTML = item.name;
    thumbnailsCartsTemplateClone.querySelector(
      ".quantity"
    ).innerHTML = `${cart.quantity}xl`;
    thumbnailCarts.appendChild(thumbnailsCartsTemplateClone);
  });
};
menuBar.addEventListener("click", (e) => {
  e.stopPropagation();
  if (cartsContainer.classList.contains("hidden")) {
    cartsContainer.classList.remove("hidden");
    cartsContainer.classList.add("flex");
  } else {
    cartsContainer.classList.remove("flex");
    cartsContainer.classList.add("hidden");
  }
});
cartsContainer.addEventListener("click", (e) => e.stopPropagation());
document.querySelector("body").addEventListener("click", () => {
  cartsContainer.classList.remove("flex");
  cartsContainer.classList.add("hidden");
  popupContainer.classList.add("hidden");
});

const saveToLocalStorage = () => {
  requestIdleCallback(() => {
    localStorage.setItem(LOCAL_STORAGE_CARTS, JSON.stringify(carts));
  });
};
confirmBtn.addEventListener("click", () => {
  popupContainer.classList.remove("hidden");
  popupContainer.classList.add("flex");
  populateCartThumbnail();
});

startOrderButton.addEventListener("click", (e) => {
  carts.splice(0, carts.length);
  popupContainer.style.display = "none";
  createItems();
  populateCarts();
  saveToLocalStorage();
});
popup.addEventListener("click", (e) => e.stopPropagation());
populateCarts();
createItems();
