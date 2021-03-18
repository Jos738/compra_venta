import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema({
  nombre: { type: String, required: true, maxlength: 50, unique: true },
  email: { type: String, required: true, maxlength: 100, unique: true },
  password: { type: String, required: true, minlength: 5, maxlength: 1024 },
  estado: { type: Number, default: 1 },
  rol: { type: String, required: true, maxlength: 20 },
  createdAt: {type: Date, default: Date.now},
});

export default mongoose.model("usuario", usuarioSchema);
