import axios from "axios";
import getAccounts from "../getAccounts";
import globalState from "../globalState";

const $main = document.querySelector(".main") as HTMLElement;
const $consumptionCont = document.createElement("div");
const $consumptionDetailList = document.createElement("ul");
$consumptionCont.classList.add("consumption-container");
$consumptionDetailList.classList.add("consumption-detail__list");

// bill Modal 관련
const $modal = document.querySelector(".modal") as HTMLElement;
const $billModal = document.querySelector(".bill-modal") as HTMLElement;
const $addModal = document.querySelector(".add-modal") as HTMLElement;
const $overlay = document.querySelector(".overlay") as HTMLElement;

function billModalRender() {
  $modal.style.display = "block";
  $billModal.style.display = "block";
  $overlay.style.display = "block";
  $addModal.style.display = "none";

  const $date = document.querySelector(".bill-modal__date") as HTMLElement;
  const date = globalState.currentDate.toISOString().slice(0, 10);

  $date.textContent = date;
}

const close = () => {
  $modal.style.display = "none";
  $overlay.style.display = "none";
  $billModal.style.display = "none";
  $addModal.style.display = "block";
};

const removeList = (_id: string) => {
  console.log(_id);

  // id 값 받아서 filter 돌리면 될 듯
  axios.delete(`http://localhost:1111/api/account/${_id}`);
  $modal.style.display = "none";
  $overlay.style.display = "none";
  $billModal.style.display = "none";
  $addModal.style.display = "block";
};

const editList = () => {};

const renderDetailList = async (target: HTMLElement) => {
  const res = await getAccounts();

  const listData = res.filter(({ date }: { date: string }) => {
    return date.includes(globalState.currentDate.toISOString().slice(0, 10));
  });

  $consumptionDetailList.innerHTML = listData
    .map(
      ({
        _id,
        amount,
        type,
        payment,
        content,
        category,
        date,
      }: {
        _id: string;
        amount: number;
        type: string;
        payment: string;
        content: string;
        category: string;
        date: string;
      }) => `<li id=${_id}>
          <span class="consumption-detail__list__category">${category}</span>
          <span class="consumption-detail__list__content">${content}</span>
          <span class="consumption-detail__list__payment">${
            type === "outcome" ? "지출" : "수입"
          }</span>
          <span class="consumption-detail__list__amount">${amount}</span>
      </li>`
    )
    .join("");

  $consumptionCont.appendChild($consumptionDetailList);
  $main.appendChild($consumptionCont);

  const billModalDetail = (id: string) => {
    const $billPrice = document.getElementById("price") as HTMLInputElement;
    const $billContent = document.getElementById("content") as HTMLInputElement;
    const $billPayment = document.getElementById("payment") as HTMLInputElement;

    console.log($billPrice);

    const billModalData = res.filter(({ _id }: { _id: string }) => {
      return _id.includes(id);
    });

    $billPrice.value = billModalData[0].amount;
    $billContent.value = billModalData[0].content;
    $billPayment.value =
      billModalData[0].type === "income" ? "cash" : billModalData[0].payment;
  };

  $consumptionCont.addEventListener("click", (e: MouseEvent) => {
    let target = e.target as HTMLElement;

    if (target.nodeName === "SPAN") {
      target = target.parentNode as HTMLElement;
    }
    billModalDetail(target.id);
    billModalRender();
  });

  $billModal.onclick = (e: MouseEvent) => {
    console.log((e.target as HTMLElement).id);

    if ((e.target as HTMLElement).classList.contains("bill-modal__closed")) {
      close();
    } else if (
      (e.target as HTMLElement).classList.contains("bill-modal__deleted")
    ) {
      removeList((e.target as HTMLElement).id);
    } else if (
      (e.target as HTMLElement).classList.contains("bill-modal__modified")
    ) {
      editList();
    }
  };
};

export default renderDetailList;
