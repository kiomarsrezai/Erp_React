import moment from "jalali-moment";

export const convertToJalaliDate = (date: string, full: boolean = false) => {
  const format = full ? "YYYY/MM/DD HH:mm:ss" : "YYYY/MM/DD";
  return moment.from(date, "en").locale("fa").format(format);
};
