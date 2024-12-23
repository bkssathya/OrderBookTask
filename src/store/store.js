import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  buyOrders: [],
  sellOrders: [],
};

const orderBookSlice = createSlice({
  name: 'orderBook',
  initialState,
  reducers: {
    addOrders(state, action) {
      state.buyOrders.push(...action.payload.buyOrders);
      state.sellOrders.push(...action.payload.sellOrders);
    },
  },
});

export const { addOrders } = orderBookSlice.actions;

const store = configureStore({
  reducer: {
    orderBook: orderBookSlice.reducer,
  },
});

export default store;
