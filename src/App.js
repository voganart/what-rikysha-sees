import React, { useState, useEffect } from "react";
import "./colors.css";
import "./App.css";
import guineapigImg from "./assets/Guineapig_1.png";
import rikyshaImg from "./assets/Rikysha_1.jpg";
import antiseptic_1 from "./assets/antiseptic_1.jpg";
import bathbomb_1 from "./assets/bathbomb_1.jpg";
import candle_1 from "./assets/candle_1.jpg";
import candle_2 from "./assets/candle_2.jpg";
import painting_1 from "./assets/painting_1.jpg";
import perfume_1 from "./assets/perfume_1.jpg";
import perfume_2 from "./assets/perfume_2.jpg";
import soap_1 from "./assets/soap_1.jpg";
import soap_2 from "./assets/soap_2.jpg";

const allProducts = [
  { id: 1, category: "soap", img: soap_1, titles: { ru: "Мыло", en: "Soap", es: "Jabón" }, descriptions: { ru: "Состав: мыло на основе кокоса, краситель, отдушка.", en: "Ingredients: coconut-based soap, colorant, fragrance.", es: "Ingredientes: jabón a base de coco, colorante, fragancia." }, price: "$5000+" },
  { id: 2, category: "other", img: painting_1, titles: { ru: "Круглые картины на заказ", en: "Round Paintings on Order", es: "Cuadros redondos por encargo" }, descriptions: { ru: "Покрытие акрилом, можно выбрать цветовую гамму.", en: "Acrylic finish, color scheme can be selected.", es: "Acabado acrílico, se puede elegir la gama de colores." }, price: "$20000+" },
  { id: 3, category: "candles", img: candle_1, titles: { ru: "Десертные свечи", en: "Dessert Candles", es: "Velas de postre" }, descriptions: { ru: "Состав: соевый воск, краситель, отдушка.", en: "Ingredients: soy wax, colorant, fragrance.", es: "Ingredientes: cera de soja, colorante, fragancia." }, price: "$15000+" },
  { id: 4, category: "perfume", img: perfume_1, titles: { ru: "Твердые духи (маленькая баночка)", en: "Solid Perfume (Small Jar)", es: "Perfume sólido (frasco pequeño)" }, descriptions: { ru: "Состав: соевый воск, масло миндаля, витамин Е, отдушка.", en: "Ingredients: soy wax, almond oil, vitamin E, fragrance.", es: "Ingredientes: cera de soja, aceite de almendra, vitamina E, fragancia." }, price: "$8000+" },
  { id: 5, category: "perfume", img: perfume_1, titles: { ru: "Твердые духи (большая баночка)", en: "Solid Perfume (Large Jar)", es: "Perfume sólido (frasco grande)" }, descriptions: { ru: "Состав: соевый воск, масло миндаля, витамин Е, отдушка.", en: "Ingredients: soy wax, almond oil, vitamin E, fragrance.", es: "Ingredientes: cera de soja, aceite de almendra, vitamina E, fragancia." }, price: "$11000+" },
  { id: 6, category: "soap", img: soap_2, titles: { ru: "Мыло-десерт", en: "Dessert Soap", es: "Jabón de postre" }, descriptions: { ru: "Состав: мыло на основе кокоса, краситель, отдушка.", en: "Ingredients: coconut-based soap, colorant, fragrance.", es: "Ingredientes: jabón a base de coco, colorante, fragancia." }, price: "$10000+" },
  { id: 7, category: "antiseptics", img: antiseptic_1, titles: { ru: "Антисептик", en: "Antiseptic", es: "Antiséptico" }, descriptions: { ru: "Состав: алоэ-вера, спирт, отдушка, глицерин.", en: "Ingredients: aloe vera, alcohol, fragrance, glycerin.", es: "Ingredientes: aloe vera, alcohol, fragancia, glicerina." }, price: "$8000+" },
  { id: 8, category: "bathbombs", img: bathbomb_1, titles: { ru: "Бомбочка для ванны (сердце)", en: "Bath Bomb (Heart)", es: "Bomba de baño (corazón)" }, descriptions: { ru: "С подарком или без. Лимонная кислота, сода, масло миндаля и др.", en: "With or without a gift. Citric acid, soda, almond oil, etc.", es: "Con o sin regalo. Ácido cítrico, soda, aceite de almendra, etc." }, price: "$15000+" },
  { id: 9, category: "perfume", img: perfume_2, titles: { ru: "Масляные духи", en: "Oil Perfume", es: "Perfume de aceite" }, descriptions: { ru: "Состав: масло миндаля, композиция из отдушек.", en: "Ingredients: almond oil, fragrance composition.", es: "Ingredientes: aceite de almendra, composición de fragancias." }, price: "$8000+" },
  { id: 10, category: "candles", img: candle_2, titles: { ru: "Свечи-напитки со льдом", en: "Drink Candles with Ice", es: "Velas-bebida con hielo" }, descriptions: { ru: "Соевый воск, гелевый парафин, отдушки, краситель.", en: "Soy wax, gel paraffin, fragrances, colorant.", es: "Cera de soja, parafina en gel, fragancias, colorante." }, price: "$15000+" }
];

