import state from "../globalState";
import getAccounts from "../getAccounts";

const billModal = (() => {
  // const $billModal = document.createElement("div");
  const $modal = document.querySelector(".modal") as HTMLElement;
  const $billModal = document.querySelector(".bill-modal") as HTMLElement;
  const $addModal = document.querySelector(".add-modal") as HTMLElement;
  const $overlay = document.querySelector(".overlay") as HTMLElement;

  const billModalDetail = () => {
    const $billPrice = (document.getElementById("price") as HTMLInputElement)
      .value;
    const $billContent = (document.getElementById(
      "content"
    ) as HTMLInputElement).value;
    const $billPayment = (document.getElementById(
      "payment"
    ) as HTMLInputElement).value;
  };

  const close = () => {
    $modal.style.display = "none";
    $overlay.style.display = "none";
    $billModal.style.display = "none";
    $addModal.style.display = "block";
  };

  const remove = () => {
    // id 값 받아서 filter 돌리면 될 듯
    const $consumptionDetailList = document.querySelector(
      ".consumption-detail__list"
    ) as HTMLElement;
    $consumptionDetailList.remove();
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

      const $date = document.querySelector(".bill-modal__date") as HTMLElement;
      const date = state.currentDate.toISOString().slice(0, 10);

      $date.textContent = date;

      billModalDetail();
    },
    eventHandler() {
      $billModal.onclick = (e: MouseEvent) => {
        if (
          (e.target as HTMLElement).classList.contains("bill-modal__closed")
        ) {
          close();
        } else if (
          (e.target as HTMLElement).classList.contains("bill-modal__deleted")
        ) {
          remove();
        }
      };
    },
  };
})();

export default billModal;
