const $paymentModalCategory = document.querySelector(
  ".payment-modal__category"
) as HTMLElement;

const $consumptionDetailList = document.querySelector(
  ".consumption-detail-list"
) as HTMLElement;

const detailListrender = () => {
  $consumptionDetailList.innerHTML += `<li>
    <label for="categorybadge">
      <input id="categorybadge" class="fas fa-utensils fa-2x" type="radio" disabled>
      <span class="">카드</span>
      <span>25000원</span>
      <input type="checkbox" class="delete-button">
    </label>
  </li>`;
};

const addDetaillist = () => {
  $paymentModalCategory.onclick = (e: MouseEvent) => {
    if (!(e.target as HTMLElement).classList.contains("category__content"))
      return;
    detailListrender();
  };
};

export default addDetaillist;

// <li>
//           <label for="categorybadge">
//             <input id="categorybadge" class="fas fa-utensils fa-2x" type="radio" disabled>
//             <span class="">카드</span>
//             <span>25000원</span>
//             <input type="checkbox" class="delete-button">
//           </label>
//         </li>
