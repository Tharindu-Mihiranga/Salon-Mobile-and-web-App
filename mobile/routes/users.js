var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const { PrismaClient } = require ('@prisma/client')
const prisma = new PrismaClient()

const auth =  require('../middlewares/auth')

router.get('/',auth.basic, async (req, res) => {
  let user = req.user
  console.log(user)
  res.status(200).send(user)
})


//add new admin
router.post('/addAdmin',auth.SuperAdminAuth, async (req, res) => {
  try {
    const hash = await bcrypt.hashSync(req.body.password, 10);
    const userCreate = await prisma.user.create({
      data:{
        name: req.body.name,
        email: req.body.email,
        phone : req.body.phone,
        role : 0,
        password : hash
      }
    })
    console.log(userCreate)
    res.send(userCreate);
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

//register
router.post('/register',async function(req, res, next) {
  try {
    const hash = await bcrypt.hashSync(req.body.password, 10);
    const userCreate = await prisma.user.create({
      data:{
        name: req.body.name,
        email: req.body.email,
        phone : req.body.phone,
        role : 1,
        password : hash
      }
    })
    res.status(200).send(userCreate);
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
});

router.post('/login',async function(req, res, next) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      res.status(401).send("User not found");
    }else{
       if(await bcrypt.compare(req.body.password,user.password)){
          token = await jwt.sign(user.id,process.env.JWT_SECRET)
          user.token = token
          await prisma.tokens.create({
            data:{
              token: token,
              userId : user.id
            }
          })
          res.status(200).send(user)
       }else{
         res.status(401).send()
       }
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
});

router.post('/logout',auth.basic, async function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const dbToken = await prisma.tokens.findFirst({
      where:{
        token : token
      }
    })
    if(dbToken){
      await prisma.tokens.delete({
        where:{
          id : dbToken.id
        }
      })
      res.status(200).send()
    }else{
      res.status(401).send()
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

router.post('/logoutAll',auth.basic, async function(req, res, next) {
  try {
    await prisma.tokens.deleteMany({
      where:{
        userId : req.user.id
      }
    })
    res.status(200).send()
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

router.delete('/delete',auth.basic, async function(req, res, next) {
  try {
    await prisma.user.delete({
      where:{
        id : req.user.id
      }
    })
    res.status(200).send()
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

module.exports = router;
