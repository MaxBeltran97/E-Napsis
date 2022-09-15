const { response } = require('express');
const Relator = require('../models/Relator');
const Relatores = require('../models/Relator');



const getRelatores = async(req, res = response) => {

    const relatores = await Relator.find()
                                    .populate('user','name');
    res.json({
        ok: true,
        relatores
    })                        

}


const crearRelator = async(req, res = response) => {

    const relator = new Relator( req.body );

    try {

        relator.user = req.uid;

        const relatorGuardado = await relator.save();

        res.json({
            ok:true,
            relator
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
        
    }
}

const actualizarRelator = async(req, res = response) => {

    const relatorId = req.params.id;
    const uid = req.uid;

    try {

        const relator = await Relator.findById( relatorId );

        if ( !relator ) {
            return res.status(404).json({
                ok: false,
                msg: 'Relator no existe por ese id'
            })
        }

        if ( relator.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios de editar este relator'
            })
        }
        
        const nuevoRelator = {
            ...req.body,
            user: uid
        }

        const relatorActualizado = await Relator.findByIdAndUpdate( relatorId, nuevoRelator, {new : true} );

        res.json({
            ok:true,
            relator: relatorActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        });
    }

}


const eliminarRelator = async(req, res = response) => {

    const relatorId = req.params.id;
    const uid = req.uid;

    try {

        const relator = await Relator.findById( relatorId );

        if ( !relator ) {
            return res.status(404).json({
                ok: false,
                msg: 'Relator no existe por ese id'
            })
        }

        if ( relator.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios de eliminar este relator'
            })
        }       

        await Relator.findByIdAndUpdate( relatorId );

        res.json({
            ok:true,
            relator: 'Relator Eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        });
    }

}



module.exports = {
    getRelatores,
    crearRelator,
    actualizarRelator,
    eliminarRelator
}