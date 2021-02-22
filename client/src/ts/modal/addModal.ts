const $main = document.querySelector(".main") as HTMLElement;

const addModal = (() => {
  const $addModal = document.createElement("div");
  const $overlay = document.createElement("div");

  $addModal.classList.add("add-modal");
  $overlay.classList.add("overlay");

  return {
    addModalRender(date: string) {
      $overlay.style.display = "block";
      $addModal.innerHTML = `
        <time class="add-modal__date">${date}</time>
        <p class="add-modal__content">
          <span class="content__unit fas fa-won-sign"></span>
          <input type="text" class="content__price" placeholder="0">
        </p>
        <div class="add-modal__btn">
          <button class="btn__income">입금</button>
          <button class="btn__outcome">지출</button>
        </div>
        <button class="add-modal__closed fas fa-times" aria-label="close"></button>
      `;

      $main.append($overlay, $addModal);
    },
    eventHandler() {
      const $closeBtn = document.querySelector(
        ".add-modal__closed"
      ) as HTMLElement;

      $closeBtn.onclick = () => {
        $addModal.remove();
        $overlay.remove();
      };
    },
  };
})();

export default addModal;
