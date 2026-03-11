import Storage from "./Storage.js";

const CART_KEY = "cart";

const Store = {
  menu: null,
  cart: Storage.get(CART_KEY) || [],
};

const proxiedStore = new Proxy(Store, {
  set(target, property, value) {
    target[property] = value;
    if (property == "menu") {
      window.dispatchEvent(new Event("appmenuchange"));
    }
    if (property == "cart") {
      Storage.set(CART_KEY, value);
      window.dispatchEvent(new Event("appcartchange"));
    }
    return true;
  },
});

export default proxiedStore;
