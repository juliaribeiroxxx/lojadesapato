import { randomUUID } from "crypto"

export class DatabaseMemory{
#sandalia = new Map()

list(search){
    return Array.from(this.#sandalia.entries()).map((sandaliaArray) =>{
    // acessando primeira posição
        const id = sandaliaArray[0]
        const data = sandaliaArray[1]

        return{
            id,
            ...data
        }
    })
    .filter(sandalia => {
        if (search){
            return sandalia.marca.includes(search)
        }
        return true
    })
}
create(sandalia){
    const sandaliaId = randomUUID()
    this.#sandalia.set(sandaliaId, sandalia)
}
update(id, sandalia){
    this.#sandalia.set(id, sandalia)
}
delete(id, sandalia){
    this.#sandalia.delete(id, sandalia)
}
}