import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout, ToastProvider } from './components';
import { RouteFallback } from './components/LazyComponents';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { KenaiAuthProvider } from './contexts/KenaiAuthContext';
import { usePageTracking } from './hooks/usePageTracking';

const HomePage = lazy(() => import('./pages').then((module) => ({ default: module.HomePage })));
const BrowsePage = lazy(() => import('./pages').then((module) => ({ default: module.BrowsePage })));
const DetailPage = lazy(() => import('./pages').then((module) => ({ default: module.DetailPage })));
const PostPage = lazy(() => import('./pages').then((module) => ({ default: module.PostPage })));
const DashboardPage = lazy(() => import('./pages').then((module) => ({ default: module.DashboardPage })));
const AuthPage = lazy(() => import('./pages').then((module) => ({ default: module.AuthPage })));
const AdminPage = lazy(() => import('./pages').then((module) => ({ default: module.AdminPage })));
const SafetyPage = lazy(() => import('./pages').then((module) => ({ default: module.SafetyPage })));
const NotFoundPage = lazy(() => import('./pages').then((module) => ({ default: module.NotFoundPage })));
const KenaiAccount = lazy(() => import('./pages/auth/KenaiAccount').then((module) => ({ default: module.KenaiAccount })));
const KenaiSignIn = lazy(() => import('./pages/auth/KenaiSignIn').then((module) => ({ default: module.KenaiSignIn })));
const KenaiSignUp = lazy(() => import('./pages/auth/KenaiSignUp').then((module) => ({ default: module.KenaiSignUp })));

function AppRoutes() {
  usePageTracking();

  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/listing/:id" element={<DetailPage />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/sign-in" element={<KenaiSignIn />} />
          <Route path="/signin" element={<KenaiSignIn />} />
          <Route path="/login" element={<KenaiSignIn />} />
          <Route path="/sign-up" element={<KenaiSignUp />} />
          <Route path="/signup" element={<KenaiSignUp />} />
          <Route path="/account" element={<ProtectedRoute><KenaiAccount /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/safety" element={<SafetyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <KenaiAuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </KenaiAuthProvider>
    </ToastProvider>
  );
}
