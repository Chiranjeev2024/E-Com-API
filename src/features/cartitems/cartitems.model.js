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

  static get(userID){
    return cartItems.filter((i)=> i.userID==userID);
  }

  static delete(cartItemID, userID){
    const cartItemIndex = cartItems.findIndex((i)=>i.id == cartItemID && i.userID == userID);

    if(!cartItemIndex){
      return "Item not found"
    }
    else{
      cartItems.splice(cartItemIndex, 1);
    }
  }
}

var cartItems = [
  new cartItemsModel(1, 2, 1, 1),
  new cartItemsModel(1, 1, 2, 2)
];
