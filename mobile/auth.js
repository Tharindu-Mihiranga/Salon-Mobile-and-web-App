const { PrismaClient } = require ('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken');

const SuperAdminAuth = async (req,res,next)=>{
    try {
        if(!req.headers.authorization){
            res.status(401).send("Missing auth token")
            return
        }
        const token = req.headers.authorization.split(" ")[1]
        const dbToken = await prisma.tokens.findFirst({
            where:{
                token : token
            }
        })
        if(!dbToken){
            res.status(401).send()
        }else{
            if(jwt.verify(token,process.env.JWT_SECRET)){
                let user = await prisma.user.findFirst({
                    where:{
                        id : dbToken.userId
                    }
                })
                if(user){
                    if(user.role === 10){
                        delete user.password
                        req.user = user
                        next()
                    }else{
                        res.status(401).send()
                    }
                   
                }else{
                    res.status(401).send()
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
}

const adminAuth = async (req,res,next)=>{

    try {
        if(!req.headers.authorization){
            res.status(401).send("Missing auth token")
            return
        }
        const token = req.headers.authorization.split(" ")[1]
        const dbToken = await prisma.tokens.findFirst({
            where:{
                token : token
            }
        })
        if(!dbToken){
            res.status(401).send()
        }else{
            if(jwt.verify(token,process.env.JWT_SECRET)){
                let user = await prisma.user.findFirst({
                    where:{
                        id : dbToken.userId
                    }
                })
                if(user){
                    if(user.role === 0){
                        delete user.password
                        req.user = user
                        next()
                    }else{
                        res.status(401).send()
                    }
                   
                }else{
                    res.status(401).send()
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
}

const basic = async (req,res,next)=>{
    if(!req.headers.authorization){
        res.status(401).send("Missing auth token")
        return
    }
    const token = req.headers.authorization.split(" ")[1]
    const dbToken = await prisma.tokens.findFirst({
        where:{
            token : token
        }
    })
    if(!dbToken){
        res.status(401).send()
    }else{
        if(jwt.verify(token,process.env.JWT_SECRET)){
            let user = await prisma.user.findFirst({
                where:{
                    id : dbToken.userId
                }
            })
            if(user){
                delete user.password
                req.user = user
                next()
            }else{
                res.status(401).send()
            }
        }
    }
}

module.exports = {
    SuperAdminAuth,
    adminAuth,
    basic
}