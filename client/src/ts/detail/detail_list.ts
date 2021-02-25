import getAccounts from "../AccountCRUD/getAccounts";
import globalState from "../globalState";
import { Accounts } from "../type";
import billModalRender from "../modal/billModal";

const $main = document.querySelector(".main") as HTMLElement;
const $consumptionContainer = document.createElement("div");
const $consumptionDetailList = document.createElement("ul");

$consumptionContainer.classList.add("consumption-container");
$consumptionDetailList.classList.add("consumption-detail__list");

const renderDetailList = async (): Promise<void> => {
  const res = await getAccounts();

  const listData = res.filter(({ date }: { date: string }) => {
    return date.includes(globalState.currentDate.toISOString().slice(0, 10));
  });

  if (listData.length === 0) {
    $consumptionDetailList.innerHTML = `<li style="display: block; font-weight: bold; text-align: center;">
    ${globalState.currentDate
      .toISOString()
      .slice(0, 10)} 수입 및 지출이 없습니다.
</li>`;
  } else {
    $consumptionDetailList.innerHTML = listData
      .map(
        ({ _id, amount, type, content, category }: Accounts) => `<li id=${_id}>
            <span class="consumption-detail__list__category">${category}</span>
            <span class="consumption-detail__list__content">${content}</span>
            <span class="consumption-detail__list__payment">${
              type === "outcome" ? "지출" : "수입"
            }</span>
            <span class="consumption-detail__list__amount">${amount}</span>
        </li>`
      )
      .join("");
  }

  $consumptionContainer.appendChild($consumptionDetailList);
  $main.appendChild($consumptionContainer);
};

$consumptionContainer.addEventListener("click", (e: MouseEvent) => {
  let target = e.target as HTMLElement;

  if (target.nodeName === "SPAN") {
    target = target.parentNode as HTMLElement;
  }

  billModalRender(target.id);
});

export default renderDetailList;
