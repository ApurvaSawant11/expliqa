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
    firstName: "Abby",
    lastName: "Wen",
    username: "abbywen@gmail.com",
    userHandle: "abbywen",
    password: "abbywen123",
    profilePic: balikaProfilePic,
    bio: "Works at neogcamp | Fixing hiring ",
    link: "https://github.com",
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
    bio: "Learning and growing at neogcamp",
    link: "https://github.com",
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
    bio: "Former Senior manager at Tata Consultancy Services",
    link: "https://github.com",
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
    bio: "Founder at BBusinesSmart.in",
    link: "https://github.com",
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
    bio: "Lawyer",
    link: "https://github.com",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
