function notImplemented() {
  throw new Error("Корзина ещё не реализована. Сначала прочитайте тесты.");
}

function addToCart(cart, product, quantity) {
  if (quantity <= 0) {
    throw new RangeError("Количество должно быть больше нуля");
  }
  if (quantity > product.stock) {
    throw new RangeError("Недостаточно товара на складе");
  }
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity += quantity;
    return cart;
  }
  return [...cart, { ...product, quantity }];
}
function changeQuantity(cart, id, quantity) {
  if (quantity <= 0) {
    throw new RangeError("Количество должно быть больше нуля");
  }
  const item = cart.find((product) => product.id === id);
  if (!item) {
    return cart;
  }
  if (quantity > item.stock) {
    throw new RangeError("Недостаточно товара на складе");
  }
  item.quantity = quantity;
  return cart;
}
function removeFromCart(cart, id) {
  return cart.filter((product) => product.id !== id);
}
function calculateCartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);

  let discount = 0;
  if (promoCode === "SAVE10" && subtotal >= 20000) {
    discount = subtotal * 0.1;
  }

  let delivery = 0;
  if (subtotal < 50000) {
    delivery = 30000;
  }

  const total = subtotal - discount + delivery;

  return { subtotal, discount, delivery, total };
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== "undefined") module.exports = cartApi;
if (typeof window !== "undefined") window.cartApi = cartApi;
