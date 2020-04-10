// usei o express para criar e configurar meu servidor
const express = require("express")
const server = express()

const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title: "Cursos de Programação",
        category: "Estudo",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis magni, ipsum natus ex nobis nisi vel est autem ducimus, mollitia",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title: "Exercícios",
        category: "Saúde",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis magni, ipsum natus ex nobis nisi vel est autem ducimus, mollitia",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title: "Meditação",
        category: "Mentalidade",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis magni, ipsum natus ex nobis nisi vel est autem ducimus, mollitia",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729076.svg",
        title: "Filmes",
        category: "Entreterimento",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis magni, ipsum natus ex nobis nisi vel est autem ducimus, mollitia",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729038.svg",
        title: "Pintura",
        category: "Criatividade",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis magni, ipsum natus ex nobis nisi vel est autem ducimus, mollitia",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729048.svg",
        title: "Recortes",
        category: "Criatividade",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis magni, ipsum natus ex nobis nisi vel est autem ducimus, mollitia",
        url: "https://rocketseat.com.br"
    },
]

// configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))

// configuração do nunjucks - cria variáveis no html
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true, // nunjucks sem cache
})

// criei uma rota /
// e capturo o pedido do cliente para responder
server.get("/", function(req, res){

    // espalha o conteúdo do array em um novo array e não referencia mais o array original
    const reversedIdeas = [...ideas].reverse()

    // consta cria uma variável que não pode variar
    // let

    let lastIdeas = [] //nova coleção
    for (let idea of reversedIdeas) {
        if (lastIdeas.length < 2) {
            lastIdeas.push(idea)
        }
    }

    return res.render("index.html", { ideas: lastIdeas })
})

server.get("/ideias", function(req, res){

    // espalha o conteúdo do array em um novo array e não referencia mais o array original
    const reversedIdeas = [...ideas].reverse()

    return res.render("ideias.html", { ideas: reversedIdeas })
})

// liguei meu servidor na porta 3000
server.listen(3000)
