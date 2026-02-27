import { Layout } from '../components/Layout';

export function AboutPage() {
  return (
    <Layout
      title="About | Chintak Joshi"
      bodyClass="about"
      header={
        <div className="container">
          <p className="chapter">II</p>
          <h1 id="content">About</h1>
        </div>
      }
    >
      <div className="container">
        <div className="content">
          <div className="avatar">
            <img src="/assets/images/chintak-about.png" width={400} height={400} alt="Chintak" />
          </div>
          <p>
            Hi, I&apos;m Chintak, a full-stack software engineer who builds things on the web and then immediately wonders
            how to make them stranger and more interesting.
          </p>
          <p>
            While I was doing my Master&apos;s, I&apos;ve worked on projects like <a href="https://ispraak.net">iSpraak</a>, an open
            source speech tool, and I&apos;m always tinkering with something new - AI agents, fun little experiments,
            whatever feels interesting this week. I believe vibe coding is a legitimate engineering philosophy.
          </p>
          <p>
            I care deeply about the people on the other side of the screen. Good software isn&apos;t just functional,
            it&apos;s felt. The user journey matters as much as the code behind it.
          </p>
          <p>
            Right now I&apos;m living in sunny San Francisco, CA, spending my evenings dropping into Valorant matches,
            getting eliminated early in PUBG, and planning my next hike to somewhere with a decent ocean view. Summer
            person through and through.
          </p>
          <p>I&apos;m a big fan of beaches, open world maps, and building things that didn&apos;t exist yesterday.</p>
          <blockquote>
            Chintak approaches every problem like it&apos;s a game he hasn&apos;t figured out yet -- and that&apos;s exactly why he
            always figures it out.
            <cite>someone who knows me well</cite>
          </blockquote>
        </div>
      </div>
    </Layout>
  );
}
