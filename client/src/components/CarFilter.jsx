import React, { useState, useCallback } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export const CarFilter = ({ onFilterChange }) => {
  // valeurs par défaut
  const defaultKmRange = [0, 300000];
  const defaultPriceRange = [0, 50000];
  const defaultYearRange = [2000, 2023];
  const defaultGearbox = 'Manuelle';
  const defaultFuel = 'Essence';

  // déclaration des states
  const [kmRange, setKmRange] = useState(defaultKmRange);
  const [priceRange, setPriceRange] = useState(defaultPriceRange);
  const [yearRange, setYearRange] = useState(defaultYearRange);
  const [selectedGearbox, setSelectedGearbox] = useState(defaultGearbox);
  const [selectedFuel, setSelectedFuel] = useState(defaultFuel);

  // application du filtre
  const handleApplyFilter = useCallback(() => {
    const filters = {
      km: kmRange,
      price: priceRange,
      year: yearRange,
      gearbox: selectedGearbox,
      fuel: selectedFuel,
    };
    onFilterChange(filters);
  }, [kmRange, priceRange, yearRange, selectedGearbox, selectedFuel, onFilterChange]);

  // réinitialisation des filtres
  const handleResetFilter = () => {
    setKmRange(defaultKmRange);
    setPriceRange(defaultPriceRange);
    setYearRange(defaultYearRange);
    setSelectedGearbox(defaultGearbox);
    setSelectedFuel(defaultFuel);

    //raffraichissement de la liste des voitures
    const defaultFilters = {
      km: defaultKmRange,
      price: defaultPriceRange,
      year: defaultYearRange,
      gearbox: defaultGearbox,
      fuel: defaultFuel,
    };
    onFilterChange(defaultFilters);
  };

  return (
    <div className="p-5 shadow w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="mb-4">
          <p>Kilomètres</p>
          <Slider
            className="max-w-sm"
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
            min={2000}
            max={2023}
            value={yearRange}
            onChange={setYearRange}
          />
          <p>
            {yearRange[0]} - {yearRange[1]}
          </p>
        </div>
      </div>
      <div className="mb-2 mt-2 border-b border-gray-300"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="mb-4">
          <p>Boîte de vitesse</p>
          <div>
            <label>
              <input
                className="mr-2"
                type="radio"
                value="Manuelle"
                checked={selectedGearbox === 'Manuelle'}
                onChange={() => setSelectedGearbox('Manuelle')}
              />
              Manuelle
            </label>
            <label>
              <input
                className="mr-2 ml-2"
                type="radio"
                value="Automatique"
                checked={selectedGearbox === 'Automatique'}
                onChange={() => setSelectedGearbox('Automatique')}
              />
              Automatique
            </label>
          </div>
        </div>

        <div className="mb-4">
          <p>Carburant</p>
          <div>
            <label>
              <input
                className="mr-2"
                type="radio"
                value="Essence"
                checked={selectedFuel === 'Essence'}
                onChange={() => setSelectedFuel('Essence')}
              />
              Essence
            </label>
            <label>
              <input
                className="mr-2 ml-2"
                type="radio"
                value="Diesel"
                checked={selectedFuel === 'Diesel'}
                onChange={() => setSelectedFuel('Diesel')}
              />
              Diesel
            </label>
            <label>
              <input
                className="mr-2 ml-2"
                type="radio"
                value="Hybride"
                checked={selectedFuel === 'Hybride'}
                onChange={() => setSelectedFuel('Hybride')}
              />
              Hybride
            </label>
            <label>
              <input
                className="mr-2 ml-2"
                type="radio"
                value="Electrique"
                checked={selectedFuel === 'Electrique'}
                onChange={() => setSelectedFuel('Electrique')}
              />
              Électrique
            </label>
          </div>
        </div>
      </div>
      <div className="mb-4  border-b border-gray-300"></div>
      <button
        className="bg-gray-300 text-gray-700 rounded p-2 hover:bg-gray-400 ml-4"
        onClick={handleApplyFilter}
      >
        Appliquer le filtre
      </button>
      <button
        className="bg-gray-300 text-gray-700 rounded p-2 hover:bg-gray-400 ml-4"
        onClick={handleResetFilter}
      >
        Réinitialiser
      </button>
    </div>
  );
};