import axios from "axios";
import billModal from "../modal/billModal";
import getAccounts from "../getAccounts";
import globalState from "../globalState";

const $main = document.querySelector(".main") as HTMLElement;

const renderDetailList = async () => {
  const res = await getAccounts();
  console.log(globalState.currentDate.toISOString().slice(0, 10));

  const listData = res.filter(({ date }: { date: string }) => {
    date === globalState.currentDate.toISOString().slice(0, 10);
  });
  console.log(listData);

  const $consumptionCont = document.createElement("div");
  const $consumptionDetailList = document.createElement("ul");

  const $calendarContainer = document.querySelector(
    ".calendar-container"
  ) as HTMLElement;

  const $calendarCell = document.querySelector(".calendar-cell") as HTMLElement;

  $consumptionCont.classList.add("consumption-container");
  $consumptionDetailList.classList.add("consumption-detail__list");

  $calendarContainer.addEventListener("click", (e: MouseEvent) => {
    if ($calendarCell) {
      $consumptionDetailList.innerHTML = `
    <li>
      <label for="categorybadge">
        <div>
        <input id="categorybadge" class="fas fa-utensils fa-2x" type="radio" disabled>
        <span class="">교통비</span>
        </div>
        <span class="">저녁</span>
        <span>25000원</span>
      </label>
    </li>
    <li>
      <label for="categorybadge">
        <div>
        <input id="categorybadge" class="fas fa-utensils fa-2x" type="radio" disabled>
        <span class="">교통비</span>
        </div>
        <span class="">저녁</span>
        <span>25000원</span>
      </label>
    </li>
    <li>
      <label for="categorybadge">
        <div>
        <input id="categorybadge" class="fas fa-utensils fa-2x" type="radio" disabled>
        <span class="">교통비</span>
        </div>
        <span class="">저녁</span>
        <span>25000원</span>
      </label>
    </li>
    <li>
      <label for="categorybadge">
        <div>
        <input id="categorybadge" class="fas fa-utensils fa-2x" type="radio" disabled>
        <span class="">교통비</span>
        </div>
        <span class="">저녁</span>
        <span>25000원</span>
      </label>
    </li>
  `;
    }
    $consumptionCont.appendChild($consumptionDetailList);
    $main.appendChild($consumptionCont);
  });

  $consumptionCont.addEventListener("click", (e: MouseEvent) => {
    if (e.target === $consumptionDetailList) return;
    // const $selected = document.querySelector(".selected") as HTMLElement;
    // const target = e.target as HTMLElement;
    // const selectedDate = target.dataset.date + "";
    // currentDate = new Date(selectedDate);
    // console.log(currentDate);

    billModal.billModalRender();
    billModal.eventHandler();
  });
};

export default renderDetailList;
