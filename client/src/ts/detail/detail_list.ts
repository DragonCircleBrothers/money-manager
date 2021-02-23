import billModal from "../modal/billModal";

const $main = document.querySelector(".main") as HTMLElement;

const renderdetailList = () => {
  const $consumptionCont = document.createElement("div");
  $consumptionCont.classList.add("consumption-container");
  $consumptionCont.innerHTML = `
  <ul class="consumption-detail-list">
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
            <span class="">식사</span>
            </div>
            <span class="">점심</span>
            <span>25000원</span>
          </label>
        </li>
        <li>
          <label for="categorybadge">
            <div> 
            <input id="categorybadge" class="fas fa-utensils fa-2x" type="radio" disabled>
            <span class="">식사</span>
            </div>
            <span class="">점심</span>
            <span>25000원</span>
          </label>
        </li>
      </ul>
  `;
  $main.appendChild($consumptionCont);

  // $main.onclick = (e: MouseEvent) => {
  //   billModal.billModalRender();
  // };
};

export default renderdetailList;
