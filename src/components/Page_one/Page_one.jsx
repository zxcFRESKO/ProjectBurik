import { Link } from "react-router-dom";
import first_slider_img from "../../img/nizhnekamsk_045.jpg";
import second_slider_img from "../../img/park-chtenija-i-otdyha-imeni-gabdully-tukaja-v-nizhnekamske.webp";
import third_slider_img from "../../img/sobornaja-mechet-nizhnekamska.webp";
import right_btn from "../../img/free-icon-right-arrow-angle-54833.png";
import left_btn from "../../img/free-icon-left-arrow-angle-54833 — копия.png";
import "./Page_one.css";
import "../../App.css";

export default function Page_One() {
  function slidering() {
    let currentSlide = 0;

    function showSlide(index) {
      const slides = document.querySelectorAll(".slide");
      if (index >= slides.length) {
        currentSlide = 0;
      } else if (index < 0) {
        currentSlide = slides.length - 1;
      } else {
        currentSlide = index;
      }
      const slidesContainer = document.querySelector(".slides");
      slidesContainer.style.transform =
        "translateX(" + -currentSlide * 100 + "%)";
    }

    function changeSlide(n) {
      showSlide(currentSlide + n);
    }

    document.querySelector(".prev").addEventListener("click", function() {
      changeSlide(-1);
    });

    document.querySelector(".next").addEventListener("click", function() {
      changeSlide(1);
    });

    document.addEventListener("keydown", function(event) {
      if (event.key === "ArrowRight") {
        changeSlide(1);
      } else if (event.key === "ArrowLeft") {
        changeSlide(-1);
      }
    });
    showSlide(currentSlide);
    setInterval(() => changeSlide(1), 3000);
  }
  return (
    <section className="page_one">
      <div className="container">
        <div className="page_one_wrap">
          <div className="page_one_wrapper">
            <div className="page_one_title">
              <h1 className="page_one_title_h1">
                Это лучший сайт Путеводитель
              </h1>
              <p className="page_one_paragraph">
                Здесь вы сможете найти все что вам нужно, от уютненькой квартиры
                до роскошного отеля около берега Камы, с красивыми пейзажами
              </p>
            </div>
            <div className="go_to_search">
              <Link to="/page_two">
                <button className="go_to_search_btn">Перейти к поиску</button>
              </Link>
            </div>
          </div>
          <section id="slider">
            <div className="slider-container">
              <div className="slides">
                <div className="slide">
                  <img src={first_slider_img} alt="Изображение 1" />
                </div>
                <div className="slide">
                  <img src={second_slider_img} alt="Изображение 2" />
                </div>
                <div className="slide">
                  <img src={third_slider_img} alt="Изображение 3" />
                </div>
              </div>
              <Link onClick={slidering} className="prev">
                <img src={left_btn} alt="следующая фотка" />
              </Link>
              <Link onClick={slidering} className="next">
                <img src={right_btn} alt="прошлая фотка" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
