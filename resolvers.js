import { mergeResolvers } from "@graphql-tools/merge";
import menuItemResolvers from "./modules/MenuItem/menuItemResolvers.js";
import userResolvers from "./modules/User/userResolvers.js";
import restaurantResolvers from "./modules/Restaurants/restaurantResolvers.js";
import categoryResolvers from "./modules/Categories/categoryResolvers.js";

const resolvers = mergeResolvers([
  menuItemResolvers,
  userResolvers,
  restaurantResolvers,
  categoryResolvers,
]);

export default resolvers;
