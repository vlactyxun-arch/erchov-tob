import { CookieNotice } from "./CookieNotice";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div>
          <a href="#hero" className="brand">
            Тобольск глазами Ершова
          </a>
          <p>Авторский маршрут по Тобольску</p>
        </div>
        <div>
          <a href="#contact">Связаться с нами</a>
          <br />
          <CookieNotice />
        </div>
        <div>
          <a href="https://www.tiamz.ru/home-rus/tobolskij-kreml-muzejnyj-ansambl.html">
            Фото кремля · Тобольский музей-заповедник
          </a>
          <br />
          <a href="https://site-16.lemnity.ru/erchov">
            Исходная программа маршрута
          </a>
        </div>
      </div>
      <section
        className="wrap footer-partners"
        aria-labelledby="partners-title"
      >
        <h2 id="partners-title">Партнёры маршрута</h2>
        <div className="partner-logos">
          <span>Логотип партнёра</span>
          <span>Логотип партнёра</span>
          <span>Логотип партнёра</span>
        </div>
      </section>
      <p className="wrap footer-credit">
        <a href="https://lemmus.studio/">
          Сделано в <strong>lemmus</strong>
        </a>
      </p>
    </footer>
  );
}
