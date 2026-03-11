import { removeFromCart } from "../../services/Order.js";

export default class Carrito extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

  
    const styles = document.createElement("style");
    this.root.appendChild(styles);
    fetch("/blocks/carrito/carrito.css")
      .then((r) => r.text())
      .then((css) => (styles.textContent = css));

    this.container = document.createElement("div");
    this.root.appendChild(this.container);
  }

  connectedCallback() {
    this.render();
    window.addEventListener("appcartchange", () => {
      this.render();
    });
  }

  calcTotal(cart) {
    const total = cart.reduce((acc, item) => {
      const price = parseFloat(item.product.price.replace("$", ""));
      return acc + price * item.quantity;
    }, 0);
    return "$" + total.toFixed(2);
  }

  render() {
    const cart = app.store.cart;

    const itemsHTML =
      cart.length === 0
        ? "<p class='empty'>No hay productos en el carrito.</p>"
        : `
          <ul class='carrito__list'>
            ${cart
              .map(
                (item) => `
              <li class='carrito__item'>
                <img src='${item.product.imageUrl}' alt='${item.product.title}' />
                <div class='carrito__info'>
                  <span class='carrito__name'>${item.product.title}</span>
                  <span class='carrito__price'>${item.product.price} x ${item.quantity}</span>
                </div>
                <button class='carrito__remove' data-id='${item.product.id}'>Eliminar</button>
              </li>`
              )
              .join("")}
          </ul>
          <p class='carrito__total'>Total: ${this.calcTotal(cart)}</p>
        `;

    this.container.innerHTML = `
      <h2>Tu Carrito</h2>
      ${itemsHTML}
    `;

    this.container.querySelectorAll(".carrito__remove").forEach((btn) => {
      btn.addEventListener("click", () => {
        removeFromCart(Number(btn.dataset.id));
      });
    });
  }
}

customElements.define("carrito-page", Carrito);