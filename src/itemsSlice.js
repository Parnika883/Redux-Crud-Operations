import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    editItem: (state, action) => {
      const { id, name, brand } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.name = name;
        existingItem.brand = brand;
      }
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { addItem, editItem, deleteItem, setItems } = itemsSlice.actions;
export default itemsSlice.reducer;