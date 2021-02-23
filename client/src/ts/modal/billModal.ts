const $main = document.querySelector(".main") as HTMLElement;

const billModal = (() => {
  // const $billModal = document.createElement("div");
  const $modal = document.querySelector(".modal") as HTMLElement;
  const $billModal = document.querySelector(".bill-modal") as HTMLElement;
  const $addModal = document.querySelector(".add-modal") as HTMLElement;
  const $overlay = document.querySelector(".overlay") as HTMLElement;

  const close = () => {
    $modal.style.display = "none";
    $overlay.style.display = "none";
    $billModal.style.display = "none";
    $addModal.style.display = "block";
  };

  return {
    billModalRender() {
      $modal.style.display = "block";
      $billModal.style.display = "block";
      $overlay.style.display = "block";
      $addModal.style.display = "none";

      // const $date = document.querySelector(".bill-modal__date") as HTMLElement;
      // $date.textContent = date;
    },
    eventHandler() {
      $billModal.onclick = (e: MouseEvent) => {
        if ((e.target as HTMLElement).classList.contains("bill-modal__closed"))
          close();
        // if ((e.target as HTMLElement).classList.contains("btn__income")) incomeModalRender(2000);
      };
    },
  };
})();

export default billModal;
