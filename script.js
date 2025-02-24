const foodContainer = document.getElementById("foodContainer");
const items = [
  { id: 1, name: "Waffle", description: "Waffle with Berries", price: 6.5 },
];
function handleAddToCart(e) {
  e.preventDefault();
  targetedElement = e.target;

  if (!targetedElement.closest("#addToCart")) {
    return;
  }

  const elementId = Number(targetedElement.dataset.id);
  const targetedItem = items.find((items) => items.id == elementId);
  console.log(targetedItem);
}
foodContainer.addEventListener("click", handleAddToCart);
