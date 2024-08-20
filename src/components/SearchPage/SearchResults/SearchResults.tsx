import { DataGrid, GridColDef } from '@mui/x-data-grid';
import styles from './search-results.module.scss';
import { GridEventListener } from '@mui/x-data-grid';
import { RowData } from '../../../types/types';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hooks';
import { setSelectedRow } from '../../../redux/slices/selectedRowSlice';
import { useEffect, useState } from 'react';
import { setPaginationModel } from '../../../redux/slices/searchResultsSlice';
const columns: GridColDef[] = [
  { field: 'name', headerName: 'Название', width: 182.4 },
  { field: 'primaryLanguage', headerName: 'Язык', width: 182.4 },
  {
    field: 'forkCount',
    headerName: 'Число форков',
    type: 'number',
    width: 182.4,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'stargazerCount',
    headerName: 'Число звезд',
    type: 'number',
    width: 180,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'updatedAt',
    headerName: 'Дата обновления',
    type: 'date',
    width: 170,
    valueGetter: (date) => new Date(date),
  },
];

export const SearchResults = () => {
  const dispatch = useAppDispatch();
  const { searchResults, loading } = useAppSelector((state) => state.searchResultsSlice);
  const [rows, setRows] = useState<RowData[]>([]);
  const { page, pageSize } = useAppSelector((state) => state.searchResultsSlice);

  useEffect(() => {
    const rows =
      searchResults.results.length > 0
        ? searchResults.results.map((repo, index) => ({
            id: index + 1,
            name: repo.name,
            primaryLanguage: repo.primaryLanguage ? repo.primaryLanguage.name : 'N/A',
            forkCount: repo.forkCount,
            stargazerCount: repo.stargazerCount,
            updatedAt: repo.updatedAt,
            licenseInfo: repo.licenseInfo,
            topics: repo.topics,
          }))
        : [];

    setRows(rows);
  }, [searchResults]); // Изменение массива строк (убираю лишние данные, исправляю потенциальные ошибки)

  const handleEvent: GridEventListener<'rowClick'> = (params) => {
    dispatch(setSelectedRow(params.row as RowData));
  }; // Установка активной строки при клике на таблицу

  const handlePageDataChange = (newPage: number, newPageSize: number) => {
    dispatch(
      setPaginationModel({
        type: 'all',
        pageSize: newPageSize,
        page: newPage,
      }),
    );
  }; // Установка в хранилище текущей страницы и размера страницы

  return (
    <div className={styles.search_results}>
      <p>Результаты поиска</p>
      <div className={styles.grid_container}>
        <DataGrid
          onRowClick={handleEvent}
          disableColumnResize={true}
          rows={rows}
          loading={loading}
          columns={columns}
          classes={{
            root: styles.custom_root,
            columnHeader: styles.custom_header,
            cell: styles.custom_cell,
            row: styles.custom_row,
            footerContainer: styles.footer_container,
          }}
          paginationMode="server"
          rowCount={Math.ceil(searchResults.totalCount / pageSize)}
          initialState={{
            pagination: {
              paginationModel: {
                page,
                pageSize,
              },
            },
          }}
          onPaginationModelChange={({ page, pageSize }) => {
            handlePageDataChange(page, pageSize);
          }}
          pagination
          pageSizeOptions={[5, 10]}
          checkboxSelection={false}
        />
      </div>
    </div>
  );
};
