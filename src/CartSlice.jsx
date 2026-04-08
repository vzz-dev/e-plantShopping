import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload; // Extraemos los datos del producto desde el payload enviado por dispatch

      // Buscamos si el producto ya existe en el carrito
      const existingItem = state.items.find((item) => item.name === name);

      if (existingItem) {
        // Si el producto ya existe, aumentamos la cantidad en 1
        existingItem.quantity++;
      } else {
        // Si NO existe, lo agregamos al carrito con cantidad inicial de 1
        state.items.push({
          name,
          image,
          cost,
          quantity: 1,
        });
      }
    },
    removeItem: (state, action) => {
      // Extraemos el nombre del producto desde el payload
      const { name } = action.payload;

      // Filtramos los items del carrito
      // Nos quedamos con todos MENOS el que coincide con el nombre
      state.items = state.items.filter((item) => item.name !== name);
    },
    updateQuantity: (state, action) => {
      // Extraemos el nombre del producto y la nueva cantidad desde el payload
      const { name, quantity } = action.payload;

      // Buscamos el producto en el carrito que coincida con el nombre
      const itemToUpdate = state.items.find((item) => item.name === name);

      if (itemToUpdate) {
        // si encontramos el producto, actualizamos su cantidad directamente
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
