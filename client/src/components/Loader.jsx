import React, { useEffect } from 'react';
import ora from 'ora';

export const Loader = () => {
  useEffect(() => {
    const spinner = ora('Loading rainbows').start();

    spinner.color = 'yellow';

    // Simuler une attente de 1 seconde
    setTimeout(() => {
      spinner.stop();
    }, 1000);

    return () => {
      spinner.stop();
    };
  }, []);

  return null; // Le composant Loader ne rend rien, il est utilisé uniquement pour l'affichage de l'animation de chargement
};