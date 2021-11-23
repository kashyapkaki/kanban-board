import { v4 as uuidv4 } from "uuid";

const taskLimitNumber = 10;

export const priorities = [
  { id: 0, value: "--Select--" },
  { id: 1, value: "High" },
  { id: 2, value: "Medium" },
  { id: 3, value: "Low" },
];

export const columnsRawData = [
  {
    id: 1,
    name: "Backlog",
    limit: taskLimitNumber,
    color: "#A162D8 ",
    taskIds: [
      {
        id: uuidv4(),
        text: "Status component",
        stageId: 1,
        priority: 1,
        deadline: "2021-11-25",
      },
      {
        id: uuidv4(),
        text: "New slides for presentation",
        stageId: 1,
        priority: 2,
        deadline: "2021-11-30",
      },
    ],
  },
  {
    id: 2,
    name: "To Do",
    limit: taskLimitNumber,
    color: "#5A9DF9",
    taskIds: [
      {
        id: uuidv4(),
        text: "Blog assets",
        stageId: 2,
        priority: 3,
        deadline: "2021-12-15",
      },
    ],
  },
  {
    id: 3,
    name: "Ongoing",
    limit: taskLimitNumber,
    color: "#FF5F6F",
    taskIds: [
      {
        id: uuidv4(),
        text: "Chrome extension design",
        stageId: 3,
        priority: 1,
        deadline: "2021-11-20",
      },
      {
        id: uuidv4(),
        text: "SEO",
        stageId: 3,
        priority: 3,
        deadline: "2021-11-22",
      },
    ],
  },
  {
    id: 4,
    name: "Done",
    limit: taskLimitNumber,
    color: "#1CC778",
    taskIds: [
      {
        id: uuidv4(),
        text: "UX",
        stageId: 4,
        priority: 2,
        deadline: "2021-11-30",
      },
    ],
  },
];
