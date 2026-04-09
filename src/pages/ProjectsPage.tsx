import type { MouseEvent } from 'react';
import { Layout } from '../components/Layout';
import { playGifPreview } from '../lib/gifPlayback';
import { assetUrl } from '../lib/assetUrl';

type Project = {
  name: string;
  image: string;
  sourceCodeUrl: string;
  gif?: string;
};

const projects: Project[] = [
  {
    name: 'Manuscriptly',
    image: 'assets/images/projects/manuscriptly.png',
    gif: 'assets/images/projects/manuscriptly.gif',
    sourceCodeUrl: 'https://github.com/chintakjoshi/manuscriptly',
  },
  {
    name: 'TWA',
    image: 'assets/images/projects/twa.png',
    gif: 'assets/images/projects/twa.gif',
    sourceCodeUrl: 'https://github.com/chintakjoshi/TWA-OSS',
  },
  {
    name: 'orbital-sweep',
    image: 'assets/images/projects/orbital-sweep.png',
    gif: 'assets/images/projects/orbital-sweep.gif',
    sourceCodeUrl: 'https://github.com/chintakjoshi/orbital-sweep',
  },
  {
    name: 'iSpraak',
    image: 'assets/images/projects/ispraak.png',
    gif: 'assets/images/projects/ispraak.gif',
    sourceCodeUrl: 'https://github.com/dnickol1/ispraak_open',
  },
  {
    name: 'Sync Playlist',
    image: 'assets/images/projects/syncplaylist.png',
    sourceCodeUrl: 'https://github.com/chintakjoshi/sync-playlist',
  },
  {
    name: 'RAG with Neural Retrieval',
    image: 'assets/images/projects/neuralrag.png',
    sourceCodeUrl: 'https://github.com/chintakjoshi/Custom-RAG-Pipeline-with-Neural-Retrieval',
  },
  {
    name: 'LLM Chatbot',
    image: 'assets/images/projects/llmchatbot.png',
    sourceCodeUrl: 'https://github.com/chintakjoshi/go-llm-chatbot',
  },
  {
    name: 'LLM via SMS',
    image: 'assets/images/projects/txtai.png',
    sourceCodeUrl: 'https://github.com/chintakjoshi/TxtAI',
  },
  {
    name: 'What is around me!',
    image: 'assets/images/projects/whatisaroundme.png',
    sourceCodeUrl: 'https://github.com/chintakjoshi/WhatIsAroundMe',
  },
  {
    name: 'Collaborative Draw Board',
    image: 'assets/images/projects/collab-drawing.png',
    sourceCodeUrl: 'https://github.com/chintakjoshi/collaborative-drawing-board',
  },
  {
    name: 'authSDK',
    image: 'assets/images/projects/authsdk.png',
    sourceCodeUrl: 'https://github.com/chintakjoshi/authSDK',
  },
];

export function ProjectsPage() {
  const handlePreview = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const img = event.currentTarget.querySelector('img');
    const { gif } = event.currentTarget.dataset;

    if (img instanceof HTMLImageElement && gif) {
      void playGifPreview(img, assetUrl(gif));
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
          These are some of my personal projects. For more, follow and check out my{' '}
          <a href="https://github.com/chintakjoshi">github</a>.
        </p>
        <noscript>
          <p>
            <em>Enable JavaScript to preview animated gifs</em>
          </p>
        </noscript>
        {projects.map((project) => (
          <div className="project-card" key={project.name}>
            {project.gif ? (
              <a className="gif-preview" href="#" onClick={handlePreview} data-gif={project.gif}>
                <img
                  src={assetUrl(project.image)}
                  width={400}
                  height={225}
                  alt={`${project.name} project preview`}
                  loading="lazy"
                />
              </a>
            ) : (
              <div className="gif-preview">
                <img
                  src={assetUrl(project.image)}
                  width={400}
                  height={225}
                  alt={`${project.name} project preview`}
                  loading="lazy"
                />
              </div>
            )}
            <div className="links">
              <small>{project.name}</small>
              <small className="actions">
                {project.gif ? (
                  <>
                    <em>click to preview</em> |{' '}
                  </>
                ) : null}
                <a href={project.sourceCodeUrl} target="_blank" rel="noopener noreferrer">
                  Source code
                </a>
              </small>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

