import { Link } from 'react-router-dom';
import { GithubIcon, InstagramIcon, TwitterIcon } from './icons';
import { MainNav } from './MainNav';

export function Footer({ bodyClass }: { bodyClass: string }) {
  return (
    <footer className={`main-footer ${bodyClass}`}>
      <div className="footer-links">
        <nav className="links">
          <a href="mailto:chintakjoshi17@gmail.com">Email</a>
          <Link to="/blog">Blog</Link>
        </nav>
        <nav className="icons">
          <a className="icon github" href="https://github.com/chintakjoshi" title="follow my projects on GitHub">
            <GithubIcon />
          </a>
          <a className="icon codepen" href="https://twitter.com/chintak_joshi" title="view my Twitter archive">
            <TwitterIcon />
          </a>
          <a className="icon codepen" href="https://instagram.com/chintak_joshi" title="view my Instagram archive">
            <InstagramIcon />
          </a>
        </nav>
      </div>
      <MainNav bodyClass={bodyClass} />
    </footer>
  );
}
