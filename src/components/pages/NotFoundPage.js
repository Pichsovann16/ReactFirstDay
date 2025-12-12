import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="page">
      <header className="header">
        <div className="header__inner">
          <h1 className="header__title">Page not found</h1>
        </div>
      </header>
      <main className="container">
        <div className="notice">
          <p>This page does not exist.</p>
          <Link className="backLink" to="/">
            ← Go home
          </Link>
        </div>
      </main>
    </div>
  );
}
