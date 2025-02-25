const foodContainer = document.getElementById("foodContainer");
const foodItemsTemplate = document.getElementById("itemsTemplate");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartItemsTemplate = document.getElementById("cartItemsTemplate");
const cartActionsContainer = document.getElementById("cartActionsContainer");
const cartActionsTemplate = document.getElementById("cartActionsTemplate");
const cartsNumberElement = document.getElementById("cart-number");

const items = [
  {
    id: 1,
    name: "Waffle",
    description: "Waffle with Berries",
    price: 6.5,
    imagePathMobile: "./assets/images/image-waffle-mobile.jpg",
    imagePathTablet: "./assets/images/image-waffle-tablet.jpg",
    imagePathDesktop: "./assets/images/image-waffle-desktop.jpg",
    thumbnail: "./assets/images/image-waffle-thumbnail",
  },
  {
    id: 2,
    name: "Creme Brulee",
    description: "Vanlila Bean Creme Brulee",
    price: 7.5,

    imagePathMobile: "./assets/images/image-creme-brulee-mobile.jpg",
    imagePathTablet: "./assets/images/image-creme-brulee-tablet.jpg",
    imagePathDesktop: "./assets/images/image-creme-brulee-desktop.jpg",
    thumbnail: "./assets/images/image-creme-brulee-thumbnail",
  },
  {
    id: 3,
    name: "Macaron",
    description: "Macaron Mix of Five",
    price: 8.0,

    imagePathMobile: "./assets/images/image-macaron-thumbnail.jpg",
    imagePathTablet: "./assets/images/image-macaron-tablet.jpg",
    imagePathDesktop: "./assets/images/image-macaron-desktop.jpg",
    thumbnail: "./assets/images/image-macron-thumbnail",
  },
  {
    id: 4,
    name: "Tiramisu",
    description: "Classic Tiramisu",
    price: 5.5,

    imagePathMobile: "./assets/images/image-tiramisu-mobile.jpg",
    imagePathTablet: "./assets/images/image-tiramisu-tablet.jpg",
    imagePathDesktop: "./assets/images/image-tiramisu-desktop.jpg",
    thumbnail: "./assets/images/image--thumbnail",
  },
  {
    id: 5,
    name: "Baklava",
    description: "Pistachio Baklava",
    price: 4.0,

    imagePathMobile: "./assets/images/image-baklava-mobile.jpg",
    imagePathTablet: "./assets/images/image-baklava-tablet.jpg",
    imagePathDesktop: "./assets/images/image-baklava-desktop.jpg",
    thumbnail: "./assets/images/image-baklava-thumbnail",
  },
  {
    id: 6,
    name: "Pie",
    description: "Lemon Meringue Pie",
    price: 5.0,

    imagePathMobile: "./assets/images/image-meringue-mobile.jpg",
    imagePathTablet: "./assets/images/image-meringue-tablet.jpg",
    imagePathDesktop: "./assets/images/image-meringue-desktop.jpg",
    thumbnail: "./assets/images/image-meringue-thumbnail",
  },
  {
    id: 7,
    name: "Cake",
    description: "Red Velvet Cake",
    price: 4.5,
    imagePath: "./assets/images/image-waffle-thumbnail.jpg",

    imagePathMobile: "./assets/images/image-cake-mobile.jpg",
    imagePathTablet: "./assets/images/image-cake-tablet.jpg",
    imagePathDesktop: "./assets/images/image-cake-desktop.jpg",
    thumbnail: "./assets/images/image-cake-thumbnail",
  },
  {
    id: 8,
    name: "Browine",
    description: "Salted Caramel Brownie",
    price: 5.5,

    imagePathMobile: "./assets/images/image-brownie-mobile.jpg",
    imagePathTablet: "./assets/images/image-brownie-tablet.jpg",
    imagePathDesktop: "./assets/images/image-brownie-desktop.jpg",
    thumbnail: "./assets/images/image-brownie-thumbnail",
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
    thumbnail: "./assets/images/image-panna-cotta-thumbnail",
  },
];

let carts = [];
const handleAddToCart = (id, element) => {
  const isNewCartExists = carts.some((cart) => (cart.id == id ? true : false));
  if (carts.length === 0) {
    document.getElementById("emptyCart").style.display = "none";
    cartActionsContainer.style.display = "flex";
  }

  if (isNewCartExists) {
    carts.forEach((cart) => {
      if (cart.id == id) {
        cart.quantity++;
      }
    });
  } else {
    carts.push({ id: id, quantity: 1 });
  }
  const cart = carts.find((cart) => cart.id == id);
  if (cart.quantity == 0) {
    element.style.display = "flex";
    element.nextElementSibling.style.display = "none";
  } else {
    element.style.display = "none";
    element.nextElementSibling.style.display = "flex";
  }

  populateCarts();
};

const handleDeleteCart = (id, element) => {
  for (let i = 0; i < carts.length; i++) {
    if (carts[i].id === id) {
      const item = document.querySelector(`[data-id="${id}"]`);
      item.querySelector(".addToCartBtn").style.display = "flex";
      item.querySelector(".removeFromCartBtn").style.display = "none";
      item.querySelector(".removeFromCartBtn > p").innerHTML = "1";
      console.log(item);
    }
  }
  carts = carts.filter((cart) => cart.id != id);
  if (carts.length == 0) {
    cartActionsContainer.style.display = "none";
    cartsNumberElement.innerHTML = "0";
    document.getElementById("emptyCart").style.display = "flex";
  }
  populateCarts();
};
const populateCarts = () => {
  cartItemsContainer.innerHTML = "";
  if (carts.length > 0) {
    cartActionsContainer.style.display = "flex";
    document.getElementById("emptyCart").style.display = "none";
  }

  let totalPrice = 0;
  carts.forEach(
    (cart) => (totalPrice += Number(cart.quantity) * items[cart.id - 1].price)
  );
  document.getElementById("totalPrice").innerHTML = `${totalPrice.toFixed(2)}`;
  let cartsNumber = 0;
  carts.forEach((cart) => {
    cartsNumber += cart.quantity;
    const item = items.find((item) => item.id == cart.id);
    const cartItemsTemplateClone = cartItemsTemplate.content.cloneNode(true);

    cartItemsTemplateClone.querySelector(".title").innerHTML = item.name;
    cartItemsTemplateClone.querySelector(".item-price").innerHTML =
      item.price.toFixed(2);
    cartItemsTemplateClone.querySelector(".total-price").innerHTML = (
      cart.quantity != 0 ? cart.quantity * item.price : item.price
    ).toFixed(2);
    cartItemsTemplateClone.querySelector(
      ".quantity"
    ).innerHTML = `${cart.quantity}xl`;

    cartItemsTemplateClone
      .querySelector(".deleteBtn")
      .addEventListener("click", (e) => handleDeleteCart(cart.id, e.target));

    cartItemsContainer.appendChild(cartItemsTemplateClone);
  });

  cartsNumberElement.innerHTML = `(${cartsNumber})`;
  createItems();
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
    foodContainer.appendChild(foodItemsTemplateClone);
  });
};

createItems();
