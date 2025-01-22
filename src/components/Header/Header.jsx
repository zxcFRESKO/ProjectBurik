import { Routes, Route, Link } from "react-router-dom";
import logo from "../../img/free-icon-refresh-database-2952973.png";
import menu from "../../img/icons8-меню-50.png";
import "./Header.css";
import '../../App.css'
import Page_two from "../Page_two/Page_two";
import Contacts from "../Contacts/Contacts";
import Page_One from "../Page_one/Page_one";
import Reviews from "../Reviews";

export default function Header() {
  function menuView() {
    const menu_ul = document.querySelector(".menu_ul");

    document.addEventListener("mouseover", event => {
      if (event.target.classList.contains("logo-menu")) {
        menu_ul.classList.add("_active");
      } else {
        menu_ul.classList.remove("_active");
      }
    });
  }
  return (
    <>
      <header>
        <img
          src={menu}
          alt=""
          className="logo logo-menu menu"
          onMouseOver={menuView}
        />

        <div className="container">
          <div className="header_wrap">
            <div className="header_wrapper">
              <div className="menushka">
                <ul className="logo-menu menu_ul">
                  <li className="logo-menu ">
                    <Link to="/contacts"></Link>
                  </li>
                  <Link to="/home" className="menu_li">
                    <li className="logo-menu menu_li marg">
                      Домашняя страница
                    </li>
                  </Link>
                  <Link to="/contacts" className="menu_li">
                    <li className="logo-menu menu_li marg">Контакты</li>
                  </Link>
                  <Link to="/page_two" className="menu_li">
                    <li className="logo-menu menu_li">Перейти к поиску</li>
                  </Link>
                  <Link to="/reviews" className="menu_li">
                    <li className="logo-menu menu_li">Оставить отзыв</li>
                  </Link>
                </ul>
              </div>
              <Link to="main.html" className="logo_link logo">
                <img src={logo} alt="" />
                <p className="logo__title">GRADE</p>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <Routes>
        <Route path="/home" element={<Page_One />} />
        <Route path="/page_two" element={<Page_two />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/reviews" element={<Reviews />} />
      </Routes>
    </>
  );
}
