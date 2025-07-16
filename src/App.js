import React, { useState, useEffect } from "react";
import guineapigImg from "./assets/Guineapig_1.jpg";
import rikyshaImg from "./assets/Rikysha_1.jpg";
import "./App.css";


const allProducts = [
  { id: 1, category: "candles", img: rikyshaImg, title: "Свеча Лаванда", description: "Аромат лаванды, 100% воск", price: "1200 ARS" },
  { id: 2, category: "scrubs", img: rikyshaImg, title: "Скраб Кофе", description: "Скраб с кофе и маслом", price: "900 ARS" },
  { id: 3, category: "mists", img: rikyshaImg, title: "Мист Роза", description: "Увлажнение и свежесть", price: "600 ARS" },
  { id: 4, category: "bathbombs", img: rikyshaImg, title: "Бомбочка Цитрус", description: "Эффервесцентная", price: "700 ARS" },
  { id: 5, category: "soap", img: rikyshaImg, title: "Мыло Олива", description: "Натуральное мыло", price: "500 ARS" },
  { id: 6, category: "perfume", img: rikyshaImg, title: "Духи Лето", description: "Лёгкий аромат", price: "1500 ARS" },
  { id: 7, category: "antiseptics", img: rikyshaImg, title: "Антисептик Лаванда", description: "С ароматом лаванды", price: "450 ARS" },
  { id: 8, category: "candles", img: rikyshaImg, title: "Свеча Ваниль", description: "Тёплый аромат", price: "1100 ARS" },
  { id: 9, category: "candles", img: rikyshaImg, title: "Свеча Кофе", description: "Аромат кофе", price: "1150 ARS" },
  { id: 10, category: "scrubs", img: rikyshaImg, title: "Скраб Сахар", description: "Скраб с сахаром", price: "850 ARS" },
];

const categories = [
  "Все",
  "Свечи",
  "Скрабы",
  "Мисты",
  "Бомбочки для ванны",
  "Мыло",
  "Духи",
  "Антисептики",
];

const categoryKeys = [
  "all",
  "candles",
  "scrubs",
  "mists",
  "bathbombs",
  "soap",
  "perfume",
  "antiseptics",
];

