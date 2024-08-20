import { useAppSelector } from '../../redux/hooks/hooks';
import { GreetingPage } from './GreetingPage/GreetingPage';
import styles from './search-page.module.scss';
import { SearchResults } from './SearchResults/SearchResults';
import { SelectedRepo } from './SelectedRepo/SelectedRepo';

export const SearchPage = () => {
  const { firstSearch } = useAppSelector((state) => state.searchResultsSlice);

  return (
    <div className={styles.container}>
      {!firstSearch ? <GreetingPage /> : <SearchResults />}
      <SelectedRepo />
    </div>
  );
};
