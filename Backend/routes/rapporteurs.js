



const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
//Aquí van los relatores
const { getRelatores, crearRelator, actualizarRelator, eliminarRelator } = require('../controllers/rapporteurs');

const router = Router();

// Todas pasan por la validación del JWT
router.use( validarJWT );


// Obtener relatores
router.get('/', getRelatores);

// Crear un nuevo relator
router.post(
    '/',
 [
    check('firstName', 'El nombre es obligatorio').not().isEmpty(),
    check('lastName', 'El apellido es obligatorio').not().isEmpty(),
    check('rut', 'El rut es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
   check('cellPhone', 'El  es obligatorio').not().isEmpty(),
   check('profession', 'La profesión es obligatoria').not().isEmpty(),
   check('speciality', 'La especialidad es obligatoria').not().isEmpty(),
   check('contract', 'El contrato es obligatorio').not().isEmpty(),
   check('bank', 'El banco es obligatorio').not().isEmpty(),
   check('bankAccountNumber', 'El número de cuenta es obligatorio').not().isEmpty(),
   check('bankAccount', 'El banco es obligatorio').not().isEmpty(),
   validarCampos
], 
crearRelator );

// Actualizar un relator
router.put('/:id',
[
    check('firstName', 'El nombre es obligatorio').not().isEmpty(),
    check('lastName', 'El apellido es obligatorio').not().isEmpty(),
    check('rut', 'El rut es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('cellPhone', 'El  es obligatorio').not().isEmpty(),
    check('profession', 'La profesión es obligatoria').not().isEmpty(),
    check('speciality', 'La especialidad es obligatoria').not().isEmpty(),
    check('contract', 'El contrato es obligatorio').not().isEmpty(),
    check('bank', 'El banco es obligatorio').not().isEmpty(),
    check('bankAccountNumber', 'El número de cuenta es obligatorio').not().isEmpty(),
    check('bankAccount', 'El banco es obligatorio').not().isEmpty(),
    validarCampos
],
actualizarRelator );

// Eliminar Relator

router.delete('/:id', eliminarRelator);

module.exports = router;

