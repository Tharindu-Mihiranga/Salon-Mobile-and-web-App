var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');

const auth =  require('../middlewares/auth')

const { PrismaClient } = require ('@prisma/client')
const prisma = new PrismaClient()

router.get('/:id',auth.basic, async (req, res) => {
    try {
        let service = prisma.services.findUnique({
            where: {
                id: req.params.id
            }
        })
        res.status(200).send(service)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.get('/', async (req, res) => {
    try {
        let services = await prisma.services.findMany({})

        if(req.headers.authorization){
            const token = req.headers.authorization.split(" ")[1]
            const dbToken = await prisma.tokens.findFirst({
                where:{
                    token : token
                }
            })
            if(dbToken){
                if(jwt.verify(token,process.env.JWT_SECRET)){
                    let user = await prisma.user.findFirst({
                        where:{
                            id : dbToken.userId
                        }
                    })
                    if(user){
                        if(user.promo === 6){
                            let Free = []
                            services.forEach(service => {
                                service.price = 0
                                Free.push(service)
                            });
                            res.status(200).send(Free)
                            return
                        }
                    }
                    
                }
            }
        }


        res.status(200).send(services)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.post('/create',auth.SuperAdminAuth, async (req, res) => {
    try {
        let service = await prisma.services.create({
            data:{
                Name: req.body.Name,
                price: parseInt(req.body.price),
                desc: req.body.desc,
            }
        })
        res.status(200).send()
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.delete('/:id',auth.SuperAdminAuth, async (req, res) => {
    try {
        let service = await prisma.services.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.status(200).send(service)   
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.put('/:id',auth.adminAuth, async (req, res) => {
    try {
        let updateService = await prisma.services.update({
            where: {
                id: req.params.id
            },
            data: {
                Name: req.body.Name,
                price: req.body.price,
                desc: req.body.desc,
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.get("/branchId/:id", async (req, res) => {
    try {
        services =  await prisma.branches.findFirst({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                services: true
            }
        })
        res.status(200).send(services)
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
})


module.exports = router;