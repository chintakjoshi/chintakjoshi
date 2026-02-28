import { useEffect, useRef } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AboutPage } from './pages/AboutPage';
import { BlogsPage } from './pages/BlogsPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { ChatPage } from './pages/ChatPage';
import { GifsPage } from './pages/GifsPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProjectsPage } from './pages/ProjectsPage';

function useGoatCounterRouteTracking() {
  const location = useLocation();
  const hasMounted = useRef(false);

  useEffect(() => {
    // The script handles the initial page load; this tracks only SPA navigations.
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    const path = `${location.pathname}${location.search}${location.hash}`;
    window.goatcounter?.count({
      path,
      title: document.title,
    });
  }, [location.pathname, location.search, location.hash]);
}

function App() {
  useGoatCounterRouteTracking();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/Projects" element={<ProjectsPage />} />
      <Route path="/blogs" element={<BlogsPage />} />
      <Route path="/blog" element={<Navigate to="/blogs" replace />} />
      <Route path="/blogs/case-study-2025-refresh" element={<BlogDetailPage />} />
      <Route path="/blogs/blog-questions-challenge-2025" element={<BlogDetailPage />} />
      <Route path="/gifs" element={<GifsPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
