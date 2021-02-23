const $main = document.querySelector(".main") as HTMLElement;

const billModal = (() => {
  const $billModal = document.createElement("div");

  $billModal.classList.add("bill-modal");

  return {
    billModalRender() {
      $billModal.style.display = "block";
      $billModal.innerHTML = `
      <header class="bill-modal__header">
        <h3>지출 영수증</h3>
      </header>

      <div class="input-container">
        <form action="" class="bill-modal__form">
          <time class="add-modal__date">2021/02/18</time>
          <div class="container-category">
            <label for="category">
              <input id="category" type="radio" class="far fa-credit-card fa-2x category__input" name="category" />
              <span>분류</span>
            </label>
          </div>

          <div class="container-price">
            <label for="price">금액</label>
            <input id="price" type="text" class="form__input" />
          </div>

          <div class="container-content">
            <label for="content">내역</label>
            <input id="content" type="text" class="form__input" />
          </div>

          <div class="container-payment">
            <label for="payment">지불</label>
            <input id="payment" type="text" class="form__input" />
          </div>

          <div class="form__button">
            <button class="bill-modal__modified fas fa-edit"></button>
          </div>
        </form>
      </div>
      <button class="bill-modal__closed fas fa-times" aria-label="close"></button>
      <button class="bill-modal__deleted fas fa-trash-alt" aria-label="close"></button>`;

      $main.append($billModal);
    },
    // eventHandler() {
    //   const $closeBtn = document.querySelector(
    //     ".bill-modal__closed"
    //   ) as HTMLElement;
    //   $closeBtn.onclick = () => {
    //     $billModal.style.display = "none";
    //   };
    // },
  };
})();

export default billModal;
