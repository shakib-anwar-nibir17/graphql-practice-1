import { mergeTypeDefs } from "@graphql-tools/merge";
import { readFileSync } from "fs";
import gql from "graphql-tag";

const userTypeDefs = gql(readFileSync("./modules/User/user.graphql", "utf-8"));
const restaurantTypeDefs = gql(
  readFileSync("./modules/Restaurants/restaurant.graphql", "utf-8")
);
const categoryTypeDefs = gql(
  readFileSync("./modules/Categories/category.graphql", "utf-8")
);
const menuItemTypeDefs = gql(
  readFileSync("./modules/MenuItem/menItem.graphql", "utf-8")
);

export const typeDefs = mergeTypeDefs([
  userTypeDefs,
  restaurantTypeDefs,
  categoryTypeDefs,
  menuItemTypeDefs,
]);
