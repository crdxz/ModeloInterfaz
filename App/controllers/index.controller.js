const oracledb = require("oracledb");
const conf = require('../config/config')
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

// Obtiene las personas actualmente registradas en la base de datos
const getPersonas = async (req, res) => {
    let con;
    try{
        con = await oracledb.getConnection({
            user            :   conf.user,
            password        :   conf.password,
            connectionString:   conf.connectionString
        });
    
        const data = await con.execute(
            `SELECT * FROM PERSONA`,
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
        res.render('addPersona', {response});
    } catch (err) {
        console.log(err);
    }
}

// Ingresa una persona en la base de datos 
// tambien valida que la persona no este registrada
// previamente 

const crearPersona = async (persona, res) => {
    let con;
    try{
        con = await oracledb.getConnection({
            user            :   conf.user,
            password        :   conf.password,
            connectionString:   conf.connectionString
        });
        const validar = await con.execute(
            `SELECT * FROM PERSONA WHERE NDOCUMENTO = :1
            AND IDTIPODOC = :2`,
            [persona.documento, persona.tipoDoc]
        );
        if (validar.rows.length === 0) {
            const data = await con.execute(
                `INSERT INTO PERSONA VALUES (
                    :1, :2, :3, :4, :5, :6, :7
                )`,
                [
                    persona.tipoDoc,
                    persona.documento,
                    persona.nombre,
                    persona.apellido,
                    persona.direccion,
                    persona.email,
                    persona.celular,
                ]
            );
            con.commit();
            res.redirect('personas')
        } else {
            // Redirigir a una advertencia 
            res.render('excepPersona', {persona})
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    getPersonas,
    getTipoDoc,
    crearPersona,
};


