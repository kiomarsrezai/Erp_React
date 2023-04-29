import { setLocale } from "yup";

setLocale({
  mixed: {
    required: "این فیلد ضروری است.",
    notType: ({ type }) =>
      `این فیلد باید ${type === "number" ? "عدد" : ""} باشد`,
  },
  //   number: {
  //   },
  string: {
    min: ({ min }) => `این فیلد حداقل باید ${min} کاراکتر باشد`,
  },
});
