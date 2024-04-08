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
      <div className="wordart horizon">
        <span className="text">KIET Group of Institutions</span>
      </div>
      <div className="wave">
        <svg id="wave" style={{transform:'rotate(180deg)', transition: '0.3s'}} viewBox="0 0 1440 340" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
              <stop stopColor="rgba(88.311, 94.569, 209.784, 1)" offset="0%"></stop>
              <stop stopColor="rgba(239.383, 195.375, 233.482, 1)" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path style={{transform:'translate(0, 0px)', opacity:'1'}} fill="url(#sw-gradient-0)" d="M0,102L48,85C96,68,192,34,288,28.3C384,23,480,45,576,62.3C672,79,768,91,864,113.3C960,136,1056,170,1152,153C1248,136,1344,68,1440,45.3C1536,23,1632,45,1728,85C1824,125,1920,181,2016,204C2112,227,2208,215,2304,221C2400,227,2496,249,2592,232.3C2688,215,2784,159,2880,113.3C2976,68,3072,34,3168,17C3264,0,3360,0,3456,5.7C3552,11,3648,23,3744,73.7C3840,125,3936,215,4032,221C4128,227,4224,147,4320,96.3C4416,45,4512,23,4608,56.7C4704,91,4800,181,4896,209.7C4992,238,5088,204,5184,181.3C5280,159,5376,147,5472,119C5568,91,5664,45,5760,56.7C5856,68,5952,136,6048,170C6144,204,6240,204,6336,198.3C6432,193,6528,181,6624,153C6720,125,6816,79,6864,56.7L6912,34L6912,340L6864,340C6816,340,6720,340,6624,340C6528,340,6432,340,6336,340C6240,340,6144,340,6048,340C5952,340,5856,340,5760,340C5664,340,5568,340,5472,340C5376,340,5280,340,5184,340C5088,340,4992,340,4896,340C4800,340,4704,340,4608,340C4512,340,4416,340,4320,340C4224,340,4128,340,4032,340C3936,340,3840,340,3744,340C3648,340,3552,340,3456,340C3360,340,3264,340,3168,340C3072,340,2976,340,2880,340C2784,340,2688,340,2592,340C2496,340,2400,340,2304,340C2208,340,2112,340,2016,340C1920,340,1824,340,1728,340C1632,340,1536,340,1440,340C1344,340,1248,340,1152,340C1056,340,960,340,864,340C768,340,672,340,576,340C480,340,384,340,288,340C192,340,96,340,48,340L0,340Z"></path></svg>
      </div>
      <div className="content">
        <div className="btns">
          <Link className="btn btn-white btn-animate" to="/student">Student</Link>
          
          <Link className="btn btn-white btn-animate" to="/dean">Dean</Link>
        
          <Link className="btn btn-white btn-animate" to="/hod">HOD</Link>

          <Link className="btn btn-white btn-animate" to="/crpc">CRPC</Link> 
        </div>
        <div className="img horizon"></div>
      </div>
      
          
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
