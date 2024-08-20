import { ResponseSearchRepo } from '../../types/types';
import { createSlice } from '@reduxjs/toolkit';
interface SearchResultsState {
  searchResults: ResponseSearchRepo;
  page: number;
  loading: boolean;
  pageSize: number;
  firstSearch: boolean;
}

const initialState: SearchResultsState = {
  searchResults: {
    results: [],
    totalPages: 0,
    currentPage: 0,
    hasNextPage: false,
    perPage: 30,
    totalCount: 0,
  },
  page: 1,
  loading: false,
  pageSize: 5,
  firstSearch: false,
};

const searchResultsSlice = createSlice({
  name: 'searchResults',
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    }, //Изменение результатов поиска
    setLoading: (state, action) => {
      state.loading = action.payload;
    }, //Установка лоадера
    setPaginationModel: (state, action) => {
      switch (action.payload.type) {
        case 'page':
          state.page = action.payload.page;
          break;
        case 'pageSize':
          state.pageSize = action.payload.pageSize;
          break;
        case 'all':
          state.page = action.payload.page;
          state.pageSize = action.payload.pageSize;
          break;
      }
    }, //Изменение страницы и ее размера
    setFirstSearch: (state) => {
      state.firstSearch = true;
    }, //Флаг того вперые ли производится поиск
  },
});

export const { setSearchResults, setLoading, setPaginationModel, setFirstSearch } =
  searchResultsSlice.actions;

export default searchResultsSlice.reducer;
