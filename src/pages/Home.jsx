import React, { useContext, useEffect } from "react";
import TopServices from "../components/TopServices";
import Banner from "../components/Banner";
import TopReviews from "../components/TopReviews";
import { AppContext } from "../context/AppContext";
import Staff from "../components/Staff";

const Home = () => {
  const { staffs, reviews } = useContext(AppContext);
  useEffect(() => {
    document.title = "SalonHair - Trang chủ";
  }, []);
  return (
    <div className="">
      <Banner />

      <TopServices />
      <TopReviews reviews={reviews} />
      <Staff staffs={staffs} />
    </div>
  );
};

export default Home;
