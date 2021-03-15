import Router from "express";
import {
  categoriaGet,
  categoriaPost,
  categoriaById,
  categoriaPut,
  categoriaActivar,
  categoriaDesactivar,
  categoriaDelete,
} from "../controllers/categoria.js";

const router = Router();

router.get("/", categoriaGet);

router.get("/:id", categoriaById);

router.post("/", categoriaPost);

router.put("/:id", categoriaPut);

router.put("/activar/:id", categoriaActivar);

router.put("/desactivar/:id", categoriaDesactivar);

router.delete("/:id", categoriaDelete);

export default router;
