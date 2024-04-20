const { Router } = require("express")
const {getCandidatos, crearCandidato, getTipoDoc} = require('../controllers/index.controller')
const router = Router();

router.get('/candidatos', (req, res) => {
    getCandidatos(req,res);    
});
router.get('/addCandidato', (req, res) => {
    getTipoDoc(req, res);
});
router.post('/addCandidato', (req, res) => {
    crearCandidato(req.body, res);
});
module.exports = router;