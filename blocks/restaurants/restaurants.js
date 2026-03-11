
const restaurants = [
  {
    id: 1,
    name: "La Trattoria Italiana",
    description: "Auténtica comida italiana: pizzas, pastas y más.",
    image: "https://placehold.co/300x200/FF6347/FFFFFF?text=Italiana",
  },
  {
    id: 2,
    name: "American Burger House",
    description: "Las mejores hamburguesas con ingredientes frescos.",
    image: "https://placehold.co/300x200/4682B4/FFFFFF?text=Burgers",
  },
  {
    id: 3,
    name: "El Rincón Español",
    description: "Paellas, tapas y gastronomía española tradicional.",
    image: "https://placehold.co/300x200/FFC107/333333?text=Española",
  },
  {
    id: 4,
    name: "Bistro Français",
    description: "Cocina francesa clásica: coq au vin, croissants y más.",
    image: "https://placehold.co/300x200/6B4226/FFFFFF?text=Francesa",
  },
];

export default class RestaurantsPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    
    const styles = document.createElement("style");
    this.root.appendChild(styles);
    fetch("/blocks/restaurants/restaurants.css")
      .then((r) => r.text())
      .then((css) => (styles.textContent = css));

    this.container = document.createElement("div");
    this.root.appendChild(this.container);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const cardsHTML = restaurants
      .map(
        (r) => `
        <div class='restaurant-card'>
          <img src='${r.image}' alt='${r.name}' />
          <div class='restaurant-card__body'>
            <h3>${r.name}</h3>
            <p>${r.description}</p>
            <a href='/products' class='restaurant-card__btn'>Ver menú</a>
          </div>
        </div>`
      )
      .join("");

    this.container.innerHTML = `
      <h2>Restaurantes</h2>
      <div class='grid'>${cardsHTML}</div>
    `;

    
    this.container.querySelectorAll(".restaurant-card__btn").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        app.router.go(link.getAttribute("href"));
      });
    });
  }
}

customElements.define("restaurants-page", RestaurantsPage);