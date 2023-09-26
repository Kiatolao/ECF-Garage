import React, { useContext } from 'react';
import { useRoutes, Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const PrivateRoute = ({ roles, ...props }) => {
  const { currentUser } = useContext(AuthContext);

  console.log('currentUser:', currentUser);
  console.log('allowed roles:', roles);

  // Check if the user is logged in and has the allowed role
  const hasAllowedRole = currentUser && roles.includes(currentUser.role);

  console.log('hasAllowedRole:', hasAllowedRole);

  const routing = useRoutes([
    hasAllowedRole ? { ...props, element: <Outlet /> } : { path: '*', element: <Navigate to="/login" /> }
  ]);

  return routing;
};

export default PrivateRoute;