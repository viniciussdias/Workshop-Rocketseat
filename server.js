// usei o express para criar e configurar meu servidor
const express = require('express')
const server = express()

const db = require('./db')

// configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static('public'))

// habilitar uso do req.body
server.use(express.urlencoded({ extended: true }))

// configuração do nunjucks - cria variáveis no html
const nunjucks = require('nunjucks')
nunjucks.configure('views', {
    express: server,
    noCache: true, // nunjucks sem cache
})

// criei uma rota /
// e capturo o pedido do cliente para responder
server.get('/', function(req, res){

    // Consultar dados na tabela
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send('Erro no banco de dados!')
        }

        // espalha o conteúdo do array em um novo array e não referencia mais o array original
        const reversedIdeas = [...rows].reverse()

        // consta cria uma variável que não pode variar
        // let

        let lastIdeas = [] //nova coleção
        for (let idea of reversedIdeas) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }

        return res.render('index.html', { ideas: lastIdeas })
    })
})

server.get('/ideias', function(req, res){

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send('Erro no banco de dados!')
        }

        // espalha o conteúdo do array em um novo array e não referencia mais o array original
        const reversedIdeas = [...rows].reverse()

        return res.render('ideias.html', { ideas: reversedIdeas })

    })
})

server.post('/', function(req, res) {
    // Inserir dado na tabela
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES(?, ?, ?, ?, ?);
    `
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]

    db.run(query, values, function(err) {
        if (err) {
            console.log(err)
            return res.send('Erro no banco de dados!')
        }
        
        return res.redirect('/ideias')
    })
})

// liguei meu servidor na porta 3000
server.listen(3000)
