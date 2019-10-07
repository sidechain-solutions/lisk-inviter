import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Routes from "./Routes";
import "./Icons";

const App = () => {
  return (
    <div>
      <Header />
      <div className="container bg-light text-center p-5">
        <Routes />
        <Footer />
      </div>
    </div>
  );
};

export default App;
