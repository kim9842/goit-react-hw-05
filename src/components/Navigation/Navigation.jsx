import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

export default function Navigation() {
  return (
    <header>
      <nav className={s.nav}>
        <NavLink to="/" className={s.link}>
          Home
        </NavLink>
        <NavLink to="/movies" className={s.link}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
}
