require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors'); // Adding CORS to allow requests from any origin

const app = express()

//Config Json response

app.use(express.json())
app.use(cors())

// Adding CORS to allow requests from any origin
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

//Models

const User = require('./models/User')

// Open Route = Public Route

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Bem vindo ao edukids' })
})

//Pivate Route

app.get('/user/:id', checkToken, async (req, res) => {
    const id = req.params.id

    const user = await User.findById(id, '-password')

    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' })
    }
    res.status(200).json({ user })
})

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado' })
    }

    try {
        const secret = process.env.SECRET

        jwt.verify(token, secret)

        next()
    } catch (error) {
        res.status(400).json({ message: 'Token inválido' })
    }
}

//registrar usuario

app.post('/auth/register', async (req, res) => {
    const { name, email, password } = req.body

    console.log(req.body)

    //validações


    // Esta parte foi comentada pois o frontend já faz as validações
    // if (!name) {
    //     return res.status(420).json({ message: 'Nome é obrigatório' })
    // }
    // if (!email) {
    //     return res.status(420).json({ message: 'Email é obrigatório' })
    // }
    // if (!password) {
    //     return res.status(420).json({ message: 'Senha é obrigatório' })
    // }
    // if (password !== confirmPassword) {
    //     return res.status(420).json({ message: 'Senhas não conferem' })
    // }
    // else{
    //     return res.status(200).json({ message: 'Usuário cadastrado com sucesso' })
    // }

    // verificando usuario
    const userExist = await User.findOne({ email: email })

    if (userExist) {
        return res.status(422).json({ message: 'Email já cadastrado' })
    }

    // criando a senha

    const salt = await bcrypt.genSalt(12)
    const hashPassword = await bcrypt.hash(password, salt)

    // criando usuario

    // const user = new User({
    //     name,
    //     email,
    //     password: hashPassword,
    // })

    try {
        console.log('Registrando usuário')
        // await user.save()
        await User.create({
            name,
            email,
            password: hashPassword,
        })
        console.log('Usuário cadastrado com sucesso')
        res.status(201).json({ message: 'Usuário cadastrado com sucesso' })

    } catch (err) {
        return res.status(500).json({ message: error })
    }

})

//Login

app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body

    //validações

    // if (!email) {
    //     return res.status(420).json({ message: 'Email é obrigatório' })
    // }
    // if (!password) {
    //     return res.status(420).json({ message: 'Senha é obrigatório' })
    // }

    // Validando o Login com o DB

    const user = await User.findOne({ email: email })
    if (!user) {
        return res.status(404).json({ message: 'Email não cadastrado' })
    }

    // Validando a senha com o DB

    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
        return res.status(404).json({ message: 'Senha inválida' })
    }
    try {
        const secret = process.env.SECRET
        const token = jwt.sign({
            id: user._id,
        },
            secret
        )
        res.status(200).json({ message: 'Usuário logado com sucesso', token })

    } catch (err) {
        return res.status(500).json({ message: error })
    }
})

app.get('/auth/get-users', async (req, res) => {
    const users = await User.find()

    res.status(200).json({ users })
});


//credenciais

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPassword}@edukids.qdgfcze.mongodb.net/?retryWrites=true&w=majority&appName=edukids`)
    .then(() => {
        app.listen(5050)
        console.log('Conectado ao banco de dados')
    })
    .catch((err) => console.log(err))
