import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export const CarFilter = ({ onFilterChange }) => {
  const defaultKmRange = [0, 300000];
  const defaultPriceRange = [0, 50000];
  const defaultYearRange = [2000, 2023];

  const [kmRange, setKmRange] = useState(defaultKmRange);
  const [priceRange, setPriceRange] = useState(defaultPriceRange);
  const [yearRange, setYearRange] = useState(defaultYearRange);

  const handleApplyFilter = () => {
    const filters = {
      km: kmRange,
      price: priceRange,
      year: yearRange,
    };
    onFilterChange(filters);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Filtrer par :</h3>

      <div className="mb-4">
        <p>Kilomètres</p>
        <Slider
          range
          min={0}
          max={300000}
          value={kmRange}
          onChange={setKmRange}
        />
        <p>
          {kmRange[0]} km - {kmRange[1]} km
        </p>
      </div>

      <div className="mb-4">
        <p>Prix (en euros)</p>
        <Slider
          range
          min={0}
          max={50000}
          value={priceRange}
          onChange={setPriceRange}
        />
        <p>
          {priceRange[0]} € - {priceRange[1]} €
        </p>
      </div>

      <div className="mb-4">
        <p>Année</p>
        <Slider
          range
          min={2000}
          max={2023}
          value={yearRange}
          onChange={setYearRange}
        />
        <p>
          {yearRange[0]} - {yearRange[1]}
        </p>
      </div>

      <button
        className="bg-blue-500 text-white rounded p-2"
        onClick={handleApplyFilter}
      >
        Appliquer le filtre
      </button>
    </div>
  );
};
