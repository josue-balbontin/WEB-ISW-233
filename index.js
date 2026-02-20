 const container = document.getElementById("container");
    const html = ``;

    /**
     * @param {string} title
     * @param {string} body
     *
     * @return {HTMLElement}
     */
    function createCardComponent(title, body) {
    
      const template = document.getElementById("card-template");
      
    
      /* */
      const elemento = template.content.firstElementChild.cloneNode(true); 


      const title_element = elemento.getElementsByClassName("card__title")[0];
      const body_element = elemento.getElementsByClassName("card__body__content")[0];

      title_element.textContent = title;
      body_element.textContent = body;

      

      return elemento;

    }

    const component = createCardComponent(
      "Frontend System Design: Fundamentals",
      "This is a random body text",
    );

    container.appendChild(component);