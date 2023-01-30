var express = require('express');
var router = express.Router();

const auth =  require('../middlewares/auth')

const { PrismaClient } = require ('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    try {
        let branches = await prisma.branches.findMany({})
        res.status(200).send(branches)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.get('/my',auth.adminAuth, async (req, res) => {
    try {
        let branch = await prisma.branches.findFirst({
            where: {
                adminId: parseInt(req.user.id)
            },
            include: {
                services: true
            }
        })
        res.status(200).send(branch)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.post('/create',auth.SuperAdminAuth, async (req, res) => {
    try {
        let branch = await prisma.branches.create({
            data:{
                name: req.body.name,
                image:req.body.image,
                location_lat: parseFloat(req.body.location_lat),
                location_long: parseFloat(req.body.location_long),
                adminId : req.body.branchAdmin,
                services: req.body.services
            }
        })
        res.status(200).send(branch)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        let branch = await prisma.branches.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.status(200).send(branch)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})
router.delete('/:id',auth.SuperAdminAuth, async (req, res) => {
    try {
        let branch = await prisma.branches.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        let admin = await prisma.user.delete({
            where: {
                id: parseInt(branch.adminId)
            }
        })
        res.status(200).send(branch)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.post('/update/rating',auth.basic, async (req, res) => {
    try {
        let branch = await prisma.branches.findFirst({
            where: {
                id: parseInt(req.body.branchId)
            },
        })

        let rate = (parseInt(branch.rating) * parseInt(branch.rateCount) + parseInt(req.body.rating)) / (parseInt(branch.rateCount) + 1)
        update = await prisma.branches.update({
            where: {
                id: parseInt(req.body.branchId)
            },
            data:{
                rating: rate,
                rateCount: parseInt(branch.rateCount) + 1
            }
        })

        update2 =await  prisma.appointments.update({
            where: {
                id: parseInt(req.body.appointmentId)
            },
            data:{
                feedback: "1"
            }
        })
        res.status(200).send(branch)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.post("/serviceToBranch/",auth.adminAuth, async (req, res) => {
    try {
        let branch = await prisma.branches.findFirst({
            where: {
                adminId: parseInt(req.user.id)
            },
        })
        let services = branch.services
        services.push(parseInt(req.body.serviceId))
        update = await prisma.branches.update({
            where: {
                adminId: parseInt(req.user.id)
            },
            data:{
                services: services
            }
        })
        res.status(200).send(branch)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

module.exports = router;