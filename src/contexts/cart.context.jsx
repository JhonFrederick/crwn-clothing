import {createContext, useState, useEffect} from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {
  },
  cartItems: [],
  addItemToCart: () => {
  },
  removeItemFromCart: () => {
  },
  clearItemFromCart: () => {
  },
  cartCount: 0,
  cartTotal: 0
});

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter(
    (cartItem) => cartItem.id !== cartItemToClear.id);
};

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartITem) => cartITem.id === productToAdd.id
  );
  if (existingCartItem) {
    return cartItems.map(
      (cartItem) => cartItem.id === productToAdd.id ?
        {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem);
  }
  return [...cartItems, {...productToAdd, quantity: 1}];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartITem) => cartITem.id === cartItemToRemove.id
  );
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(
      (cartItem) => cartItem.id !== cartItemToRemove.id);
  }
  return cartItems.map(
    (cartItem) => cartItem.id === cartItemToRemove.id ?
      {...cartItem, quantity: cartItem.quantity - 1}
      : cartItem);
};

export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };
  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear))
  };

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, carItem) => total + carItem.quantity, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCarTotal = cartItems.reduce((total, carItem) => total + carItem.quantity * carItem.price, 0);
    setCartTotal(newCarTotal);
  }, [cartItems]);


  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    cartTotal,
    removeItemFromCart,
    clearItemFromCart
  };
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
};
