import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const PrivateRoute = ({ roles}) => {
  const { currentUser } = useContext(AuthContext);

  // verifie si l utilisateur est loggé et son role est authorisé
  const hasAllowedRole = currentUser && roles.includes(currentUser.role);

  // si l utilisateur n est pas loggé, il est redirigé vers la page de login, sinon affiche la page
  return hasAllowedRole? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;