import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
export const deliveryShedule = [
  {
    id: 1,
    deliveryDays: 7,
    chergeInCents: 0,
  },
  {
    id: 2,
    deliveryDays: 3,
    chergeInCents: 499,
  },
  {
    id: 3,
    deliveryDays: 1,
    chergeInCents: 999,
  },
];
export function deliveryDay(aftrxday) {
  const deliveryDate = dayjs().add(aftrxday, "day");

  const dayStr = deliveryDate.format("dddd, MMMM DD");
  return dayStr;
}
