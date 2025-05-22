import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FilterInput } from './FilterInput';
import { FilterSelect } from './FilterSelect';

import { useFilterOptions } from './useFilterOptions';

const initialFilters = {
  name: '',
  status: '',
  species: '',
  type: '',
  gender: ''
};

export function Filters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState(initialFilters);
  const { status, gender, species } = useFilterOptions();

  useEffect(() => {
    const updatedFilters = { ...initialFilters };
    for (const key of Object.keys(initialFilters)) {
      if (searchParams.has(key)) {
        updatedFilters[key] = searchParams.get(key);
      }
    }
    setFilters(updatedFilters);
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const newParams = {};
    for (const key in filters) {
      if (filters[key]) {
        newParams[key] = filters[key];
      }
    }
    newParams.page = 1;
    setSearchParams(newParams);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setSearchParams({ page: 1 });
  };

  return (
    <Container>
      <FilterSelect
        name="status"
        value={filters.status}
        onChange={handleChange}
        options={status}
        placeholder="Status"
      />
      <FilterSelect
        name="gender"
        value={filters.gender}
        onChange={handleChange}
        options={gender}
        placeholder="Gender"
      />
      <FilterSelect
        name="species"
        value={filters.species}
        onChange={handleChange}
        options={species}
        placeholder="Species"
      />
      <FilterInput
        name="name"
        value={filters.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <FilterInput
        name="type"
        value={filters.type}
        onChange={handleChange}
        placeholder="Type"
      />

      <Button variant="green" onClick={applyFilters}>
        Apply
      </Button>
      <Button variant="red" onClick={resetFilters}>
        Reset
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  width: 561px;

  @media (max-width: 530px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled.button`
  font-family: var(--font-inter);
  font-size: var(--font-m);
  background-color: transparent;
  padding: var(--padding300);
  border: 1px solid
    ${({ variant }) => (variant === 'green' ? 'var(--accent)' : 'var(--red)')};
  color: ${({ variant }) =>
    variant === 'green' ? 'var(--accent)' : 'var(--red)'};
  border-radius: var(--radius200);
  cursor: pointer;
  width: 85px;

  &:hover {
    background-color: ${({ variant }) =>
      variant === 'green' ? 'var(--accent)' : 'var(--red)'};
    color: var(--white);
  }

  @media (max-width: 930px) {
    width: 70px;
  }

  @media (max-width: 530px) {
    width: 240px;
  }
`;
