import express from "express";
import autenticar from "./seguranca/autenticar.js";
import session from "express-session";

const porta = 3000
const localhost = '0.0.0.0'

const app = express();

app.use(express.urlencoded({ extended: true })) 

app.use(session({
    secret: 'chaveSecreta',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 15 // 15 minutos de sessão
    }
}))

app.get("/login", (requisicao, resposta) => {
    resposta.redirect('/login.html');
})

app.post("/login", (requisicao, resposta) => {
    const usuario = requisicao.body.nome
    const senha = requisicao.body.senha
    if (usuario === 'admin' && senha === '123') {
        requisicao.session.autenticado = true;
        resposta.redirect('/login.html?sucesso=1');
    } else {
        resposta.redirect('/login.html?erro=1');
    }
})

app.get("/logout", (requisicao, resposta) => {
    requisicao.session.destroy()
    resposta.redirect('/login.html');
})

app.use(express.static('./public'))


app.use(autenticar, express.static('./private'))

app.listen(porta, localhost, () => {
    console.log(`Servidor disponível em ${porta}!`)
})
