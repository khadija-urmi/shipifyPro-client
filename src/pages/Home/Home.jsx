import React from "react";
import Banner from "../../components/Banner/Banner";
import ProcessSteps from "../../components/ProcessSteps/ProcessSteps ";
import AboutUs from "../../components/AboutUs/AboutUs";
import StatisticsCards from "../../components/StatisticsCards/StatisticsCards";
const Home = () => {
  return (
    <div>
      <Banner />
      <ProcessSteps />
      <AboutUs />
      <StatisticsCards />
    </div>
  );
};

export default Home;
