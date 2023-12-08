import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const database = new DatabaseMemory()
const server = fastify()

server.get('/', () => {
    return 'Rota padrão'
})

server.post('/sandalia', (request, reply) => {
// Acessando dados do corpo da requisição
    const {tamanho, marca, cor, solado} = request.body
// Exibindo dados
//    console.log(body)
   
    // return 'cadastrar'
    database.create({
        tamanho: tamanho,
        marca: marca,
        cor: cor,
        solado: solado,
    })

    return reply.status(201).send
})

server.get('/sandalia', (request) => {
    const search = request.query.search
    console.log(search)
    const sandalia = database.list(search)
    console.log(sandalia)
    return sandalia
})

server.put('/sandalia/:id', (request, reply) => {
    const sandaliaId = request.params.id
    const { tamanho, marca, cor, solado} = request.body
    const sandalia = database.update(sandaliaId, {
        tamanho,
        marca,
        cor,
        solado,
        
    })
    return reply.status(204).send()
})

server.delete('/sandalia/:id', (request, reply) => {
    const sandaliaId = request.params.id

    database.delete(sandaliaId)

    return reply.status(204).send()
}) 

server.listen({
    port: 3333,
})