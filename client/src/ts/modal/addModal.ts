const $main = document.querySelector(".main") as HTMLElement;

const addModal = (() => {
  const $overlay = document.querySelector(".overlay") as HTMLElement;
  const $modal = document.querySelector(".modal") as HTMLElement;
  const $addModal = document.querySelector(".add-modal") as HTMLElement;
  const $incomeModal = document.querySelector(".income-modal") as HTMLElement;
  const $outcomeModal = document.querySelector(".outcome-modal") as HTMLElement;
  const $paymentModal = document.querySelector(".payment-modal") as HTMLElement;

  const close = () => {
    $overlay.style.display = "none";
    $modal.style.display = "none";
  };

  const incomeModalRender = (price: number) => {
    $addModal.style.display = "none";
    $incomeModal.style.display = "block";

    const $incomePrice = document.querySelector(
      "income-modal__price > .price__original"
    ) as HTMLElement;
    console.log($incomePrice);

    // $incomePrice.textContent = price + "";
  };

  const outcomeModalRender = (price: number) => {
    $addModal.style.display = "none";
    $outcomeModal.style.display = "block";

    const $outcomePrice = document.querySelector(
      ".outcome-modal__price > .price__original"
    ) as HTMLElement;
    $outcomePrice.textContent = price + "";
  };

  // const paymentModalRedner = () => {};

  return {
    addModalRender(date: string) {
      $modal.style.display = "block";
      $overlay.style.display = "block";

      const $date = document.querySelector(".add-modal__date") as HTMLElement;
      $date.textContent = date;
    },
    eventHandler() {
      $addModal.onclick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains("add-modal__closed")) close();
        if (target.classList.contains("btn__income")) incomeModalRender(2000);
        if (target.classList.contains("btn__outcome")) outcomeModalRender(2000);
      };

      $incomeModal.onclick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const $category = document.querySelector(".income-modal__category");
        if (target === $category) console.log("ddd");
      };
    },
  };
})();

export default addModal;
