import React, { useState, useCallback } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export const CarFilter = ({ onFilterChange }) => {
  // valeurs par défaut
  const defaultKmRange = [0, 200000];
  const defaultPriceRange = [0, 50000];
  const defaultYearRange = [1955, 2023];

  // déclaration des states
  const [kmRange, setKmRange] = useState(defaultKmRange);
  const [priceRange, setPriceRange] = useState(defaultPriceRange);
  const [yearRange, setYearRange] = useState(defaultYearRange);

  // application du filtre
  const handleApplyFilter = useCallback(() => {
    const filters = {
      km: kmRange,
      price: priceRange,
      year: yearRange,
    };
    onFilterChange(filters);
  }, [kmRange, priceRange, yearRange, onFilterChange]);

  // réinitialisation des filtres
  const handleResetFilter = () => {
    setKmRange(defaultKmRange);
    setPriceRange(defaultPriceRange);
    setYearRange(defaultYearRange);

    //raffraichissement de la liste des voitures
    const defaultFilters = {
      km: defaultKmRange,
      price: defaultPriceRange,
      year: defaultYearRange,

    };
    onFilterChange(defaultFilters);
  };

  return (
    <div className="p-5 w-full border border-neutral-300 shadow rounded-md bg-white overflow-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="mb-4">
          <p>Kilomètres</p>
          <Slider
            className="max-w-sm"
            range
            min={0}
            max={200000}
            value={kmRange}
            onChange={setKmRange}/>
          <p>
            {kmRange[0]} km - {kmRange[1]} km
          </p>
        </div>

        <div className="mb-4">
          <p>Prix (en euros)</p>
          <Slider
            className="max-w-sm"
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
            className="max-w-sm"
            range
            min={1955}
            max={2023}
            value={yearRange}
            onChange={setYearRange}
          />
          <p>
            {yearRange[0]} - {yearRange[1]}
          </p>
        </div>
      </div>
      <button
        className="bg-gray-300  rounded p-2 hover:bg-gray-400 ml-4 shadow border-neutral-400 border"
        onClick={handleApplyFilter}
      >
        Appliquer le filtre
      </button>
      <button
        className="bg-gray-300  rounded p-2 hover:bg-gray-400 ml-4 shadow border-neutral-400 border"
        onClick={handleResetFilter}
      >
        Réinitialiser
      </button>
    </div>
  );
};