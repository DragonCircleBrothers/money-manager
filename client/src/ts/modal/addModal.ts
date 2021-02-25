import postAccounts from "../calendar/postAccount";
import { AccountItem } from "../type";

const addModal = (() => {
  const $overlay = document.querySelector(".overlay") as HTMLElement;
  const $modal = document.querySelector(".modal") as HTMLElement;
  const $addModal = document.querySelector(".add-modal") as HTMLElement;
  const $incomeModal = document.querySelector(".income-modal") as HTMLElement;
  const $outcomeModal = document.querySelector(".outcome-modal") as HTMLElement;
  const $paymentModal = document.querySelector(".payment-modal") as HTMLElement;
  const $amount = document.querySelector(".content__price") as HTMLInputElement;
  const $incomeInput = document.querySelector(
    ".income-modal__content"
  ) as HTMLInputElement;
  const $outcomeInput = document.querySelector(
    ".outcome-modal__content"
  ) as HTMLInputElement;

  const account = {} as AccountItem;

  const close = ($currentModal: HTMLElement) => {
    $addModal.style.display = "block";
    $amount.value = "";
    $incomeInput.value = "";
    $outcomeInput.value = "";
    if ($currentModal !== $addModal) $currentModal.style.display = "none";
    $overlay.style.display = "none";
    $modal.style.display = "none";
  };

  const back = ($currentModal: HTMLElement, $prevModal: HTMLElement) => {
    $currentModal.style.display = "none";
    $prevModal.style.display = "block";
  };

  const incomeModalRender = (price: number) => {
    $addModal.style.display = "none";
    $incomeModal.style.display = "block";

    const $incomePrice = document.querySelector(
      ".income-modal__price > .price__original"
    ) as HTMLElement;

    $incomePrice.textContent = price + "";
    account.amount = price;

    $incomeModal.onclick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.classList.contains("income-modal__back"))
        back($incomeModal, $addModal);
      if (target.classList.contains("btn-close")) close($incomeModal);
    };

    const $category = document.querySelector(
      ".income-modal__category"
    ) as HTMLElement;

    $category.onchange = (e: Event) => {
      const target = e.target as HTMLElement;

      const $incomeContent = document.querySelector(
        ".income-modal__content"
      ) as HTMLInputElement;

      account.content = $incomeContent.value;
      account.category = target.id;

      close($incomeModal);
      postAccounts(account);
    };
  };

  const outcomeModalRender = (price: number) => {
    $addModal.style.display = "none";
    $outcomeModal.style.display = "block";

    const $outcomePrice = document.querySelector(
      ".outcome-modal__price > .price__original"
    ) as HTMLElement;

    $outcomePrice.textContent = price + "";
    account.amount = -price;

    $outcomeModal.onclick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("outcome-modal__back"))
        back($outcomeModal, $addModal);
      if (target.classList.contains("btn-close")) close($outcomeModal);
    };

    const $category = document.querySelector(
      ".outcome-modal__category"
    ) as HTMLElement;

    $category.onchange = (e: Event) => {
      const target = e.target as HTMLElement;

      const $outcomeContent = document.querySelector(
        ".outcome-modal__content"
      ) as HTMLInputElement;

      account.content = $outcomeContent.value;
      account.category = target.id;
      paymentModalRedner($outcomeModal);
    };
  };

  const paymentModalRedner = ($currentModal: HTMLElement) => {
    const $category = document.querySelector(
      ".payment-modal__category"
    ) as HTMLElement;

    $currentModal.style.display = "none";
    $paymentModal.style.display = "block";

    $paymentModal.onclick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      account.payment = target.id;

      if (target.classList.contains("payment-modal__back"))
        back(
          $paymentModal,
          account.type === "income" ? $incomeModal : $outcomeModal
        );
      if (target.classList.contains("btn-close")) close($paymentModal);
    };

    $category.onchange = () => {
      close($paymentModal);
      postAccounts(account);
    };
  };

  return {
    addModalRender(date: string) {
      $modal.style.display = "block";
      $overlay.style.display = "block";

      const $date = document.querySelector(".add-modal__date") as HTMLElement;
      $date.textContent = date;

      account.date = date;

      $addModal.onclick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;

        if (target.classList.contains("add-modal__closed")) {
          close($addModal);
        }

        if (
          target.classList.contains("btn__income") &&
          $amount.value &&
          /^[0-9]*$/.test($amount.value)
        ) {
          account.type = "income";
          incomeModalRender(+$amount.value);
        }

        if (
          target.classList.contains("btn__outcome") &&
          $amount.value &&
          /^[0-9]*$/.test($amount.value)
        ) {
          account.type = "outcome";
          outcomeModalRender(+$amount.value);
        }
      };
    },
  };
})();

export default addModal;
