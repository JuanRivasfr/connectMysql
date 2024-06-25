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
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
### 1. Consultas sobre una tabla

1. Devuelve un listado con todos los pedidos que se han realizado. Los pedidos deben estar ordenados por la fecha de realización, mostrando en primer lugar los pedidos más recientes.

   ```sql
   select date(fecha) as fecha1
   from pedido 
   order by fecha1 asc;
   ```

   

2. Devuelve todos los datos de los dos pedidos de mayor valor.

   ```sql
   SELECT * 
   FROM pedido 
   ORDER BY total DESC 
   LIMIT 2;
   ```

   

3. Devuelve un listado con los identificadores de los clientes que han realizado algún pedido. Tenga en cuenta que no debe mostrar identificadores que estén repetidos.

   ```sql
   SELECT DISTINCT id_cliente
   FROM pedido;
   ```

4. Devuelve un listado de todos los pedidos que se realizaron durante el año 2017, cuya cantidad total sea superior a 500€.

   ```sql
   SELECT *
   FROM pedido
   WHERE YEAR(fecha) = 2017 AND total > 500;
   ```

5. Devuelve un listado con el nombre y los apellidos de los comerciales que tienen una comisión entre 0.05 y 0.11.

   ```sql
   Select nombre, apellido1, apellido2 
   From comercial 
   Where comision > 0.05 and comision < 0.11;
   ```

6. Devuelve el valor de la comisión de mayor valor que existe en la tabla `comercial`.

   ```sql
   SELECT MAX(comision) AS comisionMaxima
   FROM comercial;
   ```

7. Devuelve el identificador, nombre y primer apellido de aquellos clientes cuyo segundo apellido **no** es `NULL`. El listado deberá estar ordenado alfabéticamente por apellidos y nombre.

   ```sql
   SELECT id, CONCAT(nombre,' ', apellido1) AS nombre_completo  
   FROM cliente 
   WHERE apellido2 IS NOT NULL 
   ORDER BY nombre ASC, apellido1 ASC, 
   apellido2 ASC;
   ```

   

8. Devuelve un listado de los nombres de los clientes que empiezan por `A` y terminan por `n` y también los nombres que empiezan por `P`. El listado deberá estar ordenado alfabéticamente.

   ```sql
   select nombre 
   from cliente 
   where nombre like '%n' and nombre like 'a%' or nombre like 'p%' 
   order by nombre asc;
   ```

   

9. Devuelve un listado de los nombres de los clientes que **no** empiezan por `A`. El listado deberá estar ordenado alfabéticamente.

   ```sql
   SELECT nombre
   FROM cliente
   WHERE nombre NOT LIKE 'A%'
   ORDER BY nombre;
   ```

   

10. Devuelve un listado con los nombres de los comerciales que terminan por `el` o `o`. Tenga en cuenta que se deberán eliminar los nombres repetidos.

### 2. Consultas multitabla (Composición interna)

Resuelva todas las consultas utilizando la sintaxis de `SQL1` y `SQL2`.

1. Devuelve un listado con el identificador, nombre y los apellidos de todos los clientes que han realizado algún pedido. El listado debe estar ordenado alfabéticamente y se deben eliminar los elementos repetidos.

   ```sql
   select distinct cl.id, cl.nombre, cl.apellido1, cl.apellido2 
   from cliente cl 
   inner join
   pedido pe on cl.id = pe.id_cliente 
   order by cl.nombre;
   ```

2. Devuelve un listado que muestre todos los pedidos que ha realizado cada cliente. El resultado debe mostrar todos los datos de los pedidos y del cliente. El listado debe mostrar los datos de los clientes ordenados alfabéticamente.

   ```sql
   select  c.id, c.nombre, c.apellido1, c.apellido2, c.ciudad, c.categoria, p.id, p.total, p.fecha, p.id_cliente, p.id_comercial 
   from cliente c
   inner join pedido p on c.id = p.id_cliente
   order by c.nombre asc, c.apellido1 asc;
   ```

