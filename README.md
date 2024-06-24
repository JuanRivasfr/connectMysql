### Consultas de una sola tabla

1. **Recuperar todas las líneas de productos con sus descripciones:**

   ```sql
   select productLine, productDescription from products;
   ```

2. **Encontrar todos los empleados que trabajan en la oficina de 'San Francisco':**

   ```sql
   select employees.firstName, employees.lastName, offices.city from employees join offices on employees.officeCode = offices.officeCode where offices.city = 'San Francisco';
   ```

3. **Listar todas las órdenes que tienen un estado de 'Enviado':**

   ```sql
    select * from orders where status = 'Shipped';
   ```

4. **Obtener los detalles de todos los pagos realizados por el cliente con el número de cliente 103:**

   ```sql
   select customers.customerNumber, customers.customerName, payments.paymentDate, payments.amount  from customers join payments on customers.customerNumber = payments.customerNumber where payments.customerNumber = 103;
   ```

5. **Recuperar todos los clientes de 'USA' que tienen un límite de crédito superior a 50000:**

   ```sql
   select customerNumber, customerName, city, creditLimit from customers where country = 'USA' and creditLimit > 50000;
   ```

### Consultas de múltiples tablas

1. **Listar todos los productos junto con las descripciones de sus líneas de productos:**

   ```sql
   select products.productCode, products.productName, productlines.textDescription from products join productlines on products.productLine = productlines.productLine;
   ```

2. **Obtener los nombres y direcciones de correo electrónico de los empleados que reportan al empleado con el número de empleado 1143:**

   ```sql
   select firstName, lastName, email, reportsTo from employees where reportsTo = 1143;
   ```

3. **Encontrar todas las órdenes realizadas por clientes de 'Francia':**

   ```sql
   select customers.customerName, customers.country, orders.orderNumber from customers join orders on customers.customerNumber = orders.customerNumber where customers.country = 'France';
   ```

4. **Listar el monto total de los pagos recibidos de cada cliente:**

   ```sql
   select customers.customerNumber, customers.customerName, SUM(payments.amount) as totalAmount from customers left join payments on customers.customerNumber = payments.customerNumber group by customers.customerNumber, customers.customerName;
   ```

5. **Recuperar los detalles de las órdenes, incluyendo los nombres de los productos, para todas las órdenes realizadas por el cliente con el número de cliente 101:**

   ```sql
   select customers.customerNumber, orders.orderNumber, orderdetails.quantityOrdered, orderdetails.priceEach, products.productName from customers join orders on customers.customerNumber = orders.customerNumber join orderdetails on orders.orderNumber = orderdetails.orderNumber join products on orderdetails.productCode = products.productCode where customers.customerNumber = 484;
   ```

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



## Parte 2/2

### Consultas de una sola tabla

1. **Obtener el promedio del límite de crédito de todos los clientes:**

   ```
   select avg(creditLimit) as prom_credit_limit from customers;
   ```

2. **Calcular el total de productos en stock:**

   ```
   select sum(quantityInStock) as total_stock from products;
   ```

3. **Encontrar el precio medio de compra de todos los productos:**

   ```
   select avg(buyPrice) as total_buyPrice from products;
   ```

4. **Contar la cantidad de oficinas en cada país:**

   ```
   select country, count(*) from offices group by country;
   ```

5. **Calcular el total de pagos recibidos:**

   ```
   select count(*) as pagos_totales from payments;
   ```

6. **Obtener la cantidad total de empleados:**

   ```
   select count(*) as empleados_totales from employees;
   ```

7. **Calcular la cantidad media de productos pedidos en las órdenes:**

   ```
   select avg(quantityOrdered) as promedio_productos from orderdetails;
   ```

8. **Encontrar el precio total de todos los productos:**

   ```
   select sum(buyPrice) as precio_producto from products;
   ```

9. **Calcular el promedio del precio sugerido (MSRP) de los productos:**

   ```
    select avg(MSRP) as promedio from products;
   ```

10. **Contar la cantidad de empleados por título de trabajo:**

```
select jobTitle, count(*) from employees group by jobTitle;
```

### Consultas de múltiples tablas

1. **Calcular el total de pagos recibidos por cada cliente:**

   ```
   select customerNumber, count(*) from payments group by customerNumber;
   ```

2. **Obtener el promedio del límite de crédito de los clientes por país:**

   ```
   select country, avg(creditLimit) from customers group by country;
   ```

3. **Calcular el total de órdenes realizadas por cada cliente:**

   ```
   select customerNumber, count(*) as orders_customers from orders group by customerNumber;
   ```

