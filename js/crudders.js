import { makeForageCard } from "./renderer.js";
import { renderUpdateForm } from "./renderer.js";
export const getFormData = () => {
  const form = document.querySelector("#foraging-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const forageData = new FormData(form); // get all the fields in the form in key value pairs of Field : Value

    const id = form.dataset.editId ?? crypto.randomUUID();
    const forageValue = {
      id: id,
      name: forageData.get("name"),
      artist: forageData.get("artist"),
      type: forageData.get("type"),
      trackcount: forageData.get("track-count"),
      discovered: forageData.get("discovered"),
      status: form.dataset.editId
        ? JSON.parse(localStorage.getItem(id)).status
        : "finding",
    };

    localStorage.setItem(forageValue.id, JSON.stringify(forageValue));
    makeForageCard();
    console.log(JSON.parse(localStorage.getItem(forageValue.id)));
    cancelUpd();
  });
};

export const changeStatus = (id, status) => {
  const itemtoChange = JSON.parse(localStorage.getItem(id)); // we get the item we need to change from the local storage by the id
  itemtoChange.status = status; // we access the status attribute then give it our target value from the change.
  localStorage.setItem(id, JSON.stringify(itemtoChange)); //we push the updated element back to local storage.
  console.log(id, "status changed to: ", status);
  makeForageCard();
};

export const deleteItem = (id) => {
  const itemtoDelete = JSON.parse(localStorage.getItem(id));
  window.alert(`Deleting  ${itemtoDelete.name}`);
  localStorage.removeItem(id);
  makeForageCard();
};

export const updateForm = (id) => {
  renderUpdateForm(id);
};

export const cancelUpd = () => {
  const form = document.querySelector("#foraging-form");
  form.reset();
  delete form.dataset.editId;

  document.querySelector("#add-btn").hidden = false;
  document.querySelector("#update-btn").hidden = true;
  document.querySelector("#cancel-btn").hidden = true;
};

export const wireListeners = () => {
  //define the function for the listener
  const targetElement = document.querySelector("#foragingList");
  const formTarget = document.querySelector("#foraging-form"); // store the target element in a local variable so we can do stuff with it
  //we attach the event listener to the target element, right now it points to the foraging list
  targetElement.addEventListener("change", (e) => {
    if (!e.target.matches(".status")) return; //we do this check to further specify that within foraging list we are only concerned with changes happening in the element within it that has .status class
    changeStatus(e.target.dataset.id, e.target.value); //we pass in the element with the specific id by accessing the id through the event.targetelement.customdataattributeprefix.id, and the event.Targetelement.value
  });

  targetElement.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".deleter");
    if (!deleteBtn) return;
    deleteItem(deleteBtn.dataset.id);
  });

  targetElement.addEventListener("click", (e) => {
    const updateBtn = e.target.closest(".updater");
    if (!updateBtn) return;
    updateForm(updateBtn.dataset.id);
  });

  formTarget.addEventListener("click", (e) => {
    const formCnlBtn = e.target.closest("#cancel-btn");
    if (!formCnlBtn) return;
    cancelUpd();
  });
};
