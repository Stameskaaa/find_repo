import { createSlice } from '@reduxjs/toolkit';
import { RowData } from '../../types/types';

interface SelectedRowState {
  selectedRow: RowData | null;
}

const initialState: SelectedRowState = {
  selectedRow: null,
};

const selectedRowSlice = createSlice({
  name: 'selectedRow',
  initialState,
  reducers: {
    setSelectedRow: (state, action) => {
      state.selectedRow = action.payload;
    }, //Изменение выбранной ветки
  },
});

export const { setSelectedRow } = selectedRowSlice.actions;

export default selectedRowSlice.reducer;
