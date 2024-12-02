import { useSelector, useDispatch } from 'react-redux';
import {
  changeFilter,
  selectFilterNameContact,
} from '../../redux/filtersSlice';
import css from './SearchBox.module.css';

export const SearchBox = () => {
  const dispatch = useDispatch();
  const selectNameFilter = useSelector(selectFilterNameContact);

  const handleFilterChange = value => {
    dispatch(changeFilter(value));
  };

  return (
    <div className={css.searchbox}>
      <p className={css.label}>Find contacts by name</p>
      <input
        className={css.input}
        type="text"
        value={selectNameFilter}
        onChange={e => handleFilterChange(e.target.value)}
      />
    </div>
  );
};
