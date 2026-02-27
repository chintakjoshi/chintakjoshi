import type { MouseEvent } from 'react';
import { Layout } from '../components/Layout';
import { playGifPreview } from '../lib/gifPlayback';
import { assetUrl } from '../lib/assetUrl';

export function ProjectsPage() {
  const handlePreview = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const img = event.currentTarget.querySelector('img');

    if (img instanceof HTMLImageElement) {
      void playGifPreview(img, assetUrl('assets/images/projects/manuscriptly.gif'));
    }
  };

  return (
    <Layout
      title="Projects | Chintak Joshi"
      bodyClass="Projects"
      header={
        <div className="container">
          <p className="chapter">III</p>
          <h1 id="content">Projects</h1>
        </div>
      }
    >
      <div className="content">
        <p>
          These are some of my personal projects. For more follow and checkout my{' '}
          <a href="https://github.com/chintakjoshi">github</a>.
        </p>
        <noscript>
          <p>
            <em>Enable JavaScript to preview animated gifs</em>
          </p>
        </noscript>
        <div className="project-card">
          <a className="gif-preview" href="#" onClick={handlePreview}>
            <img
              src={assetUrl('assets/images/projects/manuscriptly.png')}
              width={400}
              height={225}
              alt="Manuscriptly project preview gif"
              loading="lazy"
            />
          </a>
          <div className="links">
            <small>Manuscriptly</small>
            <small className="actions">
              <em>click to preview project</em> |{' '}
              <a href="https://github.com/chintakjoshi/manuscriptly" target="_blank" rel="noopener noreferrer">
                Source code
              </a>
            </small>
          </div>
        </div>
      </div>
    </Layout>
  );
}

