import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';

export function BlogDetailPage() {
  return (
    <Layout
      title="Case Study: lynnandtonic.com 2025 refresh | Chintak Joshi"
      bodyClass="blog-detail"
      header={
        <div className="container">
          <div className="date">
            <small>13 January 2026</small>
          </div>
          <h1 id="content">Case Study: lynnandtonic.com 2025 refresh</h1>
        </div>
      }
    >
      <div className="content">
        <p>
          I had kind of a weird 2025{' '}
          <a href="https://lynnandtonicblog.com/2025/10/19/my-experience-with-mal-de-debarquement-syndrome-mdds/">
            health-wise
          </a>
          , so when portfolio refresh season rolled around I knew I wanted to keep things simple and avoid stressing
          during holiday time. So what might be fun and not <em>too</em> complicated?
        </p>
        <p>
          I usually start by thinking about responsive design and the physical act of resizing the browser. In{' '}
          <a href="/archive/2024/">2024</a>, I played around with stretching text; maybe I could expand on that and
          think about content stretching but in an undesirable way? Like when you see an image that&apos;s stretched to fit
          its container but isn&apos;t maintaining its aspect ratio and it&apos;s all wonky.
        </p>
        <p>
          This got me thinking about the olden days and that means fixed-width websites. When you resized one, nothing
          typically happened, though. If you sized bigger, you&apos;d get more blank space around the site and if you sized
          smaller, you&apos;d get overflow and a horizontal scrollbar. What could it mean for a fixed-width website to be{' '}
          <em>responsive</em>?
        </p>
        <p>
          I liked the idea of trying to resize a website to make it fill more space, but it just stretches the site
          like it&apos;s elastic. And when you stop, the content just bounces back to the size it was before. And if you
          resize it smaller, it squishes it until it&apos;s basically unreadable (until you stop, of course). Resizing is
          futile-but fun! The grain of this website is polyester.
        </p>
      </div>
      <nav className="blogs-nav">
        <div className="later" />
        <div className="back">
          <Link to="/blogs">All</Link>
        </div>
        <div className="earlier">
          <Link className="earlier" to="/blogs/blog-questions-challenge-2025">
            Blog Questions Challenge 2025
          </Link>
          <span>&rarr;</span>
        </div>
      </nav>
    </Layout>
  );
}
