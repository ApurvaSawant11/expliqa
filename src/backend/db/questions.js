import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * Questions can be added here.
 * You can add default Questions of your wish with different attributes
 * */

export const questions = [
  {
    _id: uuid(),
    type: "question",
    username: "abbywen@gmail.com",
    questionTitle:
      "Why are cryptocurrency profits to be taxed at 30% in India?",
    questionContent: "I am Detailed Description about the Question.",
    votes: {
      upvotedBy: [],
      downvotedBy: [],
    },
    bookmark: [],
    tags: ["molecule", "chemistry"],
    comments: [
      {
        _id: uuid(),
        username: "apurvasawant@gmail.com",
        commentData: "Interesting",
      },
      {
        _id: uuid(),
        username: "benparker@gmail.com",
        commentData: "Wow!",
      },
    ],
    answers: [
      {
        _id: uuid(),
        username: "apurvasawant@gmail.com",
        answerText:
          "Taxing a crypto transaction legitimizes it, however, our new crypto tax regime also tends to create more questions than answers. As of present, India lacks a legislative framework to oversee crypto transactions; we can only tax on the basis of PAN card tracking. Any crypto transaction may be seen from two perspectives: income and expenditure. As such the 30% tax slab has been set in accordance with the Income Tax Act, 1961",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
        comments: [
          {
            _id: uuid(),
            username: "abbywen@gmail.com",
            commentData: "Thanks for the answer!",
          },
        ],
      },
    ],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },

  {
    _id: uuid(),
    type: "question",
    username: "apurvasawant@gmail.com",
    questionTitle: "How much food should I eat per day as per Ayurveda?",
    questionContent:
      "Our bodies use around 75 percent of our energy to digest the food. This means that we have only around 25 percent energy for other activities, including intellectual. I want to know how we can work at our best by consuming appropriate diet",
    votes: {
      upvotedBy: ["abbywen@gmail.com"],
      downvotedBy: [],
    },
    bookmark: [],
    tags: ["ayurveda", "health"],
    comments: [
      {
        _id: uuid(),
        username: "toaheftiba@gmail.com",
        commentData: "Interesting",
      },
      {
        _id: uuid(),
        username: "benparker@gmail.com",
        commentData: "Wow!",
      },
    ],
    answers: [
      {
        _id: uuid(),
        username: "luisvillasmil@gmail.com",
        answerText:
          "One meal a day is consept derived from Yogshastra. Its been said that , the person who eat only once a day is Yogi (is a practitioner of yoga, including a sannyasin or practitioner of meditation). Person who eats twice a day is Bhogi(one who enjoyes life) and a person who eat thrice a day is a Rogi(person who is ill).",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
        comments: [
          {
            _id: uuid(),
            username: "apurvasawant@gmail.com",
            commentData: "Thanks for the answer!",
          },
        ],
      },
    ],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },

  {
    _id: uuid(),
    type: "question",
    username: "luisvillasmil@gmail.com",
    questionTitle: "What is the easiest good to cook for breakfast?",
    questionContent:
      "I am looking for something that can be cooked within 25 minutes.",
    votes: {
      upvotedBy: ["abbywen@gmail.com"],
      downvotedBy: [],
    },
    bookmark: [],
    tags: ["ayurveda", "health"],
    comments: [
      {
        _id: uuid(),
        username: "toaheftiba@gmail.com",
        commentData: "Yummy",
      },
    ],
    answers: [
      {
        _id: uuid(),
        username: "benparker@gmail.com",
        answerText:
          "Hot flat pan, 5 slices of bacon, an egg opened on them. Move. Upside down, 3 minutes again. Add two toasted bread slices. Some black, chilled, red, whatever beans. Or do it the Italian way: cappuccino and cream or jam or chocholate filled brioche.",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
        comments: [
          {
            _id: uuid(),
            username: "luisvillasmil@gmail.com",
            commentData: "This sounds easy and delicious!",
          },
        ],
      },
    ],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