export default function App() {
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [lang, setLang] = useState("ru");

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
  const filtered = filter === "Все" ? allProducts : allProducts.filter((p) => p.category === filter);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  if (page > totalPages) setPage(totalPages || 1);
}, [itemsPerPage, filter]);

  const filteredProducts =
  filter === "all" ? allProducts : allProducts.filter((p) => p.category === filter);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const translations = {
  ru: {
    title: "What Rikysha Sees",
    subtitle: "Авторская косметика и свечи ручной работы с любовью",
    products: "Товары",
    filters: [
      { key: "all", label: "Все" },
      { key: "candles", label: "Свечи" },
      { key: "scrubs", label: "Скрабы" },
      { key: "mists", label: "Мисты" },
      { key: "bathbombs", label: "Бомбочки для ванны" },
      { key: "soap", label: "Мыло" },
      { key: "perfume", label: "Духи" },
      { key: "antiseptics", label: "Антисептики" },
    ],
    cards: [
      { title: "Свеча Лаванда", description: "Аромат лаванды, 100% воск" },
      { title: "Скраб Кофе", description: "Скраб с кофе и маслом" },
      { title: "Мист Роза", description: "Увлажнение и свежесть" },
      { title: "Бомбочка Цитрус", description: "Эффервесцентная" },
      { title: "Мыло Олива", description: "Натуральное мыло" },
      { title: "Духи Лето", description: "Лёгкий аромат" },
      { title: "Антисептик Лаванда", description: "С ароматом лаванды" },
      { title: "Свеча Ваниль", description: "Тёплый аромат" },
      { title: "Свеча Кофе", description: "Аромат кофе" },
      { title: "Скраб Сахар", description: "Скраб с сахаром" },
    ],
  },
  en: {
    title: "What Rikysha Sees",
    subtitle: "Handmade cosmetics and candles with love",
    products: "Products",
    filters: [
      { key: "all", label: "All" },
      { key: "candles", label: "Candles" },
      { key: "scrubs", label: "Scrubs" },
      { key: "mists", label: "Mists" },
      { key: "bathbombs", label: "Bath Bombs" },
      { key: "soap", label: "Soap" },
      { key: "perfume", label: "Perfume" },
      { key: "antiseptics", label: "Antiseptics" },
    ],
    cards: [
      { title: "Lavender Candle", description: "Lavender scent, 100% wax" },
      { title: "Coffee Scrub", description: "Scrub with coffee and oil" },
      { title: "Rose Mist", description: "Moisturizing and freshness" },
      { title: "Citrus Bath Bomb", description: "Effervescent" },
      { title: "Olive Soap", description: "Natural soap" },
      { title: "Summer Perfume", description: "Light fragrance" },
      { title: "Lavender Antiseptic", description: "With lavender scent" },
      { title: "Vanilla Candle", description: "Warm aroma" },
      { title: "Coffee Candle", description: "Coffee aroma" },
      { title: "Sugar Scrub", description: "Scrub with sugar" },
    ],
  },
  es: {
    title: "What Rikysha Sees",
    subtitle: "Cosmética y velas artesanales con amor",
    products: "Productos",
    filters: [
      { key: "all", label: "Todo" },
      { key: "candles", label: "Velas" },
      { key: "scrubs", label: "Exfoliantes" },
      { key: "mists", label: "Mists" },
      { key: "bathbombs", label: "Bombas de baño" },
      { key: "soap", label: "Jabón" },
      { key: "perfume", label: "Perfume" },
      { key: "antiseptics", label: "Antisépticos" },
    ],
    cards: [
      { title: "Vela de Lavanda", description: "Aroma de лаванда, 100% cera" },
      { title: "Exfoliante de Café", description: "Exfoliante con café y aceite" },
      { title: "Mist de Rosa", description: "Hidratación y frescura" },
      { title: "Bomba de baño Cítrica", description: "Efervescente" },
      { title: "Jabón de Oliva", description: "Jabón natural" },
      { title: "Perfume de Verano", description: "Fragancia ligera" },
      { title: "Antiséptico de Лаванда", description: "Con aroma de лаванда" },
      { title: "Vela de Vainilla", description: "Aroma cálido" },
      { title: "Vela de Café", description: "Aroma a café" },
      { title: "Exfoliante de Azúcar", description: "Exfoliante con azúcar" },
    ],
  }
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
    <button className={`lang-btn${lang === "ru" ? " active" : ""}`} onClick={() => setLang("ru")}>RU</button>
    <button className={`lang-btn${lang === "en" ? " active" : ""}`} onClick={() => setLang("en")}>EN</button>
    <button className={`lang-btn${lang === "es" ? " active" : ""}`} onClick={() => setLang("es")}>ES</button>
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
        .sort((a, b) => a.label.localeCompare(b.label, lang === "ru" ? "ru" : lang === "es" ? "es" : "en"))
        .map((cat) => (
          <option key={cat.key} value={cat.key}>{cat.label}</option>
        ))}
    </select>
  </div>

  <div className="products-grid">
          {displayedProducts.map((product, idx) => {
            // Найти индекс продукта в allProducts
            const prodIdx = allProducts.findIndex(p => p.id === product.id);
            const card = translations[lang].cards[prodIdx];
            return (
              <div
                key={product.id}
                className="product-card"
                onClick={() => setSelectedProduct(product)}
                style={{ cursor: "pointer" }}
              >
                <img src={product.img} alt={card.title} />
                <h3>{card.title}</h3>
                <p className="product-desc">{card.description}</p>
                <p className="product-price">{product.price}</p>
              </div>
            );
          })}
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
    <div className="modal-card" onClick={() => setSelectedProduct(null)}>
      <button className="modal-close" onClick={() => setSelectedProduct(null)}>×</button>
      <img src={selectedProduct.img} alt={
        translations[lang].cards[allProducts.findIndex(p => p.id === selectedProduct.id)].title
      } className="modal-img" />
      <h3>{
        translations[lang].cards[allProducts.findIndex(p => p.id === selectedProduct.id)].title
      }</h3>
      <p className="modal-desc">{
        translations[lang].cards[allProducts.findIndex(p => p.id === selectedProduct.id)].description
      }</p>
      <p className="modal-price">{selectedProduct.price}</p>
    </div>
  </div>
)}
    </>
  );
}
