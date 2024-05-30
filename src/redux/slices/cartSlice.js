import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    totalPrice: 0,
    items: [],
    countItems: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find((item) => item.id === action.payload.id);

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }

            state.totalPrice += action.payload.price;
            state.countItems += 1;
        },
        minusItem(state, action) {
            const findItem = state.items.find((item) => item.id === action.payload.id);

            if (findItem && findItem.count !== 1) {
                findItem.count--;
                state.totalPrice -= findItem.price;
                state.countItems -= 1;
            }
        },
        removeItem(state, action) {
            const findItem = state.items.find((item) => item.id === action.payload.id);

            state.totalPrice -= findItem.price * findItem.count;
            state.countItems -= findItem.count;

            state.items = state.items.filter((item) => item.id !== action.payload.id);
        },
        clearItem(state) {
            state.items = [];
            state.totalPrice = 0;
            state.countItems = 0;
        },
    },
});

export const selectCart = (state) => state.cart;
export const selectCartItemById = (id) => (state) =>
    state.cart.items.find((item) => item.id === id);

export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
