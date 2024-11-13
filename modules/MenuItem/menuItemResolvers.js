import MenuItem from "./menuItem.model.js";

const menuItemResolvers = {
  Query: {
    async menuItems(_, { categoryId }) {
      return await MenuItem.find({ categoryId });
    },
  },
  Mutation: {
    async createMenuItem(_, { categoryId, name, price }) {
      return await MenuItem.create({ categoryId, name, price });
    },
    async deleteMenuItem(_, { id }) {
      const result = await MenuItem.findByIdAndDelete(id);
      return !!result;
    },
  },
};

export default menuItemResolvers;
