import { connection } from  "../../db/connection.js";

//5. **Recuperar todos los clientes de 'USA' que tienen un límite de crédito superior a 50000:**

export const getAllClientsFromUSA = async()=>{
    let [result] = await connection.query('select customerNumber, customerName, country, city, creditLimit from customers where country = "USA" and creditLimit > 50000;')
    return result
}

//## Parte 2/2

//### Consultas de una sola tabla

//1. **Obtener el promedio del límite de crédito de todos los clientes:**

export const getAllCreditLimitPromFromClients = async()=>{
    let [result] = await connection.query(
        `select avg(creditLimit) as prom_credit_limit 
        from customers;`)
    return result
}

//### Consultas de múltiples tablas

//2. **Obtener el promedio del límite de crédito de los clientes por país:**

export const getAvgFromCreditLimitForCountry = async()=>{
    let [result] = await connection.query(
        `select country, avg(creditLimit) 
        from customers 
        group by country;`)
    return result
}

//16. **Obtener el promedio del límite de crédito de los clientes atendidos por cada vendedor:**

export const getAvgFromCreditLimitByEmployee = async()=>{
    let [result] = await connection.query(
        `select salesRepEmployeeNumber, avg(creditLimit) 
        from customers 
        group by salesRepEmployeeNumber;`)
    return result
}