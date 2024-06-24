import { connection } from  "../../db/connection.js";

//2. **Encontrar todos los empleados que trabajan en la oficina de 'San Francisco':**

export const getAllEmployeesThatWorkInSF = async()=>{
    let [result] = await connection.query(
        `select employees.firstName, employees.lastName, offices.city 
        from employees join offices on employees.officeCode = offices.officeCode 
        where offices.city = "San Francisco";`)
    return result
}

//### Consultas de múltiples tablas

//2. **Obtener los nombres y direcciones de correo electrónico de los empleados que reportan al empleado con el número de empleado 1143:**

export const getAllEmployeesNameThatReportAnEmployeeWithCode1143 = async()=>{
    let [result] = await connection.query(
        `select firstName, lastName, email, reportsTo 
        from employees 
        where reportsTo = 1143;`)
    return result
}

//## Parte 2/2

//### Consultas de una sola tabla

//6. **Obtener la cantidad total de empleados:**

export const getAllEmployees = async()=>{
    let [result] = await connection.query(
        `select count(*) as empleados_totales 
        from employees;`)
    return result
}

//10. **Contar la cantidad de empleados por título de trabajo:**

export const getAllEmployeesForJob = async()=>{
    let [result] = await connection.query(
        `select jobTitle, count(*) 
        from employees 
        group by jobTitle;`)
    return result
}

