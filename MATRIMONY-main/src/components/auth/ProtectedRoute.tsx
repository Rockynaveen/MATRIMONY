import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireBasicComplete?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireBasicComplete = true
}) => {
  const { isAuthenticated, profileStatus } = useApp();
  const location = useLocation();

  if (!isAuthenticated) {
    const targetPath = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/register?redirect=${targetPath}`} replace />;
  }

  // Google onboarding check: If basic info is incomplete, redirect to /profile/complete
  if (requireBasicComplete && !profileStatus.is_basic_complete && location.pathname !== '/profile/complete') {
    return <Navigate to="/profile/complete" replace />;
  }

  return <>{children}</>;
};
