import { connection } from  "../../db/connection.js";

//4. **Obtener los detalles de todos los pagos realizados por el cliente con el número de cliente 103:**

export const getAllPaymentsFromClient = async()=>{
    let [result] = await connection.query(
        `select customers.customerNumber, customers.customerName, payments.paymentDate, payments.amount  
        from customers join payments on customers.customerNumber = payments.customerNumber 
        where payments.customerNumber = 103;`)
    return result
}

//### Consultas de múltiples tablas

//4. **Listar el monto total de los pagos recibidos de cada cliente:**

export const getAllPaymentsFromAllClients = async()=>{
    let [result] = await connection.query(
        `select customers.customerNumber, customers.customerName, SUM(payments.amount) as totalAmount 
        from customers left join payments on customers.customerNumber = payments.customerNumber 
        group by customers.customerNumber;`)
    return result
}

//## Parte 2/2

//### Consultas de una sola tabla

//5. **Calcular el total de pagos recibidos:**

export const getTheSumOfAllPayments = async()=>{
    let [result] = await connection.query(
        `select count(*) as pagos_totales from payments;`)
    return result
}

//### Consultas de múltiples tablas

//1. **Calcular el total de pagos recibidos por cada cliente:**

export const getTotalPaymentsForClient = async()=>{
    let [result] = await connection.query(
        `select customerNumber, count(*) from payments group by customerNumber;`)
    return result
}

//7. **Calcular el total de pagos recibidos por cada país:**

export const getTotalPaymentsByCountry = async()=>{
    let [result] = await connection.query(
        `select customers.country, count(payments.customerNumber) 
        from customers 
        inner join payments on customers.customerNumber = payments.customerNumber 
        group by customers.country;`)
    return result
}

//15. **Calcular el total de pagos recibidos por cada vendedor:**

export const getTotalPaymentsByEmployee = async()=>{
    let [result] = await connection.query(
        `select customers.salesRepEmployeeNumber, count(payments.checkNumber) 
        from customers 
        inner join payments on customers.customerNumber = payments.customerNumber 
        group by customers.salesRepEmployeeNumber;`)
    return result
}

//19. **Obtener el total de pagos realizados en cada año:**

export const getTotalPaymentsByYear = async()=>{
    let [result] = await connection.query(
        `select year(paymentDate) as yearPayment, count(checkNumber) 
        from payments group by yearPayment order by yearPayment asc;`)
    return result
}