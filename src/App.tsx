import { Navigate, Route, Routes } from 'react-router-dom';
import { AboutPage } from './pages/AboutPage';
import { BlogsPage } from './pages/BlogsPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { ChatPage } from './pages/ChatPage';
import { GifsPage } from './pages/GifsPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProjectsPage } from './pages/ProjectsPage';

function App() {
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
