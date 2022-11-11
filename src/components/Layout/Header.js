import { Fragment } from "react";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1> MealApp</h1>
        <HeaderCartButton onClick={props.openCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="food table" />
      </div>
    </Fragment>
  );
};
export default Header;
