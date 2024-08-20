import { useAppSelector } from '../../../redux/hooks/hooks';
import { EmptySelectedRepo } from './emptySelectedRepo/EmptySelectedRepo';
import styles from './selected-repo.module.scss';
import { TagComponent } from './TagComponents/TagComponent';
import { BlueTagComponent } from './TagComponents/BlueTagComponent';
import StarIcon from '@mui/icons-material/Star';

export const SelectedRepo = () => {
  const selectedRow = useAppSelector((state) => state.selectedRowSlice.selectedRow);

  return (
    <div className={styles.container}>
      {selectedRow ? (
        <div className={styles.repository_info}>
          <p>{selectedRow.name}</p>
          <div className={styles.main_info}>
            {' '}
            <BlueTagComponent text={selectedRow.primaryLanguage} />{' '}
            <span className={styles.star_container}>
              <StarIcon
                sx={{
                  color: '#FFB400',
                  width: '20px',
                  height: '19px',
                }}
              />{' '}
              <span>{selectedRow.stargazerCount}</span>
            </span>
          </div>
          {selectedRow.topics.length > 0 && (
            <div className={styles.tag_container}>
              {selectedRow.topics.map((value, index) => (
                <TagComponent key={index} text={value} />
              ))}
            </div>
          )}
          {selectedRow.licenseInfo && (
            <span className={styles.licence}>{selectedRow.licenseInfo.name}</span>
          )}
        </div>
      ) : (
        <EmptySelectedRepo />
      )}
    </div>
  );
};
