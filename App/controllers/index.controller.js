const oracledb = require("oracledb");
const conf = require('../config/config')
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

// Obtiene las candidatos actualmente registradas en la base de datos
const getCandidatos = async (req, res) => {
    let con;
    try{
        con = await oracledb.getConnection({
            user            :   conf.user,
            password        :   conf.password,
            connectionString:   conf.connectionString
        });
    
        const data = await con.execute(
            `SELECT * FROM CANDIDATO`,
        );
        const response = data.rows;
        res.render('index', {response})
    } catch (err) {
        console.log(err);
    }
    
};

// Obtiene la lista de los tipos de documento existentes 
const getTipoDoc = async (req, res) => {
    let con;
    try{
        con = await oracledb.getConnection({
            user            :   conf.user,
            password        :   conf.password,
            connectionString:   conf.connectionString
        });
    
        const data = await con.execute(
            `SELECT * FROM TIPODOC`,
        );
        response = data.rows;
        res.render('addCandidato', {response});
    } catch (err) {
        console.log(err);
    }
}

// Ingresa un candidato en la base de datos 
// tambien valida el candidato no este registrada
// previamente 

const crearCandidato = async (candidato, res) => {
    let con;
    try{
        con = await oracledb.getConnection({
            user            :   conf.user,
            password        :   conf.password,
            connectionString:   conf.connectionString
        });
        const validar = await con.execute(
            `SELECT * FROM CANDIDATO WHERE USUARIO = :1`,
            [candidato.usuario]
        );
        if (validar.rows.length === 0) {
            const data = await con.execute(
                `INSERT INTO CANDIDATO VALUES (
                    :1, :2, :3, :4, :5, TO_DATE(:6, 'YYYY-MM-DD') 
                )`,
                [
                    candidato.usuario, 
                    candidato.tipoDoc,
                    candidato.nDoc, 
                    candidato.nombre, 
                    candidato.apellido, 
                    candidato.fechaNac
                ]
            );
            con.commit();
            res.redirect('candidatos')
        } else {
            // Redirigir a una advertencia 
            res.render('excepCandidato', {candidato})
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    getCandidatos,
    getTipoDoc,
    crearCandidato,
};


