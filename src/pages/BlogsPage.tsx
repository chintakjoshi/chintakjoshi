import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';

export function BlogsPage() {
  return (
    <Layout
      title="Blogs | Chintak Joshi"
      bodyClass="blogs"
      header={
        <div className="container">
          <p className="chapter">IV</p>
          <h1 id="content">Blogs</h1>
        </div>
      }
    >
      <section className="container">
        <div className="blogs-list">
          <h2 className="dateline">2026</h2>
          <div className="blog">
            <Link className="blog-title" to="/blogs/case-study-2025-refresh">
              <span>Case Study: lynnandtonic.com 2025 refresh</span>
            </Link>
          </div>

          <h2 className="dateline">2025</h2>
          <div className="blog">
            <Link className="blog-title" to="/blogs/blog-questions-challenge-2025">
              <span>Blog Questions Challenge 2025</span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
