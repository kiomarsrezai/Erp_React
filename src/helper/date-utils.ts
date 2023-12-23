import * as moment2 from "jalali-moment";
import moment from "moment";

export const convertToJalaliDate = (date: string, full: boolean = false) => {
  const format = full ? "YYYY/MM/DD HH:mm:ss" : "YYYY/MM/DD";
  return moment2.from(date, "en").locale("fa").format(format);
};

export const convertToCalenderDate = (date: string | null) => {
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
    moment2
      .from(date.split("/").reverse().join("/"), "en")
      .locale("fa")
      .format("MM")
  );

  // const convertedYear = Number(
  //   moment2
  //     .from(date.split("/").reverse().join("/"), "en")
  //     .locale("fa")
  //     .format("YYYY")
  // );
  return convertedMonth > Number(month);
};


export const numberOfDaysPassedSinceJalaliDate = (date: string) => {
  const CurrentDate = moment().format('YYYY/MM/DD');
  const requestDateParts = moment2.from(date, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD');
  var start = moment(requestDateParts, "YYYY-MM-DD");
  var end = moment(CurrentDate, "YYYY-MM-DD");
  return Math.round(moment.duration(end.diff(start)).asDays());
}
