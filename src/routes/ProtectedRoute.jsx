import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { InitializationScreen } from '../components/common/InitializationScreen';

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <InitializationScreen />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if onboarding completed
  const onboardingCompleted = localStorage.getItem(`onboarding_completed_${user.uid}`) === 'true';

  if (!onboardingCompleted && location.pathname !== '/app/onboarding') {
    return <Navigate to="/app/onboarding" replace />;
  }

  if (onboardingCompleted && location.pathname === '/app/onboarding') {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
};

