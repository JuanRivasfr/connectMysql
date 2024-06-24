import { connection } from  "../../db/connection.js";

//3. **Listar todas las órdenes que tienen un estado de 'Enviado':**

export const getAllOrdersWithShippedStatus = async()=>{
    let [result] = await connection.query(
        `select * 
        from orders 
        where status = 'Shipped';`)
    return result
}

//### Consultas de múltiples tablas

//3. **Encontrar todas las órdenes realizadas por clientes de 'Francia':**

export const getAllOrdersMadeFromClientsInFrance = async()=>{
    let [result] = await connection.query(
        `select customers.customerName, customers.country, orders.orderNumber 
        from customers join orders on customers.customerNumber = orders.customerNumber 
        where customers.country = 'France';`)
    return result
}

//5. **Recuperar los detalles de las órdenes, incluyendo los nombres de los productos, 
//para todas las órdenes realizadas por el cliente con el número de cliente 101:**

export const getAllOrdersMadeAndDetailsFromClient = async()=>{
    let [result] = await connection.query(
        `select customers.customerNumber, orders.orderNumber, orderdetails.quantityOrdered, orderdetails.priceEach, products.productName 
        from customers 
        join orders on customers.customerNumber = orders.customerNumber 
        join orderdetails on orders.orderNumber = orderdetails.orderNumber 
        join products on orderdetails.productCode = products.productCode 
        where customers.customerNumber = 484;`)
    return result
}

//## Parte 2/2

//### Consultas de múltiples tablas

//3. **Calcular el total de órdenes realizadas por cada cliente:**

export const getAllTotalOrdersForClient = async()=>{
    let [result] = await connection.query(
        `select customerNumber, count(*) as orders_customers 
        from orders 
        group by customerNumber;`)
    return result
}

//5. **Calcular el total de ventas (cantidad ordenada por precio cada uno) por cada cliente:**

export const getAllTotalOrdersByClient = async()=>{
    let [result] = await connection.query(
        ` SELECT 
        customers.customerNumber, 
        MIN(orderdetails.quantityOrdered) AS quantity_ordered,
        SUM(payments.amount) AS total_amount
        FROM customers
        JOIN orders 
        ON customers.customerNumber = orders.customerNumber
        JOIN orderdetails 
        ON orders.orderNumber = orderdetails.orderNumber
        JOIN payments 
        ON customers.customerNumber = payments.customerNumber
        GROUP BY customers.customerNumber`)
    return result
}

//8. **Encontrar el promedio de ventas (cantidad ordenada por precio cada uno) por cada empleado:**

export const getAvgOfVentasByEmployee = async()=>{
    let [result] = await connection.query(
        ` select customers.salesRepEmployeeNumber, avg(priceEach) 
        from customers 
        inner join orders on customers.customerNumber = orders.customerNumber 
        inner join orderdetails on orders.orderNumber = orderdetails.orderNumber 
        where orders.status != ('Cancelled')  
        group by customers.salesRepEmployeeNumber;`)
    return result
}

//9. **Calcular el total de órdenes gestionadas por cada empleado:**

export const getAllOdersByEmployee = async()=>{
    let [result] = await connection.query(
        `select customers.salesRepEmployeeNumber, count(orders.orderNumber) 
        from customers 
        inner join orders on customers.customerNumber = orders.customerNumber 
        group by customers.salesRepEmployeeNumber;`)
    return result
}

//12. **Calcular el total de ventas realizadas en cada país:**

export const getAllOdersOdersByCountry = async()=>{
    let [result] = await connection.query(
        `select customers.country, sum(orderdetails.priceEach) 
        from customers 
        inner join orders on customers.customerNumber = orders.customerNumber 
        inner join orderdetails on orders.orderNumber = orderdetails.orderNumber 
        group by customers.country;`)
    return result
}

//17. **Encontrar el total de ventas realizadas por cada oficina:**

export const getAllOdersByOffice = async()=>{
    let [result] = await connection.query(
        `select employees.officeCode, count(orders.orderNumber) 
        from employees 
        inner join customers on employees.employeeNumber = customers.salesRepEmployeeNumber 
        inner join orders on customers.customerNumber = orders.customerNumber 
        where orders.status != ('Cancelled') group by employees.officeCode 
        order by employees.officeCode asc;`)
    return result
}