import { Router } from "express";
import { check } from "express-validator";
import { register, updateUser, userDelete} from "./user.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
  "/register",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "Este no es un correo válido").isEmail(),
    check("username", "El username es obligatorio").not().isEmpty(),
    check("password", "El password debe ser mayor a 4 caracteres").isLength({min: 4,}),
    check("phone","El teléfono debe de contener 8 números").isLength({min: 8, max:8}),
    check("dpi", "El dpi es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  register
);

// Ruta para actualizar un usuario por su ID
router.put(
  "/updateuser/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    validarCampos,
  ],
  updateUser
);

// Ruta para eliminar un usuario por su ID
router.delete(
  "/deleteuser/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    validarCampos,
  ],
  userDelete
);

export default router;