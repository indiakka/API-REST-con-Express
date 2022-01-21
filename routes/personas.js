const express = require("express");
const router = express.Router();
const personasController = require("../controllers/personasController");
const { check } = require("express-validator/check");

// Reglas de validación:
const valid_user = [
  check(
    "Nombre",
    "El nombre indicado debe tener al menos 3 caracteres y no puede incluir números"
  )
    .isLength({ min: 3 })
    .isAlpha((locale = "es-ES"), { ignore: "- /" }),
  check(
    "Apellidos",
    "Los apellidos indicados debe tener al menos 3 caracteres y no pueden incluir números"
  )
    .isLength({ min: 3 })
    .isAlpha((locale = "es-ES"), { ignore: "- /" }),
  check(
    "Edad",
    "La edad indicada debe estar comprendida entre 0 y 125"
  ).isFloat({ min: 0, max: 125 }),
  check("Dni", "El dni indicado debe contener 9 caracteres alfanuméricos")
    .isLength({ min: 9, max: 9 })
    .isAlphanumeric(),

  check(
    "Cumpleanios",
    "El cumpleaños indicado debe especificarse en formato aaaa-mm-dd"
  ).isISO8601(),
  check(
    "ColorFavorito",
    "El color favorito indicado debe tener al menos 3 caracteres y no puede incluir números"
  )
    .isLength({ min: 3 })
    .isAlpha((locale = "es-ES"), { ignore: "- /" }),
  check(
    "Sexo",
    "El sexo indicado debe ser uno de los siguientes: Hombre, Mujer, Otro, No especificado"
  ).isIn(["Hombre", "Mujer", "Otro", "No especificado"]),
];

// Método GET para listar usuarios:
router.get("/", personasController.personas_list);

// Método POST para crear usuarios con validaciones:
router.post("/", valid_user, personasController.personas_create);

// Método PUT para actualizar usuarios con validaciones:
router.put("/:id", valid_user, personasController.personas_update_one);

// Método DELETE para borrar usuarios:
router.delete("/:id", personasController.personas_delete_one);

module.exports = router;
