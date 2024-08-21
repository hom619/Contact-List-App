const apiUrl = "https://randomuser.me/api?results=4";
let users = [];
const sliderElm = document.getElementById("unlockSlider");
sliderElm.addEventListener("change", (e) => {
  const { value } = e.target; //This is destructuring the value received from the slider range
  const label = document.getElementById("label");
  if (value > 80) {
    label.textContent = "";
    displayScreen();
  } else {
    label.textContent = "Slide to Unlock";
  }
});

const displayScreen = () => {
  document.querySelector(".homeScreen").style.display = "none"; //hide homescreen
  document.querySelector(".appScreen").style.display = "block"; //show app screen
  //hide the spinner
};

//fetch user data from api
const fetchRandomUsers = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  users = data.results;
  document.querySelector(".spinner").style.display = "none";
  displayContacts(users);
};

fetchRandomUsers(apiUrl);

displayContacts = (users) => {
  document.getElementById("list").style.display = "block";
  let str = "";
  users.map((item, i) => {
    str += `<div class="accordion-item">
                  <h2 class="accordion-header" id="headingThree">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse${i}"
                      aria-expanded="false"
                      aria-controls="collapse${i}"
                    >
                      <img
                        src="${item.picture.large}"
                        alt=""
                        width="50px"
                        class="rounded-circle"
                      />
                      <div class="ms-2">
                        <div class="fw-bolder">${item.name.title} ${item.name.first} ${item.name.last}</div>
                        <small>${item.location.street.number} ${item.location.street.name}</small>
                      </div>
                    </button>
                  </h2>
                  <div
                    id="collapse${i}"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div
                      class="accordion-body d-flex flex-column align-items-center"
                    >
                      <img
                        src="${item.picture.large}"
                        width="150px"
                        class="rounded-circle"
                      />
                      <div>
                        <div class="fw-bolder">
                          <i class="bi bi-person-circle"></i>
                          ${item.name.title} ${item.name.first} ${item.name.last}
                        </div>
                        <div class="fw-bolder">
                          <a href="tel:${item.cell}">
                            <i class="bi bi-telephone"></i>
                            ${item.cell}
                          </a>
                        </div>
                        <div>
                          <a href="mailto:${item.email}"
                            ><i class="bi bi-envelope-at-fill"></i>
                            ${item.email}</a
                          >
                        </div>
                        <div>
                          <a
                            href="https://www.google.com/maps/place/${item.location.street.number}+${item.location.street.name}+${item.location.city}+${item.location.state}+${item.location.country}"
                            target="_blank"
                          >
                            <i class="bi bi-globe"></i>
                            ${item.location.street.number} ${item.location.street.name}, ${item.location.state}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`;
  });

  document.getElementById("usersAccordion").innerHTML = str;
};
