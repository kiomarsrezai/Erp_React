import moment from "jalali-moment";

export const convertToJalaliDate = (date: string, full: boolean = false) => {
  const format = full ? "YYYY/MM/DD HH:mm:ss" : "YYYY/MM/DD";
  return moment.from(date, "en").locale("fa").format(format);
};

export const convertToCalenderDate = (date: string) => {
  if (date === null) {
    return new Date();
  }

  let format = date.split(" ");
  if (format.length > 1) {
    return format[0].split("/").reverse().join("-");
  }

  return date;
};

export const dateCrossedMonth = (
  date: string | null,
  month: number | string | null
) => {
  if (!date || !month) return false;

  const convertedMonth = Number(
    moment
      .from(date.split("/").reverse().join("/"), "en")
      .locale("fa")
      .format("MM")
  );

  // const convertedYear = Number(
  //   moment
  //     .from(date.split("/").reverse().join("/"), "en")
  //     .locale("fa")
  //     .format("YYYY")
  // );
  return convertedMonth > Number(month);
};