4. **Encontrar la cantidad total de productos pedidos por cada cliente:**

   ```
   select orders.customerNumber,count(orderdetails.quantityOrdered) from orders inner join orderdetails on orders.orderNumber = orderdetails.orderNumber group by orders.customerNumber;
   ```

5. **Calcular el total de ventas (cantidad ordenada por precio cada uno) por cada cliente:**

   ```
    SELECT 
    customers.customerNumber,MIN(orderdetails.quantityOrdered) AS quantity_ordered, SUM(payments.amount) AS total_amount
    FROM customers JOIN orders ON customers.customerNumber = orders.customerNumber JOIN orderdetails 
    ON orders.orderNumber = orderdetails.orderNumber JOIN payments ON customers.customerNumber = payments.customerNumber
    GROUP BY customers.customerNumber
   ```

6. **Obtener el promedio de la cantidad de productos en stock por línea de productos:**

   ```
   select products.productLine, avg(quantityInStock) from products group by products.productLine;
   ```

7. **Calcular el total de pagos recibidos por cada país:**

   ```
   select customers.country, count(payments.customerNumber) from customers inner join payments on customers.customerNumber = payments.customerNumber group by customers.country;
   ```

8. **Encontrar el promedio de ventas (cantidad ordenada por precio cada uno) por cada empleado:**

   ```
   select customers.salesRepEmployeeNumber, avg(priceEach) from customers inner join orders on customers.customerNumber = orders.customerNumber inner join orderdetails on orders.orderNumber = orderdetails.orderNumber where orders.status != ('Cancelled')  group by customers.salesRepEmployeeNumber;
   ```

9. **Calcular el total de órdenes gestionadas por cada empleado:**

   ```
   select customers.salesRepEmployeeNumber, count(orders.orderNumber) from customers inner join orders oncustomers.customerNumber = orders.customerNumber groupby customers.salesRepEmployeeNumber;
   ```

10. **Obtener la cantidad total de productos vendidos por cada línea de productos:**

    ```
    select products.productLine, count(orderdetails.quantityOrdered) from products inner join orderdetails on products.productCode = orderdetails.productCode group by products.productLine;
    ```

11. **Encontrar el promedio de la cantidad de productos ordenados por cada cliente:**

    ```
    select orders.customerNumber, avg(quantityOrdered) from orders inner join orderdetails on orders.orderNumber = orderdetails.orderNumber group by orders.customerNumber;
    ```

12. **Calcular el total de ventas realizadas en cada país:**

    ```
    select customers.country, sum(orderdetails.priceEach) from customers inner join orders on customers.customerNumber = orders.customerNumber inner join orderdetails on orders.orderNumber = orderdetails.orderNumber group by customers.country;
    ```

13. **Obtener el promedio del precio de compra de los productos por línea de productos:**

    ```
    select productLine, avg(buyPrice) from products group by productLine;
    ```

14. **Encontrar la cantidad total de productos vendidos por cada vendedor:**

    ```
    select customers.salesRepEmployeeNumber, sum(orderdetails.quantityOrdered) from customers inner join orders on customers.customerNumber = orders.customerNumber inner join orderdetails on orders.orderNumber = orderdetails.orderNumber group by customers.salesRepEmployeeNumber;
    ```

15. **Calcular el total de pagos recibidos por cada vendedor:**

    ```
    select customers.salesRepEmployeeNumber, count(payments.checkNumber) from customers inner join payments on customers.customerNumber = payments.customerNumber group by customers.salesRepEmployeeNumber;
    ```

16. **Obtener el promedio del límite de crédito de los clientes atendidos por cada vendedor:**

    ```
    select salesRepEmployeeNumber, avg(creditLimit) from customers group by salesRepEmployeeNumber;
    ```

17. **Encontrar el total de ventas realizadas por cada oficina:**

    ```
    select employees.officeCode, count(orders.orderNumber) from employees inner join customers on employees.employeeNumber = customers.salesRepEmployeeNumber inner join orders on customers.customerNumber = orders.customerNumber where orders.status != ('Cancelled') group by employees.officeCode order by employees.officeCode asc;
    ```

18. **Calcular la cantidad media de productos pedidos por cada cliente:**

    ```
    select orders.customerNumber, avg(orderdetails.quantityOrdered) from orders inner join orderdetails on orders.orderNumber = orderdetails.orderNumber group by orders.customerNumber;
    ```

19. **Obtener el total de pagos realizados en cada año:**

    ```
    select year(paymentDate) as yearPayment, count(checkNumber) from payments group by yearPayment order by yearPayment asc;
    ```

20. **Encontrar el promedio del precio de venta (priceEach) de los productos por línea de productos:**

    ```
    select productLine, avg(buyPrice) from products group by productLine;
    ```