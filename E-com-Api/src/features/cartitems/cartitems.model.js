export default class cartItemsModel {
  constructor(productId, userID, quantity, id) {
    this.productId = productId;
    this.userID = userID;
    this.quantity = quantity;
    this.id = id;
  }

  static add(productId, userID, quantity) {
    const cartItem = new cartItemsModel(productId, userID, quantity);
    cartItem.id = cartItems.length + 1;
    cartItems.push(cartItem);
    return cartItem;
  }
}

var cartItems = [new cartItemsModel(1, 2, 1, 1)];
