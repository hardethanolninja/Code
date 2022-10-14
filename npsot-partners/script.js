const partnerArr = [
  {
    name: "Partner Example One",
    location: "Location One, USA",
    link: "https://example.site",
    imageURL: "https://picsum.photos/300",
    partnerInfo:
      "This is the info for the first site.  The description is short.",
  },
  {
    name: "Partner Example Two",
    location: "Location Two, USA",
    link: "https://example.site",
    imageURL: "https://picsum.photos/300",
    partnerInfo:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et lacus auctor, convallis nulla at, fringilla mi. Sed facilisis ante eros, et venenatis mauris porttitor eu. Nullam eget viverra ipsum. Nulla facilisi. Sed vulputate nisl in ultrices consectetur. Vestibulum ullamcorper hendrerit odio, sed dapibus nunc porttitor eu. Aenean in leo vel tellus pretium dictum ac a diam. Nullam at enim vulputate, luctus orci sit amet, elementum ligula. Donec vitae ultrices orci. Vivamus gravida nec arcu nec mattis.",
  },
  {
    name: "Partner Example Three",
    location: "Location Three, USA",
    link: "https://example.site",
    imageURL: "https://picsum.photos/300",
    partnerInfo:
      "This info is going to be longer than parter one but much much shorter than parter two.  Just checking to see if all lengths look good.",
  },
];

const partnerContainer = document.querySelector(".npsot-partners-container");

const modalWindowOverlay = document.querySelector(
  "#npsot-partners-modal-overlay"
);

const modalContent = document.querySelector("#npsot-partners-modal");

const showModal = (e) => {
  const modal = document.createElement("div");
  modal.classList.add("npsot-partners-modal");
  modal.innerHTML = `      
  <div class="npsot-partners-modal-title">${e.target.dataset.name}</div>
  <div class="npsot-partners-modal-container">
    <img src="${e.target.dataset.pic}" height="150" width="150" />
    <p class="npsot-partners-modal-text">${e.target.dataset.info}</p>
  </div>
  <a href="${e.target.dataset.link}" target="_blank" class="npsot-partners-modal-link">Visit ${e.target.dataset.name}</a>
  <i
    onclick="hideModal()"
    class="fa-solid fa-rectangle-xmark modal-closebutton"
  ></i>`;

  modalWindowOverlay.appendChild(modal);

  modalWindowOverlay.style.display = "flex";
};

const hideModal = () => {
  modalWindowOverlay.style.display = "none";
  document.querySelector(".npsot-partners-modal").remove();
};

const hideModalWindowOnBlur = (e) => {
  if (e.target === e.currentTarget) {
    hideModal();
  }
};

modalWindowOverlay.addEventListener("click", hideModalWindowOnBlur);

document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    hideModal();
  }
});

const partnerLoop = (arr) => {
  //loop through partners and add to partnerContainer
  arr.forEach((ele) => {
    //define partner card layout & get info from array
    const partnerCard = `      
  <div class="npsot-partner-card">
  <div class="npsot-parter-card-img">
    <img src="${ele.imageURL}" alt="${ele.name} Logo" width="300" height="300" />
  </div>
  <div class="npsot-partner-card-text">
    <p class="npsot-partner-card-name" data-name="${ele.name}" data-info="${ele.partnerInfo}" data-link="${ele.link}" data-pic="${ele.imageURL}">${ele.name}</p>
    <p class="npsot-partner-card-location">${ele.location}</p>
  </div>
  </div>`;

    partnerContainer.innerHTML += partnerCard;
  });
};

partnerLoop(partnerArr);

const partnerLinks = document.querySelectorAll(".npsot-partner-card-name");

partnerLinks.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    console.log(e.target.dataset.name);
    showModal(e);
  });
});
