// src/resolvers/categoryResolvers.js
import Category from "./category.model.js";
import MenuItem from "../MenuItem/menuItem.model.js";

const categoryResolvers = {
  Query: {
    async categories(_, { restaurantId }) {
      return await Category.find({ restaurantId });
    },
  },
  Mutation: {
    async createCategory(_, { restaurantId, name }) {
      return await Category.create({ restaurantId, name });
    },
  },
  Category: {
    menuItems: async (parent) => {
      return await MenuItem.find({ categoryId: parent._id });
    },
  },
};

export default categoryResolvers;
