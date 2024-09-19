import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // Initialize items as an empty array
    },
    reducers: {
        addItem: (state, action) => {
            const { name, image, cost, costAsNumber } = action.payload;
            const existingItem = state.items.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({ name, image, cost, costAsNumber, quantity: 1 });
            } console.log(existingItem, " Added to cart");
        },

        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.name !== action.payload);
        },

        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload;
            const itemToUpdate = state.items.find(item => item.name === name);
            console.log('test', quantity, name);
            if (itemToUpdate) {
                itemToUpdate.quantity = quantity;
            }
        },
    },
});

export const { addItem, removeItem, updateQuantity, updateCost } = CartSlice.actions;

export default CartSlice.reducer;
  