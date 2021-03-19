import Usuario from "../models/usuario.js";
import bcryptjs from 'bcrypt';
import { generarJWT } from '../middlewares/validar-jwt.js';


const usuarioGet = async (req, res) => {
  const { value } = req.query;
  const usuario = await Usuario.find({
    $or: [
      { nombre: new RegExp(value, "i") },
      { email: new RegExp(value, "i") },
    ],
  }).sort({ createdAt: -1 });

  res.json({
    usuario,
  });
};

const usuarioPost = async (req, res) => {
  const { nombre, email, password, rol } = req.body;
  const usuario = new Usuario({ nombre, email, password, rol });
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);
  await usuario.save();
  res.json({
    usuario,
  });
};

const login = async(req, res) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email })
  if (!usuario) {
    return res.json({
      msg:'usuario/password no son correctos E'
    })
  }
  if (usuario.estado === 0) {
    return res.json({
      msg:'usuario/password no son correctos ES'
    })
  }
  const validarpassword=bcryptjs.compareSync(password,usuario.password)
  if (!validarpassword) {
    return res.json({
      msg: "usuario/password no son correctos Pss",
    });
  }
 
const token=await generarJWT(usuario._id)

  return res.json({
    usuario,
    token
  })

};

const usuarioById = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findById({ _id: id });
  res.json({
    usuario,
  });
};

const usuarioPut = async (req, res) => {
  const { id } = req.params;
  const {
    _id,
    email,
    createdAt,
    _v,
    estado,
    rol,
    password,
    ...resto
  } = req.body;
  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    usuario,
  });
};

const usuarioActivar = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: 1 });

  res.json({
    usuario,
  });
};

const usuarioDesactivar = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: 0 });

  res.json({
    usuario,
  });
};

export {
  usuarioGet,
  usuarioPost,
  usuarioById,
  usuarioPut,
  usuarioActivar,
  usuarioDesactivar,
  login,
};