3. Devuelve un listado que muestre todos los pedidos en los que ha participado un comercial. El resultado debe mostrar todos los datos de los pedidos y de los comerciales. El listado debe mostrar los datos de los comerciales ordenados alfabéticamente.

   ```sql
   SELECT p.id, p.total, p.fecha, p.id_cliente, p.id_comercial, cl.nombre, cl.apellido1, cl.apellido2, cl.comision 
   FROM pedido AS p 
   INNER JOIN comercial AS cl ON cl.id = p.id_comercial 
   ORDER BY nombre;
   ```

4. Devuelve un listado que muestre todos los clientes, con todos los pedidos que han realizado y con los datos de los comerciales asociados a cada pedido.

   ```sql
   SELECT c.id AS cliente_id, p.id AS pedido_id, co.id AS comercial_id, co.nombre, co.apellido1 
   FROM cliente AS c 
   INNER JOIN pedido AS p ON c.id = p.id_cliente 
   INNER JOIN comercial AS co ON p.id_comercial = co.id 
   ORDER BY c.id;
   ```

5. Devuelve un listado de todos los clientes que realizaron un pedido durante el año `2017`, cuya cantidad esté entre `300` € y `1000` €.

   ```sql
   SELECT DISTINCT cliente.nombre, cliente.apellido1, cliente.apellido2 
   FROM cliente 
   JOIN pedido ON cliente.id = pedido.id_cliente 
   WHERE YEAR(pedido.fecha) = 2017 AND pedido.total 
   BETWEEN 300 AND 1000;
   ```

6. Devuelve el nombre y los apellidos de todos los comerciales que ha participado en algún pedido realizado por `María Santana Moreno`.

   ```sql
   SELECT co.apellido1, co.nombre, co.apellido2
   FROM comercial co
   INNER JOIN pedido p ON p.id_comercial = co.id
   INNER JOIN cliente cl ON cl.id = p.id_cliente
   WHERE concat(cl.nombre, ' ',cl.apellido1, ' ',cl.apellido2) = 'Maria Santana Moreno';
   ```

7. Devuelve el nombre de todos los clientes que han realizado algún pedido con el comercial `Daniel Sáez Vega`.

   ```sql
   select * from cliente cl 
   inner join pedido pe on pe.id_cliente = cl.id 
   inner join comercial co on co.id = pe.id_comercial 
   where co.id = 1;
   ```

### 3. Consultas multitabla (Composición externa)

Resuelva todas las consultas utilizando las cláusulas `LEFT JOIN` y `RIGHT JOIN`.

1. Devuelve un listado con **todos los clientes** junto con los datos de los pedidos que han realizado. Este listado también debe incluir los clientes que no han realizado ningún pedido. El listado debe estar ordenado alfabéticamente por el primer apellido, segundo apellido y nombre de los clientes.

   ```sql
   select * from cliente 
   left join pedido pe on pe.id_cliente = cliente.id 
   order by cliente.nombre;
   ```

2. Devuelve un listado con **todos los comerciales** junto con los datos de los pedidos que han realizado. Este listado también debe incluir los comerciales que no han realizado ningún pedido. El listado debe estar ordenado alfabéticamente por el primer apellido, segundo apellido y nombre de los comerciales.

   ```sql
   SELECT co.id, concat(co.apellido1, " " ,co.apellido2, " ", co.nombre) as namefull, pe.total, pe.fecha, pe.id_cliente 
   FROM comercial co
   left JOIN pedido pe ON pe.id_comercial = co.id 
   ORDER BY namefull LIKE 'A%' ASC , namefull;
   ```

3. Devuelve un listado que solamente muestre los clientes que no han realizado ningún pedido.

   ```sql
   select * from cliente 
   left join pedido pe on pe.id_cliente = cliente.id 
   where pe.id is NULL;
   
   ```

