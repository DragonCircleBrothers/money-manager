const $calendarContainer = document.querySelector(
  ".calendar-container"
) as HTMLElement;
const $consumptionContainer = document.querySelector(
  ".consumption-container"
) as HTMLElement;

const detailPopup = (): void => {
  $calendarContainer.onclick = (e: MouseEvent) => {
    // const a = e.target as HTMLElement;
    // console.log((e.target as HTMLElement).classList.contains("calendar-sell"));
    if (!(e.target as HTMLElement).classList.contains("calendar-sell")) return;
    ($consumptionContainer as HTMLElement).classList.toggle("hidden");
  };
};

export default detailPopup;
