import items from './items.json';
import formatCurrency from './utils/formatCurrency';

const cartButton = document.querySelector('[data-cart-button]');
const cartItemsWrapper = document.querySelector('[data-cart-items-wrapper]');
const cartItemContainer = document.querySelector('[data-cart-items]');
const cartItemTemplate = document.querySelector('#cart-item-template');
const cartQuantity = document.querySelector('[data-cart-quantity]');
const cartTotal = document.querySelector('[data-cart-total]');

let shoppingCart = [];
const IMAGE_URL = 'https://dummyimage.com/210x130';

export function setupShoppingCart() {}

cartButton.addEventListener('click', () => {
  cartItemsWrapper.classList.toggle('invisible');
});

export function addToCart(id) {
  const existingItem = shoppingCart.find((entry) => entry.id === id);
  if (existingItem) {
    existingItem.quantity++;
  } else shoppingCart.push({ id, quantity: 1 });

  renderCart();
}

function renderCart() {
  cartQuantity.innerText = shoppingCart.length;
  const totalCents = shoppingCart.reduce((sum, entry) => {
    const item = items.find((i) => entry.id === i.id);
    return sum + item.priceCents * entry.quantity;
  }, 0);
  cartTotal.innerText = formatCurrency(totalCents / 100);
  cartItemContainer.innerHTML = '';

  shoppingCart.forEach((entry) => {
    const item = items.find((i) => entry.id === i.id);
    const cartItem = cartItemTemplate.content.cloneNode(true);
    const container = cartItem.querySelector('[data-item]');
    container.dataset.itemId = item.id;

    const name = cartItem.querySelector('[data-name]');
    name.innerText = item.name;

    if (entry.quantity > 1) {
      const quantity = cartItem.querySelector('[data-quantity]');
      quantity.innerText = `x${entry.quantity}`;
    }

    const price = cartItem.querySelector('[data-price]');

    price.innerText = formatCurrency((item.priceCents * entry.quantity) / 100);

    const image = cartItem.querySelector('[data-image]');
    image.src = `${IMAGE_URL}/${item.imageColor}/${item.imageColor}`;

    cartItemContainer.appendChild(cartItem);
  });
}
