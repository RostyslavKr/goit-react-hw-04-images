import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import {
  SearchbarWrapper,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLable,
  SearchFormInput,
} from './Searchbar.styled';

export default function Searchbar({ onSearch }) {
  const [value, setValue] = useState('');

  const handleChange = e => {
    setValue(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();

    if (value.trim() === '') {
      toast.warn('Enter something');
      return;
    }
    onSearch(value);
    setValue('');
  };

  return (
    <SearchbarWrapper>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLable>Search</SearchFormButtonLable>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          placeholder="Search images and photos"
          value={value}
          onChange={handleChange}
        />
      </SearchForm>
    </SearchbarWrapper>
  );
}
Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
