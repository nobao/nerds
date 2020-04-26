// всплытие окна "Напишите нам"
let openBtn = document.querySelector(".js-open-btn"),
    modalLayout = document.querySelector(".modal-layout"),
    modalOverlay = document.querySelector(".modal-overlay"),
    writeUsModal = modalLayout.querySelector(".write-us"),
    writeUsForm = modalLayout.querySelector(".write-us-form"),
    userNameField = writeUsForm.querySelector("#user-name"),
    userEmailField = writeUsForm.querySelector("#user-email"),
    userMessageField = writeUsForm.querySelector("#user-message"),
    closeBtn = modalLayout.querySelector(".js-close-btn");

let isStorageSupport = true,
    storageName = "",
    storageEmail = "";

try {
    storageName = localStorage.getItem("name");
    storageEmail = localStorage.getItem("email");
} catch(err) {
    isStorageSupport = false;
}

openBtn.addEventListener("click", openModalWindow);

closeBtn.addEventListener("click", closeModalWindow);
writeUsModal.addEventListener("click", function(evt) {
    evt.stopPropagation();
});
modalOverlay.addEventListener("click", closeModalWindow);
window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 27) {
        closeModalWindow(evt);
    }
});

writeUsForm.addEventListener("submit", submitFormCheck);

function openModalWindow(evt) {
    evt.preventDefault();
    modalLayout.classList.remove("hide-item");
    writeUsModal.classList.add("show-modal");
    if (storageName) {
        userNameField.value = storageName;
        userEmailField.focus();
    }
    if (storageName && storageEmail) {
        userEmailField.value = storageEmail;
        userMessageField.focus();
    }
    if (!storageName && !storageEmail) {
        userNameField.focus();
    }
}

function closeModalWindow(evt) {
    evt.preventDefault();
    writeUsModal.classList.remove("show-modal");
    writeUsModal.classList.remove("error-animation");
    modalLayout.classList.add("hide-item");
}

function submitFormCheck(evt) {
    if (!userNameField.value || !userEmailField.value) {
        evt.preventDefault();
        writeUsModal.classList.remove("error-animation");
        writeUsModal.offsetWidth = writeUsModal.offsetWidth;
        writeUsModal.classList.add("error-animation");
    } else {
        if (isStorageSupport) {
            storageName = localStorage.setItem("name", userNameField.value);
            storageEmail = localStorage.setItem("email", userEmailField.value);
        }        
    }
}

// оживление слайдера
let sliderItem = document.querySelectorAll(".slider-item"),
    dot = document.querySelectorAll(".dot");

dot.forEach(function(elem, i) {
    dot[i].addEventListener("click", function(evt) {
        evt.preventDefault();
        dot.forEach(function(elem, y) {
            dot[y].classList.remove("active");
        });
        dot[i].classList.add("active");
        sliderItem.forEach(function(elem, y) {
            sliderItem[y].classList.remove("hide-item");
            sliderItem[y].classList.add("hide-item");
        });
        sliderItem[i].classList.remove("hide-item");
    });
})