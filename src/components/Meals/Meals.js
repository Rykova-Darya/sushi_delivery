import PromoText from "./PromoText";
import MealList from "./MealList";
import React from "react";

const Meals = (props) => {
  return (
    <React.Fragment>
      <PromoText />
      <MealList />
    </React.Fragment>
  );
};

export default Meals;