export default function App() {
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [lang, setLang] = useState("ru");

  // Состояние для отображения стрелки "Наверх"
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setItemsPerPage(16); // 4x4
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(9); // 3x3
      } else {
        setItemsPerPage(4); // меньше для мобил
      }
    };

    handleResize(); // вызов при старте
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const filtered = filter === "all" ? allProducts : allProducts.filter((p) => p.category === filter);
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    if (page > totalPages) setPage(totalPages || 1);
  }, [itemsPerPage, filter, page]);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (selectedProduct) {
        setSelectedProduct(null); // Закрываем модалку при прокрутке
      }
    };
    if (selectedProduct) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedProduct]);

  const filteredProducts = filter === "all" ? allProducts : allProducts.filter((p) => p.category === filter);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const translations = {
    ru: {
      title: "What Rikysha Sees",
      subtitle: "Авторская косметика и свечи ручной работы с любовью",
      products: "Товары",
      filters: [
        { key: "all", label: "Все" },
        { key: "candles", label: "Свечи" },
        { key: "soap", label: "Мыло" },
        { key: "bathbombs", label: "Бомбочки для ванны" },
        { key: "perfume", label: "Духи" },
        { key: "antiseptics", label: "Антисептики" },
        { key: "other", label: "Другое" },
      ],
    },
    en: {
      title: "What Rikysha Sees",
      subtitle: "Handmade cosmetics and candles with love",
      products: "Products",
      filters: [
        { key: "all", label: "All" },
        { key: "candles", label: "Candles" },
        { key: "soap", label: "Soap" },
        { key: "bathbombs", label: "Bath Bombs" },
        { key: "perfume", label: "Perfume" },
        { key: "antiseptics", label: "Antiseptics" },
        { key: "other", label: "Other" },
      ],
    },
    es: {
      title: "What Rikysha Sees",
      subtitle: "Cosmética y velas artesanales con amor",
      products: "Productos",
      filters: [
        { key: "all", label: "Todo" },
        { key: "candles", label: "Velas" },
        { key: "soap", label: "Jabón" },
        { key: "bathbombs", label: "Bombas de baño" },
        { key: "perfume", label: "Perfume" },
        { key: "antiseptics", label: "Antisépticos" },
        { key: "other", label: "Otros" },
      ],
    },
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <h1 className="title">{translations[lang].title}</h1>
          <p className="subtitle">{translations[lang].subtitle}</p>
          <img
            className="header-image"
            src={guineapigImg}
            alt="Морская свинка"
            style={{ cursor: "pointer" }}
            onClick={() => window.location.reload()}
          />
        </div>
      </header>

      <section className="products-section">
        <div className="lang-switcher">
          <button
            className={`lang-btn${lang === "ru" ? " active" : ""}`}
            onClick={() => setLang("ru")}
          >
            RU
          </button>
          <button
            className={`lang-btn${lang === "en" ? " active" : ""}`}
            onClick={() => setLang("en")}
          >
            EN
          </button>
          <button
            className={`lang-btn${lang === "es" ? " active" : ""}`}
            onClick={() => setLang("es")}
          >
            ES
          </button>
        </div>

        <div className="products-toolbar">
          <span className="products-label">{translations[lang].products}:</span>
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
            }}
            className="filter-select"
          >
            {/* Сначала "Все", потом отсортированные остальные */}
            <option key={translations[lang].filters[0].key} value={translations[lang].filters[0].key}>
              {translations[lang].filters[0].label}
            </option>
            {[...translations[lang].filters.slice(1)]
              .sort((a, b) =>
                a.label.localeCompare(
                  b.label,
                  lang === "ru" ? "ru" : lang === "es" ? "es" : "en"
                )
              )
              .map((cat) => (
                <option key={cat.key} value={cat.key}>
                  {cat.label}
                </option>
              ))}
          </select>
        </div>

        <div className="products-grid">
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => setSelectedProduct(product)}
              style={{ cursor: "pointer" }}
            >
              <img src={product.img} alt={product.title} />
              <h3>{product.titles[lang]}</h3>
              <p className="product-desc">{product.descriptions[lang]}</p>
              <p className="product-price">{product.price}</p>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
              {"<"}
            </button>
            <span>
              {page} / {totalPages}
            </span>
            <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
              {">"}
            </button>
          </div>
        )}
      </section>

      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-card">
            <img src={selectedProduct.img} alt={selectedProduct.title} className="modal-img" />
            <h3>{selectedProduct.titles[lang]}</h3>
            <p className="modal-desc">{selectedProduct.descriptions[lang]}</p>
            <p className="modal-price">{selectedProduct.price}</p>
          </div>
        </div>
      )}

      {showScrollTop && (
        <button
          className="scroll-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Наверх"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="14" fill="#eae7dc" />
            <path d="M14 9 L14 19" stroke="#e85a4f" strokeWidth="2" strokeLinecap="round" />
            <path d="M9 14 L14 9 L19 14" stroke="#e85a4f" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        </button>
      )}
    </>
  );
}
