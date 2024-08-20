import { configureStore } from '@reduxjs/toolkit';
import selectedRow from '../slices/selectedRowSlice';
import searchResults from '../slices/searchResultsSlice';

const store = configureStore({
  reducer: { selectedRowSlice: selectedRow, searchResultsSlice: searchResults },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
