import { Layout } from '../components/Layout';

export function NotFoundPage() {
  return (
    <Layout
      title="Nowhere | Chintak Joshi"
      bodyClass="fourohfour utility"
      header={
        <div className="container">
          <p className="chapter">?</p>
          <h1 id="content">404</h1>
        </div>
      }
    >
      <div className="container">
        <div className="content">
          <p>
            Unfortunately what was here is now gone. Perhaps lost to time or perhaps it was never here at all.
          </p>
        </div>
      </div>
    </Layout>
  );
}
