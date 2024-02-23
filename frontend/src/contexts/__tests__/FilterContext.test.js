import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FilterProvider, useFilter } from '../FilterContext'; // Replace with the correct path

// Mock children component using useFilter
const MockChildComponent = () => {
  const { checkedFilter, setCheckedFilters, resetFilters, setIsCleared, isCleared } = useFilter();

  const handleButtonClick = () => {
    setIsCleared(!isCleared);
  };

  return (
    <div>
      <button data-testid="button-toggle-isCleared" onClick={handleButtonClick}>Toggle IsCleared</button>
      <div data-testid="cuisine">{JSON.stringify(checkedFilter.cuisine)}</div>
      <div data-testid="diet">{JSON.stringify(checkedFilter.diet)}</div>
      <div data-testid="meal">{JSON.stringify(checkedFilter.meal)}</div>
      <div data-testid="intolerance">{JSON.stringify(checkedFilter.intolerance)}</div>
      <button data-testid="button-set-cuisine" onClick={() => setCheckedFilters([true, false, true], 'cuisine')}>Set Cuisine Filters</button>
      <button data-testid="button-set-diet" onClick={() => setCheckedFilters([false, true, false], 'diet')}>Set Diet Filters</button>
      <button data-testid="button-set-meal" onClick={() => setCheckedFilters([true, false, false], 'meal')}>Set Meal Filters</button>
      <button data-testid="button-set-intolerance" onClick={() => setCheckedFilters([false, true], 'intolerance')}>Set Intolerance Filters</button>
      <button data-testid="button-reset-filters" onClick={resetFilters}>Reset Filters</button>
    </div>
  );
};

test('FilterProvider renders children and provides context values', () => {
  const { getByTestId } = render(
    <FilterProvider>
      <MockChildComponent />
    </FilterProvider>
  );

  // Test whether context values are rendered
  fireEvent.click(getByTestId('cuisine'));
  fireEvent.click(getByTestId('diet'));
  fireEvent.click(getByTestId('meal'));
  fireEvent.click(getByTestId('intolerance'));

  // Test setting filters
  fireEvent.click(getByTestId('button-set-cuisine'));
  fireEvent.click(getByTestId('button-set-diet'));
  fireEvent.click(getByTestId('button-set-meal'));
  fireEvent.click(getByTestId('button-set-intolerance'));

  // Test resetting filters
  fireEvent.click(getByTestId('button-reset-filters'));

  // Test toggling isCleared
  fireEvent.click(getByTestId('button-toggle-isCleared'));
});