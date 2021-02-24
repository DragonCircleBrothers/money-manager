import billModal from "../modal/billModal";

const $main = document.querySelector(".main") as HTMLElement;

const renderDetailList = () => {
  const $consumptionCont = document.createElement("div");
  // const $consumptionDetailList = document.createElement("ul");

  const $calendarContainer = document.querySelector(
    ".calendar-container"
  ) as HTMLElement;

  $consumptionCont.classList.add("consumption-container");

  $calendarContainer.addEventListener("click", (e: MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains("calendar-sell")) {
      $consumptionCont.innerHTML = `
    <ul class="consumption-detail__list">
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
    </ul>
  `;
    }
    $main.appendChild($consumptionCont);
  });

  $consumptionCont.addEventListener("click", (e: MouseEvent) => {
    if (document.querySelectorAll(".consumption-detail__list > li")) {
      // console.log((e.target as HTMLElement).dataset);

      billModal.billModalRender();
      billModal.eventHandler();
    }
  });
};

export default renderDetailList;