4. Devuelve un listado que solamente muestre los comerciales que no han realizado ningún pedido.

   ```sql
   SELECT DISTINCT c.id,c.nombre, CONCAT(c.apellido1,' ',c.apellido2) AS apellido 
   FROM comercial AS c 
   LEFT JOIN pedido AS p ON c.id=p.id_comercial 
   WHERE p.id_comercial IS NULL 
   GROUP BY c.id;
   ```

   

5. Devuelve un listado con los clientes que no han realizado ningún pedido y de los comerciales que no han participado en ningún pedido. Ordene el listado alfabéticamente por los apellidos y el nombre. En en listado deberá diferenciar de algún modo los clientes y los comerciales.

   ```sql
   SELECT c.id AS id, c.nombre, 'Cliente' AS tipo
   FROM cliente c
   LEFT JOIN pedido p ON c.id = p.id_cliente
   WHERE p.id_cliente IS NULL
   
   UNION
   
   SELECT v.id AS id, v.nombre, 'Vendedor' AS tipo
   FROM comercial v
   LEFT JOIN pedido p ON v.id = p.id_comercial
   WHERE p.id_comercial IS NULL;
   ```

   

### 4. Consultas resumen

1. Calcula la cantidad total que suman todos los pedidos que aparecen en la tabla `pedido`.

   ```sql
   select count(*) as total_pedidos, SUM(total) as Suma_Total 
   from pedido;
   ```

   

2. Calcula la cantidad media de todos los pedidos que aparecen en la tabla `pedido`.

   ```sql
   select count(*) as total_pedidos, (SUM(total))/(count(*)) as Suma_Total 
   from pedido;
   ```

   

3. Calcula el número total de comerciales distintos que aparecen en la tabla `pedido`.

   ```sql
   select count(distinct id_comercial) 
   from pedido;
   ```

   

4. Calcula el número total de clientes que aparecen en la tabla `cliente`.

   ```sql
   select count(*) as Total from cliente;
   ```

   

5. Calcula cuál es la mayor cantidad que aparece en la tabla `pedido`.

   ```sql
   SELECT MAX(total) FROM pedido;
   ```

   

6. Calcula cuál es la menor cantidad que aparece en la tabla `pedido`.

   ```sql
   SELECT MIN(total) FROM pedido;
   ```

   

7. Calcula cuál es el valor máximo de categoría para cada una de las ciudades que aparece en la tabla `cliente`.

   ```sql
   select distinct(ciudad), max(categoria) 
   from cliente 
   group by ciudad;
   ```

   

8. Calcula cuál es el máximo valor de los pedidos realizados durante el mismo día para cada uno de los clientes. Es decir, el mismo cliente puede haber realizado varios pedidos de diferentes cantidades el mismo día. Se pide que se calcule cuál es el pedido de máximo valor para cada uno de los días en los que un cliente ha realizado un pedido. Muestra el identificador del cliente, nombre, apellidos, la fecha y el valor de la cantidad.

   ```sql
   SELECT t1.id, t1.nombre, t1.apellido1, MAX(t2.total),     t2.fecha 
   FROM cliente t1, pedido t2 
   WHERE t2.id_cliente = t1.id GROUP BY t2.fecha, t1.id ORDER BY t2.fecha;
   ```

   

9. Calcula cuál es el máximo valor de los pedidos realizados durante el mismo día para cada uno de los clientes, teniendo en cuenta que sólo queremos mostrar aquellos pedidos que superen la cantidad de 2000 €.

   ```sql
   SELECT p.*
   FROM pedido p
   INNER JOIN (
      SELECT id_cliente, fecha, MAX(total) AS max_total
      FROM pedido
      WHERE total > 2000
      GROUP BY id_cliente, fecha
   ) po ON p.id_cliente = po.id_cliente AND p.fecha = po.fecha AND p.total = po.max_total;
      
   ```

   

