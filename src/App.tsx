import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout, ToastProvider } from './components';
import { AdminPage, AuthPage, BrowsePage, DashboardPage, DetailPage, HomePage, NotFoundPage, PostPage, SafetyPage } from './pages';

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/listing/:id" element={<DetailPage />} />
            <Route path="/post" element={<PostPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/safety" element={<SafetyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}
