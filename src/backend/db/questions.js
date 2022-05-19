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
    username: "adarshbalika@gmail.com",
    questionTitle: "Why to use Server Side Rendering?",
    questionContent: "I am Detailed Description about the Question.",
    votes: {
      upvotedBy: [],
      downvotedBy: [],
    },
    bookmark: [],
    tags: ["server"],
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
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
        comments: [
          {
            _id: uuid(),
            username: "adarshbalika@gmail.com",
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
      upvotedBy: [],
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
];
