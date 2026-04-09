import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0; // Variable para acumular el total

    // Recorremos cada item del carrito
    cart.forEach((item) => {
      //Convertimos el costo de string "$15" a numero 15
      const price = parseFloat(item.cost.substring(1));

      // Multiplicamos precio por cantidad
      const itemTotal = price * item.quantity;

      // Sumamos al total acumulado
      total += itemTotal;
    });
    return total; // Retornamos el total final
  };

  const handleContinueShopping = (e) => {
    e.preventDefault(); // Evita comportamiento por defecto del navegador

    // llama a la funcion que viene del componente padre (ProductList)
    onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
    alert("Functionality to be added for future reference");
  };

  const handleIncrement = (item) => {
    // Despachamos la accion con la nueva cantidad
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      }),
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      // Si la cantidad es mayor a 1, solo restamos 1
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        }),
      );
    } else {
      // Si la cantidad es 1, eliminar el producto del carrito
      dispatch(removeItem(item));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    // Convertimos el costo de "$15" a numero 15
    const price = parseFloat(item.cost.substring(1));

    // Multi plicamos por la cantidad del producto
    const total = price * item.quantity;

    return total; // Retornamos el subtotal del producto
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ marginTop: "20px", color: "black" }}
        className="total_cart_amount"
      ></div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={handleCheckoutShopping}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
