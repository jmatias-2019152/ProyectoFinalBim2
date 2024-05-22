import { Router } from "express";
import { check } from "express-validator";
import { register, registerAdmin, registerProgramador, updateUser, userDelete} from "./user.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT, soloProgramador, adminOCliente } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
  "/registerClient",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "Este no es un correo válido").isEmail(),
    check("username", "El username es obligatorio").not().isEmpty(),
    check("password", "El password debe ser mayor a 4 caracteres").isLength({min: 4,}),
    validarCampos,
  ],
  register
);

router.post(
  "/registerProgramador",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "Este no es un correo válido").isEmail(),
    check("username", "El username es obligatorio").not().isEmpty(),
    check("password", "El password debe ser mayor a 4 caracteres").isLength({min: 4,}),
    validarCampos,validarJWT, soloProgramador
  ],
  registerProgramador
);

router.post(
  "/registerAdmin",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "Este no es un correo válido").isEmail(),
    check("username", "El username es obligatorio").not().isEmpty(),
    check("password", "El password debe ser mayor a 4 caracteres").isLength({min: 4,}),
    validarCampos,validarJWT, soloProgramador
  ],
  registerAdmin
);



router.put(
  "/update/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    validarCampos,  validarJWT, adminOCliente
  ],
  updateUser
);

router.delete(
  "/delete/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    validarCampos, validarJWT, adminOCliente
  ],
  userDelete
);

export default router;