const $main = document.querySelector(".main") as HTMLElement;

const addModal = (() => {
  const $overlay = document.querySelector(".overlay") as HTMLElement;
  const $modal = document.querySelector(".modal") as HTMLElement;
  const $addModal = document.querySelector(".add-modal") as HTMLElement;
  const $incomeModal = document.querySelector(".income-modal") as HTMLElement;
  const $paymentModal = document.querySelector(".payment-modal") as HTMLElement;

  const close = () => {
    $overlay.style.display = "none";
    $modal.style.display = "none";
  };

  const incomeModalRender = (price: number) => {
    $addModal.style.display = "none";
    $incomeModal.style.display = "block";

    const $price = document.querySelector(".price__original") as HTMLElement;
    $price.textContent = price + "";
  };

  return {
    addModalRender(date: string) {
      $modal.style.display = "block";
      $overlay.style.display = "block";

      const $date = document.querySelector(".add-modal__date") as HTMLElement;
      $date.textContent = date;
    },
    // outcomeModalRender() {},
    // paymentModalRedner() {},
    eventHandler() {
      $addModal.onclick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains("add-modal__closed")) close();
        if (target.classList.contains("btn__income")) incomeModalRender(2000);
        // if (target.classList.contains("btn__outcome"))
      };
    },
  };
})();

export default addModal;
