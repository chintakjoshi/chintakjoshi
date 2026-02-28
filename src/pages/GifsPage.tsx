import type { MouseEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Layout } from '../components/Layout';
import { playGifPreview } from '../lib/gifPlayback';
import { assetUrl } from '../lib/assetUrl';

type GifItem = {
  filename: string;
  width: number;
  height: number;
  alt: string;
};

const GIF_BATCH_SIZE = 8;

const GIF_ITEMS: GifItem[] = [
  { filename: 'fob-css', width: 400, height: 225, alt: 'woman throws an apple and hits a fleeing boy in the head, caption says "CSS"' },
  { filename: 'css-soda', width: 224, height: 384, alt: 'a soda bottle is dispensed from the top row of a vending machine and dislodges two stuck other bottles on the way down, caption says "CSS"' },
  { filename: 'css-blocks', width: 400, height: 300, alt: 'a 3x3 stack of blocks on wheels rolls down a little obstacle course where a sequence of cutout tunnels knock bricks away until just one remains, caption says "CSS"' },
  { filename: 'css-jump', width: 400, height: 206, alt: 'a man flips off a pier into the sand followed closely by another man who flips and lands on the first man\'s back pushing his face into the sand, caption says "CSS"' },
  { filename: 'flex-direction-column', width: 330, height: 330, alt: 'four green dice sit in a row on a table and a kid gathers them with the swoop of a plastic cup, he then lifts the cup revealing the four dice stacked vertically, caption says `flex-direction: column;`' },
  { filename: 'css-printed-fabric-sm', width: 250, height: 283, alt: 'white sheet of fabric moves to the right underneath various rollers that each add more and more color and detail, caption says "CSS"' },
  { filename: 'not-green', width: 250, height: 390, alt: 'red berries cascade through a mechanical sorting machine where little arms extend and knock away any berries that are green, caption says `:not(.green)`' },
  { filename: 'wrapper', width: 250, height: 368, alt: 'mechanical arms lower a cover of plastic over a big stack of boxes, caption says `<div class="wrapper">`' },
  { filename: 'border-radius', width: 290, height: 398, alt: 'man grabs the edges of a square sheet of glass and lifts, breaking the corners off into a perfect circle, caption says `border-radius: 50%`' },
  { filename: 'css-space-evenly', width: 250, height: 371, alt: 'man shuffles a tray of circular cookies and with a twist of the tray, all the cookies arrange in a nice evenly spaced pattern, caption says `justify-content: space-evenly;`' },
  { filename: 'position-fixed', width: 400, height: 429, alt: 'a golf club swings at a ball, misses, and hits only the flexible tee while the ball does not move an inch, caption says `position: fixed;`' },
  { filename: 'z-index', width: 300, height: 331, alt: 'man bangs his fist against a walnut to try and crack it but pushes it through the desk forming a hole, caption says `z-index: -1;`' },
  { filename: 'bang-important', width: 400, height: 317, alt: 'a young boy kicks a soccer ball toward a goal where the goalie is not paying attention, an adult labeled `!important` pushes the goalie down to the ground to block the ball' },
  { filename: 'opacity', width: 250, height: 326, alt: 'a remote control changes a wall of windows from opaque to see-through and back again, the caption changes from `opacity: 1;` to `opacity: 0;` along with it' },
  { filename: 'css-body-visibility', width: 200, height: 146, alt: 'a dog\'s disembodied head runs through a field with ears flapping, caption says `body { visibility: hidden; }`' },
  { filename: 'media-queries2', width: 200, height: 271, alt: 'two men sort fruit by sending them down a metal slide contraption that allows the fruit to fall into separate bins depending on their size, caption says "media queries"' },
  { filename: 'css-only-child', width: 400, height: 400, alt: 'caption says `:only-child { float: left; }`, man hits a golf ball toward a giant Jenga set on a table, it hits a block alone in its row sending it to the left offscreen and the tower falls nicely to fill the empty space' },
  { filename: 'bucket-the-cascade', width: 400, height: 225, alt: 'man wearing a blue bucket on his head jumps down from the roof of a car, the car owner chases him and knocks the blue bucket off his head to reveal a smaller turquoise bucket underneath, caption says "the cascade"' },
  { filename: 'css-adjacent-sibling-combinator', width: 350, height: 197, alt: 'man bowls a ball down a lane toward two split pins, the ball knocks down both pins and sends one of them to knock down a single pin in the next lane, caption says "adjacent sibling combinator"' },
  { filename: 'grid-to-flex', width: 400, height: 235, alt: 'caption says `display: grid;`, man grabs a block from a tower of horizontally and vertically balanced wood blocks and they all fall nicely into a single row, the caption updates to `display: flex;`' },
  { filename: 'css-border-style-dotted', width: 350, height: 326, alt: 'group of restaurant workers evenly place plates around the edge of a circular lazy susan, caption says `border-style: dotted;`' },
  { filename: 'basketball-grid', width: 400, height: 219, alt: 'caption says `grid-column: 2; grid-row: 2;` man walks and throws a basketball behind his back where it bounces and lands in the 2x2 empty spot in a 4x4 rack of basketballs' },
  { filename: 'balloons-css', width: 400, height: 225, alt: 'man swings at a baseball on a tee toward a blue balloon, he misses and overswings but hits a second baseball behind him that hits and pops a pink balloon, caption says "CSS"' },
  { filename: 'align-self-stretch2', width: 400, height: 349, alt: 'a handful of colorful drinking straws, fingers grab one and stretch it out tall and out of frame, caption says `align-self: stretch;`' },
  { filename: 'geese-last-child', width: 400, height: 248, alt: 'a CSS declaration says `:last-child { }` with a blinking cursor. a line of brown geese walk by followed by a single white goose. the declaration gets filled in `color: white;`' },
  { filename: 'git-stash', width: 400, height: 222, alt: 'Janet from the Good Place happily accepts a piece of paper in her mouth from Eleanor, caption says `git stash`' },
];

