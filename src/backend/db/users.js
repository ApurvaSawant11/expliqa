import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
import {
  balikaProfilePic,
  apurvaProfilePic,
  benProfilePic,
  luisProfilePic,
  toaProfilePic,
} from "assets";

/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika@gmail.com",
    userHandle: "adarshbalika",
    password: "adarshBalika123",
    profilePic: balikaProfilePic,
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Apurva",
    lastName: "Sawant",
    username: "apurvasawant@gmail.com",
    userHandle: "apurvasawant",
    password: "apurvasawant123",
    profilePic: apurvaProfilePic,
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Ben",
    lastName: "Parker",
    username: "benparker@gmail.com",
    userHandle: "benparker",
    password: "benparker123",
    profilePic: benProfilePic,
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Luis",
    lastName: "Villasmil",
    username: "luisvillasmil@gmail.com",
    userHandle: "luisvillasmil",
    password: "luisvillasmil123",
    profilePic: luisProfilePic,
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Toa",
    lastName: "Heftiba",
    username: "toaheftiba@gmail.com",
    userHandle: "toaheftiba",
    password: "toaheftiba123",
    profilePic: toaProfilePic,
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
