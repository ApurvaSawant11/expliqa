import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content:
      "Why is inflation so high and will it stay that way? An economist explains \n\nInflation is rising and the prospect of a cost of living crisis looms for many people across the world. \n\nApril saw a CPI (consumer price index) increase of 8.3%, while US inflation has stayed at a 40-year high. ",
    votes: {
      upvotedBy: [],
      downvotedBy: [],
    },
    username: "adarshbalika@gmail.com",
    createdAt: "2021-05-23T10:38:12+05:30",
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        username: "apurvasawant@gmail.com",
        text: "Keep these posts coming! Great value!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },

  {
    _id: uuid(),
    content:
      "“Where do you see yourself in five years?” \n\nIt’s one of the notorious job-interview questions of our time, isn’t it? And a valuable one, as human resources professionals seek to evaluate candidates’ thoughtfulness and ambition. ",
    votes: {
      upvotedBy: [],
      downvotedBy: [],
    },
    username: "apurvasawant@gmail.com",
    createdAt: "2022-05-16T10:38:12+05:30",
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        username: "adarshbalika@gmail.com",
        text: "Would love to here more!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },
];