export function GifsPage() {
  const [copiedLabel, setCopiedLabel] = useState<Record<string, boolean>>({});
  const [visibleCount, setVisibleCount] = useState(GIF_BATCH_SIZE);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const canCopy = useMemo(() => typeof navigator !== 'undefined' && !!navigator.clipboard, []);
  const siteUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.trim().replace(/\/+$/, '');
  const markdownOrigin = siteUrl || window.location.origin;
  const visibleGifs = useMemo(() => GIF_ITEMS.slice(0, visibleCount), [visibleCount]);
  const hasMoreGifs = visibleCount < GIF_ITEMS.length;

  useEffect(() => {
    const sentinel = loadMoreRef.current;
    if (!sentinel || !hasMoreGifs) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisibleCount((previous) => Math.min(previous + GIF_BATCH_SIZE, GIF_ITEMS.length));
        }
      },
      { rootMargin: '250px 0px' },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [hasMoreGifs]);

  const handlePreview = (event: MouseEvent<HTMLAnchorElement>, filename: string) => {
    event.preventDefault();
    const img = event.currentTarget.querySelector('img');

    if (img instanceof HTMLImageElement) {
      void playGifPreview(img, assetUrl(`assets/images/gifs/${filename}.gif`));
    }
  };

  const copyMarkdown = async (filename: string, text: string) => {
    if (!canCopy) {
      return;
    }

    await navigator.clipboard.writeText(text);
    setCopiedLabel((prev) => ({ ...prev, [filename]: true }));

    window.setTimeout(() => {
      setCopiedLabel((prev) => ({ ...prev, [filename]: false }));
    }, 2000);
  };

  return (
    <Layout
      title="GIFs | Chintak Joshi"
      bodyClass="gifs"
      useMain={false}
      header={
        <div className="container">
          <p className="chapter">V</p>
          <h1 id="content">GIFs</h1>
        </div>
      }
    >
      <div className="content">
        <p>Some developer gifs for you to use in your chats and pull requests.</p>
        <noscript>
          <p>
            <em>Enable JavaScript to preview animated gifs</em>
          </p>
        </noscript>
        {visibleGifs.map((gif) => {
          const gifUrl = new URL(assetUrl(`assets/images/gifs/${gif.filename}.gif`), `${markdownOrigin}/`).href;
          const markdown = `![${gif.alt}](${gifUrl})`;
          const label = copiedLabel[gif.filename] ? 'Copied!' : 'Copy markdown';

          return (
            <div key={gif.filename}>
              <a className="gif-preview" href="#" onClick={(event) => handlePreview(event, gif.filename)}>
                <img
                  src={assetUrl(`assets/images/gifs/${gif.filename}.jpg`)}
                  width={gif.width}
                  height={gif.height}
                  alt={gif.alt}
                  loading="lazy"
                />
              </a>
              <small>
                <em>Click to preview gif</em>
              </small>
              <pre>
                <code>{markdown}</code>
                {canCopy ? (
                  <button type="button" onClick={() => void copyMarkdown(gif.filename, markdown)}>
                    {label}
                  </button>
                ) : null}
              </pre>
            </div>
          );
        })}
        {hasMoreGifs ? <div ref={loadMoreRef} className="gifs-sentinel" aria-hidden="true" /> : null}
      </div>
    </Layout>
  );
}

