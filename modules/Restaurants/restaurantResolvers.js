// src/resolvers/restaurantResolvers.js
import Restaurant from "./restaurant.model.js";
import Category from "../Categories/category.model.js";

const restaurantResolvers = {
  Query: {
    async restaurants() {
      return await Restaurant.find({});
    },
    async restaurant(_, { id }) {
      return await Restaurant.findById(id);
    },
  },
  Mutation: {
    async createRestaurant(_, { name, location }) {
      return await Restaurant.create({ name, location });
    },
    async deleteRestaurant(_, { id }) {
      const result = await Restaurant.findByIdAndDelete(id);
      return !!result;
    },
  },
  Restaurant: {
    categories: async (parent) => {
      return await Category.find({ restaurantId: parent._id });
    },
  },
};

export default restaurantResolvers;
