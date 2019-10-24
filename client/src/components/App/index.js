import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Routes from "./Routes";
import "./Icons";

const App = () => {
  const isSmallScreen = window.innerWidth < 768;

  return (
    <div>
      <Header />
      <div
        className={`container bg-light text-center pt-5 pb-5 ${
          isSmallScreen ? "pl-3 pr-3" : "pl-5 pr-5"
        }`}
      >
        <Routes />
        <Footer />
      </div>
    </div>
  );
};

export default App;
