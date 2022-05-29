import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    type: "post",
    postTitle: "Inflation and economy",
    postContent:
      "Why is inflation so high and will it stay that way? An economist explains \n\nInflation is rising and the prospect of a cost of living crisis looms for many people across the world. \n\nApril saw a CPI (consumer price index) increase of 8.3%, while US inflation has stayed at a 40-year high. ",
    votes: {
      upvotedBy: [],
      downvotedBy: [],
    },
    bookmark: [],
    tags: ["economy"],
    username: "abbywen@gmail.com",
    createdAt: "2021-05-23T10:38:12+05:30",
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        username: "apurvasawant@gmail.com",
        commentData: "Keep these posts coming! Great value!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },

  {
    _id: uuid(),
    type: "post",
    postTitle: "Best books you'll ever read",
    postContent:
      "“To get the most out of books should you read every book once, or read the best books 10x?”This is a question I often ask myself.\nWith so many books out there, what are the best books you should read to improve your life?\nI can tell you 10 books that have greatly improved my life.\nAnd, if you read them, I suspect they may improve your life as well.\n\n1. CAN’T HURT ME By David Goggins\n2. TUESDAYS WITH MORRIE By Mitch Albom\n3. ATOMIC HABITS By James Clear\n4. EGO IS THE ENEMY By Ryan Holiday",
    votes: {
      upvotedBy: ["abbywen@gmail.com"],
      downvotedBy: [],
    },
    bookmark: [],
    tags: ["interview"],
    username: "apurvasawant@gmail.com",
    createdAt: "2022-05-16T10:38:12+05:30",
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        username: "abbywen@gmail.com",
        commentData: "These are really great suggestions!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },
];
