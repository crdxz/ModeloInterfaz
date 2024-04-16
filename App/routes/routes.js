const { Router } = require("express")
const {getPersonas, crearPersona, getTipoDoc} = require('../controllers/index.controller')
const router = Router();

router.get('/personas', (req, res) => {
    getPersonas(req,res);    
});
router.get('/addPersona', (req, res) => {
    getTipoDoc(req, res);
});
router.post('/addPersona', (req, res) => {
    crearPersona(req.body, res);
});
module.exports = router;