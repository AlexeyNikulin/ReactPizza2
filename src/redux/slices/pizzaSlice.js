import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    pizzas: [],
    status: 'loading', // loading | success | error
};

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkApi) => {
    const { categoryId, sortProperty, pageCount, searchValue } = params;
    const { data } = await axios.get('https://6648c5a24032b1331bec60ed.mockapi.io/items', {
        params: {
            category: categoryId ? categoryId : null,
            sortBy: sortProperty ? sortProperty : null,
            order: 'asc',
            search: searchValue ? searchValue : '',
            limit: 4,
            page: pageCount,
        },
    });

    return data;
});

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setPizzas(state, action) {
            state.pizzas = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = 'loading';
                state.pizzas = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.pizzas = action.payload;
                state.status = 'success';
            })
            .addCase(fetchPizzas.rejected, (state, action) => {
                state.status = 'error';
                state.pizzas = [];
            });
    },
});

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
