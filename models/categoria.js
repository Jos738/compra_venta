import mongoose from "mongoose";

const categoriaSchema = mongoose.Schema({
  nombre: { type: String, required: true, maxlength: 50, unique: true },
  descripcion: { type: String, maxlength: 150 },
  estado: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("categoria", categoriaSchema);
