import { AccessItemShape } from "types/access-type";

export const ACCESS_CONFIG: AccessItemShape[] = [
  {
    label: "واسط سازمان ها",
    name: "transfer",
    value: [
      {
        label: "سال",
        name: "year",
        value: [
          {
            label: "1400",
            name: 32,
          },
          {
            label: "1401",
            name: 33,
          },
        ],
      },
      {
        label: "year",
        name: "year2",
        value: [
          {
            label: "1400",
            name: 32,
          },
          {
            label: "1401",
            name: 33,
          },
        ],
      },
    ],
  },
  {
    label: "واسط سازمان ها",
    name: "transfer2",
    value: [
      {
        label: "year",
        name: "year2",
        value: [
          {
            label: "1400",
            name: 32,
          },
          {
            label: "1401",
            name: 33,
          },
        ],
      },
      {
        label: "year",
        name: "year3",
        value: [
          {
            label: "1400",
            name: 32,
          },
          {
            label: "1401",
            name: 33,
          },
        ],
      },
    ],
  },
];
