import { connection } from  "../../db/connection.js";

//## Parte 2/2

//### Consultas de una sola tabla

//4. **Contar la cantidad de oficinas en cada país:**

export const getAllOfficesFromCountry = async()=>{
    let [result] = await connection.query(
        `select country, count(*) 
        from offices group by country`)
    return result
}