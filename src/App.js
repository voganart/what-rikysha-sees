import React, { useState } from "react";
import guineapigImg from "./assets/Guineapig_1.jpg";
import rikyshaImg from "./assets/Rikysha_1.jpg";
import "./App.css";

const products = [
  {
    id: 1,
    img: rikyshaImg,
    title: "Ароматная свеча Лаванда",
    description: "Свеча с нежным ароматом лаванды, 100% натуральный воск.",
    price: "1200 ARS",
  },
  {
    id: 2,
    img: rikyshaImg,
    title: "Крем для рук 'Мягкость'",
    description: "Питательный крем с маслом ши и алоэ вера.",
    price: "900 ARS",
  },
  {
    id: 3,
    img: rikyshaImg,
    title: "Бальзам для губ 'Малина'",
    description: "Увлажняющий бальзам с натуральным малиновым экстрактом.",
    price: "600 ARS",
  },
];

export default function App() {
  const [scrollPos, setScrollPos] = useState(0);

  const scrollRef = React.useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <h1 className="title">What Rikysha Sees</h1>
          <p className="subtitle">
            Авторская косметика и свечи ручной работы с любовью
          </p>
          <img className="header-image" src={guineapigImg} alt="Морская свинка" />
        </div>
      </header>

      <section className="products-section">
        <h2>Товары</h2>
        <div className="carousel-container">
          <button className="scroll-btn left" onClick={scrollLeft}>
            &#8592;
          </button>
          <div className="products-carousel" ref={scrollRef}>
            {products.map(({ id, img, title, description, price }) => (
              <div key={id} className="product-card">
                <img src={img} alt={title} />
                <h3>{title}</h3>
                <p className="product-desc">{description}</p>
                <p className="product-price">{price}</p>
              </div>
            ))}
          </div>
          <button className="scroll-btn right" onClick={scrollRight}>
            &#8594;
          </button>
        </div>
      </section>
    </>
  );
}
