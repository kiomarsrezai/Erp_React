import { setLocale } from "yup";

setLocale({
  mixed: {
    required: "این فیلد ضروری است.",
    notType: ({ type }) =>
      `این فیلد باید ${type === "number" ? "عدد" : ""} باشد`,
  },
  //   number: {
  //   },
  //   string: {
  //     url: "این فیلد باید لینک باشد.",
  //   },
});
