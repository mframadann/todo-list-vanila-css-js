let CloseButtonNotification = document.querySelector("#close");
let FormInputs = document.getElementById("TodoInputs");
let ButtonSubmit = document.querySelector(".submitions");
let Message = document.querySelector(".message");
let MessageVal = document.getElementById("message-val");
let TodoLists = document.querySelector(".lists");
let DeleteTodo = document.getElementsByName("delete");
var GettodoItems = JSON.parse(localStorage.getItem("todos")) || [];

CloseButtonNotification.addEventListener("click", () => {
  Message.classList.toggle("hidden");
});

FormInputs.addEventListener("click", () => {
  ButtonSubmit.addEventListener("click", () => {
    let ItExists = GettodoItems.filter((data) => data.todo == FormInputs.value);

    if (ItExists.length > 0) {
      MessageVal.innerText = `${FormInputs.value} Already exists, try again`;
      Message.classList.toggle("hidden");
      FormInputs.value = null;

      return false;
    }

    GettodoItems.push({
      todo: FormInputs.value,
    });

    localStorage.setItem("todos", JSON.stringify(GettodoItems));
    MessageVal.innerText = `${FormInputs.value} successfully added.`;

    Message.classList.toggle("hidden");

    setTimeout(() => {
      location.reload();
    }, 500);
  });
});

function GetTodosData(val) {
  return val.map((data) => {
    return `
         <div class="todos">
           <div class="wrap">
             <h5 name="todo-val">${data.todo}</h5>
             <div class="actions">
               <img src="./assets/icons/UpdateIcons.svg" id="update"  alt="update">
               <img src="./assets/icons/CloseIcons.svg" id="delete" name="delete" data-todo=${data.todo}>
             </div>
           </div>
         </div>
          `;
  });
}

TodoLists.innerHTML = GetTodosData(GettodoItems);
TodoLists.innerHTML = TodoLists.innerHTML.trim().replace(/,/g, "");

DeleteTodo.forEach((el) => {
  el.addEventListener("click", () => {
    const data = el.getAttribute("data-todo");

    let deletes = GettodoItems.filter((datas) => datas.todo != data);

    localStorage.setItem("todos", JSON.stringify(deletes));
    MessageVal.innerText = `${data} successfully deleted.`;
    Message.classList.toggle("hidden");

    setTimeout(() => {
      location.reload();
    }, 500);
  });
});
