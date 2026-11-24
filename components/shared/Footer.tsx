import { CookieNotice } from "./CookieNotice";

export function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="wrap footer-inner">
        <div className="footer-intro">
          <a href="#hero" className="brand">
            Тобольск глазами Ершова
          </a>
          <p>Авторский маршрут по Тобольску</p>
          <a href="#contact" className="button button-outline footer-contact">
            Связаться с нами
          </a>
        </div>
        <nav aria-labelledby="footer-route-title">
          <h2 id="footer-route-title">Маршрут</h2>
          <ul className="footer-links">
            <li>
              <a href="#program">Программа по дням</a>
            </li>
            <li>
              <a href="#map">Карта маршрута</a>
            </li>
            <li>
              <a href="#gallery">Галерея поездки</a>
            </li>
          </ul>
        </nav>
        <section aria-labelledby="footer-sources-title">
          <h2 id="footer-sources-title">Источники</h2>
          <ul className="footer-links">
            <li>
              <a href="https://www.tiamz.ru/home-rus/tobolskij-kreml-muzejnyj-ansambl.html">
                Фото кремля · Тобольский музей-заповедник
              </a>
            </li>
            <li>
              <a href="https://site-16.lemnity.ru/erchov">
                Исходная программа маршрута
              </a>
            </li>
          </ul>
        </section>
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
      <div className="wrap footer-bottom">
        <CookieNotice />
        <p className="footer-credit">
          <a href="https://lemmus.studio/">
            Сделано в <strong>lemmus.</strong>
          </a>
        </p>
      </div>
    </footer>
  );
}
