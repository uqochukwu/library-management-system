import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";
import "./layout.css";


function Layout({ children }) {
  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Header />

        <section className="page-content">
          {children}
        </section>

      </main>

    </div>
  );
}

export default Layout;