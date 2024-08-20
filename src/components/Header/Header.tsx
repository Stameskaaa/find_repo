import { useEffect, useState } from 'react';
import styles from './header.module.scss';
import { Button } from './HeaderComponents/Button/Button';
import { Input } from './HeaderComponents/Input/Input';
import { searchRepositories } from '../../api/api';
import { ResponseSearchRepo } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import {
  setLoading,
  setSearchResults,
  setFirstSearch,
} from '../../redux/slices/searchResultsSlice';

export const Header = () => {
  const [value, setValue] = useState<string>('');
  let { page, pageSize, firstSearch } = useAppSelector((state) => state.searchResultsSlice);

  const dispatch = useAppDispatch();

  const onSearchClick = () => {
    !firstSearch && dispatch(setFirstSearch());
    fetchRepo(value, page, pageSize);
  }; //Если поиск производится впервые то поставить флаг на отображение страницы приветствия
  //Поиск репозиториев при клике

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchRepo(value, page, pageSize);
    }, 200);

    return () => clearTimeout(timer);
  }, [page, pageSize]);
  //При изменении определенных данных производить новый поиск с задержкой
  //во избежании большого количества запросов

  const fetchRepo = async (value: string, page: number, perPage: number) => {
    if (value) {
      dispatch(setLoading(true));
      const response: ResponseSearchRepo = await searchRepositories(value, ++page, perPage);

      dispatch(setSearchResults(response));
      dispatch(setLoading(false));
    }
  }; //Функция поиска репозиториев с лоадингом

  return (
    <div className={styles.container}>
      <Input setValue={setValue} value={value} />
      <Button onClick={() => onSearchClick()} />
    </div>
  );
};
