import { useState, useEffect } from "react";
import { useFilter } from "../FilterContext";
const Filter = ({ isVisible, filterType }) => {
  const {
    isCleared,
    setIsCleared,
    setCheckedFilters,
    CUISINE_FILTERS,
    DIET_FILTERS,
    INTOLERANCE_FILTERS,
    MEAL_TYPE_FILTERS,
  } = useFilter();
  const [currFilter, setCurrFilter] = useState([]);
  const [visible, setVisible] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    switch (filterType) {
      case "cuisine":
        setCurrFilter(CUISINE_FILTERS);
        setSelectedFilters(Array(CUISINE_FILTERS.length).fill(false));
        break;
      case "diet":
        setCurrFilter(DIET_FILTERS);
        setSelectedFilters(Array(DIET_FILTERS.length).fill(false));
        break;
      case "intolerance":
        setCurrFilter(INTOLERANCE_FILTERS);
        setSelectedFilters(Array(INTOLERANCE_FILTERS.length).fill(false));
        break;
      case "meal":
        setCurrFilter(MEAL_TYPE_FILTERS);
        setSelectedFilters(Array(MEAL_TYPE_FILTERS.length).fill(false));
        break;
      default:
        break;
    }
    setVisible(isVisible);
    setIsCleared(false);
  }, [filterType, isVisible, isCleared]);

  const handleCheckboxChange = (event) => {
    const filterIndex = event.target.id;
    const isChecked = event.target.checked;
    setSelectedFilters((prevFilters) => {
      if (!Array.isArray(prevFilters)) {
        console.error("prevFilters is not an array:", prevFilters);
        return [];
      }
      const updatedFilters = [...prevFilters];
      updatedFilters[filterIndex] = isChecked;
      return updatedFilters;
    });
  };

  useEffect(() => {
    setCheckedFilters(selectedFilters, filterType);
  }, [selectedFilters]);

  return (
    visible && (
      <form id="filter-cuisines" className="filter-choices-form">
        {currFilter.map((filter, index) => (
          <div key={index} className="checkbox-container">
            <label className="filter-option">
              <input
                type="checkbox"
                id={index}
                name={filter}
                onChange={handleCheckboxChange}
                checked={selectedFilters && selectedFilters[index]}
              />
              {filter}
            </label>
          </div>
        ))}
      </form>
    )
  );
};

export default Filter;
