import removeAccount from "../AccountCRUD/removeAccount";
import putAccount from "../AccountCRUD/putAccount";
import getAccounts from "../AccountCRUD/getAccounts";
import globalState from "../globalState";
import formattedDate from "../utils/formattedDate";

const $modal = document.querySelector(".modal") as HTMLElement;
const $billModal = document.querySelector(".bill-modal") as HTMLElement;
const $overlay = document.querySelector(".overlay") as HTMLElement;
const $addModal = document.querySelector(".add-modal") as HTMLElement;

const $billPrice = document.getElementById("price") as HTMLInputElement;
const $billContent = document.getElementById("content") as HTMLInputElement;
const $billPayment = document.getElementById("payment") as HTMLInputElement;
const $deleteBtn = document.querySelector(
  ".bill-modal__deleted"
) as HTMLElement;
const $editBtn = document.querySelector(".bill-modal__modified") as HTMLElement;

async function billModalRender(id: string): Promise<void> {
  $modal.style.display = "block";
  $billModal.style.display = "block";
  $overlay.style.display = "block";
  $addModal.style.display = "none";

  const $date = document.querySelector(".bill-modal__date") as HTMLElement;
  $date.textContent = formattedDate(globalState.currentDate);

  const res = await getAccounts();

  const billModalData = res.filter(({ _id }: { _id: string }) => {
    return _id.includes(id);
  });

  $billPrice.value = billModalData[0].amount + "";
  $billContent.value = billModalData[0].content;
  $billPayment.value =
    billModalData[0].payment !== undefined ? billModalData[0].payment : "수입";
  $deleteBtn.setAttribute("id", id);
  $editBtn.setAttribute("id", id);
}

const close = (): void => {
  $modal.style.display = "none";
  $overlay.style.display = "none";
  $billModal.style.display = "none";
  $addModal.style.display = "block";

  $editBtn.className = "bill-modal__modified fas fa-edit";
};

$billModal.onclick = async (e: MouseEvent) => {
  const $editBtn = document.querySelector(
    ".bill-modal__modified"
  ) as HTMLElement;

  $editBtn.className = "bill-modal__modified fas fa-check";

  if ((e.target as HTMLElement).classList.contains("bill-modal__closed")) {
    close();
  } else if (
    (e.target as HTMLElement).classList.contains("bill-modal__deleted")
  ) {
    removeAccount($deleteBtn.id);
    close();
  } else if (
    (e.target as HTMLElement).classList.contains("bill-modal__modified")
  ) {
    const res = await getAccounts();
    const billModalData: {
      date: string;
      amount: number;
      category: string;
      content: string;
      payment: string;
      type: string;
      _id?: string;
    } = res.filter(({ _id }: { _id: string }) => {
      return _id.includes($deleteBtn.id);
    })[0];

    billModalData.amount = +$billPrice.value;
    billModalData.content = $billContent.value;
    billModalData.payment = $billPayment.value;
    delete billModalData._id;

    putAccount($deleteBtn.id, billModalData);
    close();
  }
};

export default billModalRender;
