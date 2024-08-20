import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
} from 'react-redux';
import { RootState, AppDispatch } from './../store/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useAppDispatch = () => useReduxDispatch<AppDispatch>();
