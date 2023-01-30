var express = require('express');
var router = express.Router();

const auth =  require('../middlewares/auth')

const { PrismaClient } = require ('@prisma/client')
const prisma = new PrismaClient()

router.get('/',auth.adminAuth, async (req, res) => {
    try {
        let appointments = await prisma.appointments.findMany({})
        res.status(200).send(appointments)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.get('/my',auth.basic, async (req, res) => {
    try {
        let appointments = await prisma.appointments.findMany({
            where: {
                userId: parseInt(req.user.id),
                feedback: null,
                approved: 1
            },
            include: {
                service: true,
            }
        })
        res.status(200).send(appointments)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.get('/:id',auth.adminAuth, async (req, res) => {
    try {
        let appointment = prisma.appointments.findUnique({
            where: {
                id: req.params.id
            }
        })
        res.status(200).send(appointment)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.post("/create",auth.basic, async (req, res) => {
    try {
        let user = await prisma.user.findUnique({
            where: {
                id: parseInt(req.user.id)
            }
        })

        if(user.promo == 6){
            let updatePromo = await prisma.user.update({
                where: {
                    id: parseInt(req.user.id)
                },
                data: {
                    promo: 0
                }
            })
        }else{
            let updatePromo = await prisma.user.update({
                where: {
                    id: parseInt(req.user.id)
                },
                data: {
                    promo: user.promo + 1
                }
            })
        }
        let appointment = await prisma.appointments.create({
            data: {
                serviceId: parseInt(req.body.serviceId),
                branchId: parseInt(req.body.branchId),
                approved: 0,
                date : new Date(req.body.date),
                time : '',
                userId: parseInt(req.user.id)
        }})
        res.status(200).send(appointment)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.delete("/:id",auth.basic, async (req, res) => {
    try {
        let appointment = prisma.appointments.delete({
            where: {
                id: req.params.id
            }
        })
        res.status(200).send(appointment)   
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.post("/approve",auth.adminAuth, async (req, res) => {
    try {
        let appointment = await prisma.appointments.update({
            where: {
                id: req.body.id
            },
            data: {
                approved: 1
            }
        })
        res.status(200).send(appointment)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.post("/decline",auth.adminAuth, async (req, res) => {
    try {
        let appointment = await prisma.appointments.update({
            where: {
                id: req.body.id
            },
            data: {
                approved: 2
            }
        })
        res.status(200).send(appointment)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.get("/pending/:id/:status",auth.adminAuth, async (req, res) => {
    try {
        let appointments = await prisma.appointments.findMany({
            where: {
                branchId: parseInt(req.params.id),
                approved: parseInt(req.params.status)
            },
            include: {
                service: true
            }
        })
        res.status(200).send(appointments)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})




module.exports = router;