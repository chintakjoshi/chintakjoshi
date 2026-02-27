import { Layout } from '../components/Layout';
import { MainNav } from '../components/MainNav';

export function HomePage() {
  return (
    <Layout
      title="Chintak Joshi"
      bodyClass="home"
      showFooter={false}
      header={
        <div className="container">
          <h1>
            Chintak <br /> Joshi
          </h1>
          <h2>Software Engineer</h2>
        </div>
      }
    >
      <div className="container">
        <MainNav bodyClass="home" />
      </div>
    </Layout>
  );
}
