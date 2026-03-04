import { TodoList } from "./todoList.js";

export const observerMixin = {
  observers: new Set(),
  addObserver(obs) {
    this.observers.add(obs);
  },
  removeObserver(obs) {
    this.observers.delete(obs);
  },

  notify() {
    this.updatelist(); 
  },


  updatelist(){
    const todoList = TodoList.getInstance();
    
    DOM.todoList.textContent = "";

    todoList.items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.text;
      
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("delete-btn");
      
     
      li.appendChild(deleteBtn);
      DOM.todoList.appendChild(li);
    });
    
  }

};
