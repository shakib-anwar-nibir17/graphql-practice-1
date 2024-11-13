import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);
export default MenuItem;
