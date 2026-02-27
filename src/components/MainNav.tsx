import { Link } from 'react-router-dom';
import { ModeToggle } from './ModeToggle';

export function MainNav({ bodyClass }: { bodyClass: string }) {
  return (
    <>
      <nav id="nav" className={`main-nav ${bodyClass}`}>
        <ol>
          <li>
            <Link to="/chat">Chat with me</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/Projects">Projects</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/gifs">Gifs</Link>
          </li>
        </ol>
      </nav>
      <small className="center">
        <Link to="/">v. XIX</Link>
      </small>
      <ModeToggle />
    </>
  );
}
