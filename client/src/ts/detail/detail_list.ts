import axios from "axios";
import billModal from "../modal/billModal";
import getAccounts from "../getAccounts";
import globalState from "../globalState";

const $main = document.querySelector(".main") as HTMLElement;
const $consumptionCont = document.createElement("div");
const $consumptionDetailList = document.createElement("ul");

$consumptionCont.classList.add("consumption-container");
$consumptionDetailList.classList.add("consumption-detail__list");

const renderDetailList = async () => {
  const res = await getAccounts();

  const $calendarContainer = document.querySelector(
    ".calendar-container"
  ) as HTMLElement;

  const $calendarCell = document.querySelector(".calendar-cell") as HTMLElement;

  $calendarContainer.addEventListener("click", (e: MouseEvent) => {
    if ($calendarCell) {
      const listData = res.filter(({ date }: { date: string }) => {
        return date.includes(
          globalState.currentDate.toISOString().slice(0, 10)
        );
      });

      $consumptionDetailList.innerHTML = listData
        .map(
          ({
            id,
            amount,
            type,
            payment,
            content,
            category,
            date,
          }: {
            id: string;
            amount: number;
            type: string;
            payment: string;
            content: string;
            category: string;
            date: string;
          }) => `<li id=${id}>
        <label for="categorybadge">
          <span class="consumption-detail__list__category">${category}</span>
          <span class="consumption-detail__list__content">${content}</span>
          <span class="consumption-detail__list__payment">${
            type === "outcome" ? "지출" : "수입"
          }</span>
          <span class="consumption-detail__list__amount">${amount}</span>
        </label>
      </li>`
        )
        .join("");
    }

    $consumptionCont.appendChild($consumptionDetailList);
    $main.appendChild($consumptionCont);
  });

  $consumptionCont.addEventListener("click", (e: MouseEvent) => {
    if (e.target === $consumptionDetailList) return;
    if ((e.target as HTMLElement).parentNode) {
      const billdata = res.filter(({ id }: { id: string }) => {
        // return id.includes();
      });
    }

    billModal.billModalRender();
    billModal.eventHandler();
  });
};

export default renderDetailList;
