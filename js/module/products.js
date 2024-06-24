import { connection } from  "../../db/connection.js";

//1. **Recuperar todas las líneas de productos con sus descripciones:**

export const getAllProductsDescription = async()=>{
    let [result] = await connection.query('SELECT productLine, productDescription from products;')
    return result
}

//### Consultas de múltiples tablas

//1. **Listar todos los productos junto con las descripciones de sus líneas de productos:**

export const getAllProductsWithThemDescriptionsAndLineProducts = async()=>{
    let [result] = await connection.query(
        `select products.productCode, products.productName, productlines.textDescription 
        from products join productlines on products.productLine = productlines.productLine;`)
    return result
}

//## Parte 2/2

//### Consultas de una sola tabla

//2. **Calcular el total de productos en stock:**

export const getAllProductsInStock = async()=>{
    let [result] = await connection.query(
        `select sum(quantityInStock) as total_stock 
        from products;`)
    return result
}

//3. **Encontrar el precio medio de compra de todos los productos:**

export const getAllPriceAvgOfProducts = async()=>{
    let [result] = await connection.query(
        `select avg(buyPrice) as total_buyPrice 
        from products;`)
    return result
}

//7. **Calcular la cantidad media de productos pedidos en las órdenes:**

export const getTheAvgOfTheProducts = async()=>{
    let [result] = await connection.query(
        `select avg(quantityOrdered) as promedio_productos 
        from orderdetails;`)
    return result
}

//8. **Encontrar el precio total de todos los productos:**

export const getTotalPriceOfProduct = async()=>{
    let [result] = await connection.query(
        `select sum(buyPrice) as precio_producto 
        from products;`)
    return result
}

//9. **Calcular el promedio del precio sugerido (MSRP) de los productos:**

export const getAvgOfMSRP = async()=>{
    let [result] = await connection.query(
        `select avg(MSRP) as promedio 
        from products;`)
    return result
}


//### Consultas de múltiples tablas

//4. **Encontrar la cantidad total de productos pedidos por cada cliente:**

export const getAllTotalProductsOrderedByClient = async()=>{
    let [result] = await connection.query(
        `select orders.customerNumber,count(orderdetails.quantityOrdered) 
        from orders inner join orderdetails on orders.orderNumber = orderdetails.orderNumber 
        group by orders.customerNumber;`)
    return result
}

//6. **Obtener el promedio de la cantidad de productos en stock por línea de productos:**

export const getAvgOfProductsInStock = async()=>{
    let [result] = await connection.query(
        `select products.productLine, avg(quantityInStock) 
        from products 
        group by products.productLine;`)
    return result
}

//10. **Obtener la cantidad total de productos vendidos por cada línea de productos:**

export const getAllProductsSale = async()=>{
    let [result] = await connection.query(
        `select products.productLine, count(orderdetails.quantityOrdered) 
        from products 
        inner join orderdetails on products.productCode = orderdetails.productCode 
        group by products.productLine;`)
    return result
}

//11. **Encontrar el promedio de la cantidad de productos ordenados por cada cliente:**

export const getAvgOfProductsOrderedByClient = async()=>{
    let [result] = await connection.query(
        `select orders.customerNumber, avg(quantityOrdered) 
        from orders 
        inner join orderdetails on orders.orderNumber = orderdetails.orderNumber 
        group by orders.customerNumber;`)
    return result
}

//13. **Obtener el promedio del precio de compra de los productos por línea de productos:**

export const getAvgOfProductsByLineProducts = async()=>{
    let [result] = await connection.query(
        `select productLine, avg(buyPrice) 
        from products 
        group by productLine;`)
    return result
}

//14. **Encontrar la cantidad total de productos vendidos por cada vendedor:**

export const getAllProductsSoldByEmployee = async()=>{
    let [result] = await connection.query(
        `select customers.salesRepEmployeeNumber, sum(orderdetails.quantityOrdered) 
        from customers 
        inner join orders on customers.customerNumber = orders.customerNumber 
        inner join orderdetails on orders.orderNumber = orderdetails.orderNumber 
        group by customers.salesRepEmployeeNumber;`)
    return result
}

//18. **Calcular la cantidad media de productos pedidos por cada cliente:**

export const getAvgProductsByClient = async()=>{
    let [result] = await connection.query(
        `select orders.customerNumber, avg(orderdetails.quantityOrdered) 
        from orders 
        inner join orderdetails on orders.orderNumber = orderdetails.orderNumber 
        group by orders.customerNumber;`)
    return result
}

//20. **Encontrar el promedio del precio de venta (priceEach) de los productos por línea de productos:**

export const getAvgProductsByLineProducts = async()=>{
    let [result] = await connection.query(
        ` select productLine, avg(buyPrice) 
        from products group by productLine;`)
    return result
}