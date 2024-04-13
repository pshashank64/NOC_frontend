import React, { lazy, Suspense } from "react";
import "./App.css";
import { Routes, Route, Outlet, Link } from "react-router-dom";

const Student = lazy(() => import("./components/Student/student"));
const Dean = lazy(() => import("./components/Dean/dean"));
const CRPC = lazy(() => import("./components/CRPC/crpc"));
const HOD = lazy(() => import("./components/HOD/hod"));


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="student"
            element={
              <React.Suspense fallback={<>...</>}>
                <Student />
              </React.Suspense>
            }
          />
          <Route
            path="dean"
            element={
              <React.Suspense fallback={<>...</>}>
                <Dean />
              </React.Suspense>
            }
          />
          <Route
            path="crpc"
            element={
              <React.Suspense fallback={<>...</>}>
                <CRPC />
              </React.Suspense>
            }
          />
          <Route
            path="hod"
            element={
              <React.Suspense fallback={<>...</>}>
                <HOD />
              </React.Suspense>
            }
          />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
};

function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div  className="layout">
      <section className="content yobject-marked">
        <div className="box bg-3">
          <div>
            <Link to={'/student'} className="button button--wayra button--border-medium button--text-upper button--size-s button--text-thick button--inverted">Student</Link>
            <Link to={'/hod'} className="button button--wayra button--border-medium button--text-upper button--size-s button--text-thick button--inverted">HOD</Link>
          </div>
          <div>
            <Link to={'/crpc'} className="button button--wayra button--border-medium button--text-upper button--size-s button--text-thick button--inverted">CRPC</Link>
            <Link to={'/dean'} className="button button--wayra button--border-medium button--text-upper button--size-s button--text-thick button--inverted">Dean</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;