10. Calcula el máximo valor de los pedidos realizados para cada uno de los comerciales durante la fecha `2016-08-17`. Muestra el identificador del comercial, nombre, apellidos y total.

    ```sql
    SELECT co.id, co.nombre, co.apellido1, co.apellido2, MAX(p.total) AS Total
    FROM comercial co
    INNER JOIN pedido p ON p.id_comercial = co.id
    WHERE p.fecha = '2016-08-17'
    GROUP BY co.id, co.nombre, co.apellido1, co.apellido2;
    ```

    

11. Devuelve un listado con el identificador de cliente, nombre y apellidos y el número total de pedidos que ha realizado cada uno de clientes. Tenga en cuenta que pueden existir clientes que no han realizado ningún pedido. Estos clientes también deben aparecer en el listado indicando que el número de pedidos realizados es `0`.

    ```sql
    SELECT cliente.id, cliente.apellido1, cliente.apellido2, COUNT(pedido.id)
    FROM cliente
    LEFT JOIN pedido ON cliente.id=pedido.id_cliente
    GROUP BY cliente.id;
    ```

    

12. Devuelve un listado con el identificador de cliente, nombre y apellidos y el número total de pedidos que ha realizado cada uno de clientes **durante el año 2017**.

    ```sql
    select cliente.id, cliente.nombre, cliente.apellido1, cliente.apellido2, count(pedido.id) as cantidad2017 
    from cliente 
    inner join pedido on pedido.id_cliente = cliente.id 
    where year(pedido.fecha) = 2017 
    group by cliente.id;
    ```

    

13. Devuelve un listado que muestre el identificador de cliente, nombre, primer apellido y el valor de la máxima cantidad del pedido realizado por cada uno de los clientes. El resultado debe mostrar aquellos clientes que no han realizado ningún pedido indicando que la máxima cantidad de sus pedidos realizados es `0`. Puede hacer uso de la función [`IFNULL`](https://dev.mysql.com/doc/refman/8.0/en/control-flow-functions.html#function_ifnull).

    ```sql
    SELECT C.id, C.nombre, C.apellido1, IFNULL(max(P.total), 0) AS 'Cantidad maxima'
    FROM cliente AS C
    LEFT JOIN pedido as P
    ON C.id = P.id_cliente
    GROUP BY C.id;
    ```

    

14. Devuelve cuál ha sido el pedido de máximo valor que se ha realizado cada año.

    ```sql
        SELECT 
        pedidos.id,
        YEAR(pedidos.fecha) AS Año,
        pedidos.total AS 'Maximo Valor',
        pedidos.fecha AS 'Fecha Completa',
        pedidos.id_cliente AS 'ID Cliente',
        pedidos.id_comercial AS 'ID Comercial'
        FROM 
        pedido pedidos JOIN (
          SELECT
          YEAR(fecha) AS Año,
          max(total) AS Valor_Maximo
          FROM 
          pedido
          GROUP BY 
          año 
          ORDER BY 
          año) 
       AS max_ped_por_año 
       ON Año = max_ped_por_año.Año 
       AND pedidos.total = max_ped_por_año.Valor_Maximo;
        
    ```

    

15. Devuelve el número total de pedidos que se han realizado cada año.

    ```sql
    SELECT YEAR(fecha) AS año, COUNT(*) AS numero_pedido FROM pedido GROUP BY YEAR(fecha) ORDER BY año;
    ```

    

#### 5. Subconsultas con `IN` y `NOT IN`

1. Devuelve un listado de los clientes que no han realizado ningún pedido. (Utilizando `IN` o `NOT IN`).

   ```sql
   SELECT cl.id, cl.nombre, cl.apellido1, cl.apellido2
   FROM cliente cl
   WHERE cl.id NOT IN (SELECT DISTINCT p.id_cliente FROM pedido p);
   ```

   

2. Devuelve un listado de los comerciales que no han realizado ningún pedido. (Utilizando `IN` o `NOT IN`).

```sql
SELECT v.id, v.nombre, v.apellido1, v.apellido2
FROM comercial v
WHERE v.id NOT IN (SELECT DISTINCT p.id_comercial FROM pedido p);
```

