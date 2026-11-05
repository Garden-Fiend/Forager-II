export const makeForageCard = () => {
  //get the target parent element where you will render the card
  const list = document.querySelector("#foragingList"); // this attaches the parent element to list so we can mess with it
  const values = Object.values(localStorage).map((f) => JSON.parse(f));

  //we clear the current value on the parent element
  list.innerHTML = "";

  //safeguards in case we don't have anything on the storage
  if (values.length === 0) {
    list.textContent = "Go Forage some things my dude";
    return;
  }

  values.forEach((v) => {
    //we prepare the div template that's currenlty blank
    const fCard = document.createElement("div");
    fCard.className = "items-center gap-2";

    //we define the actual element here, ts so weird there's like two wrappers
    fCard.innerHTML = `
        
          <div class="pl-2 pr-1  border-2">
            <div class="border-b-2 flex place-content-between">
              <div class="flex gap-2 text-md">
                <p>Name:</p>
                <p data-field="name"></p>
              </div>
              <div class="p-3">
                <select class="status" data-id="${v.id}">
                  <option value="foraged">Foraged</option>
                  <option value="finding">Finding</option>
                  <option value="lost">Lost</option>
                </select>
              </div>
            </div>

            <div class="flex place-content-between">
              <div class="flex gap-2 text-md">
                <p>Artist:</p>
                <p data-field="artist"></p>
              </div>
              <div class="flex gap-1">
                <div class="flex">
                  <p>[#]:</p>
                  <p data-field="trackcount"></p>
                </div>

                <div class="flex">
                  <p>[O]:</p>
                  <p data-field="discovered"></p>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-2 py-2">
            <button class="deleter" data-id="${v.id}" >DEL</button>
            <button class="updater" data-id="${v.id}">UPD</button>
          </div>
        
        `;

    fCard.querySelector('[data-field="name"]').textContent = v.name;
    fCard.querySelector('[data-field="artist"]').textContent = v.artist;
    fCard.querySelector('[data-field="trackcount"]').textContent = v.trackcount;
    fCard.querySelector('[data-field="discovered"]').textContent = v.discovered;
    fCard.querySelector(".status").value = v.status;

    list.appendChild(fCard);
  });
};

export const renderUpdateForm = (id) => {

  const item = JSON.parse(localStorage.getItem(id));
  const form = document.querySelector("#foraging-form");

  form.dataset.editId = id;

  form.querySelector("#name").value = item.name;
  form.querySelector("#artist").value = item.artist;
  form.querySelector("#type").value = "Album";
  form.querySelector("#track-count").value = item.trackcount;
  form.querySelector("#discovered").value = item.discovered;

  // entering edit mode
  document.querySelector("#add-btn").hidden = true;
  document.querySelector("#update-btn").hidden = false;
  document.querySelector("#cancel-btn").hidden = false;
};
