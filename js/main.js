import { 
    getAllProductsDescription, 
    getAllProductsWithThemDescriptionsAndLineProducts,
    getAllProductsInStock,
    getAllPriceAvgOfProducts,
    getTheAvgOfTheProducts,
    getTotalPriceOfProduct,
    getAvgOfMSRP,
    getAllTotalProductsOrderedByClient,
    getAvgOfProductsInStock,
    getAllProductsSale,
    getAvgOfProductsOrderedByClient,
    getAvgOfProductsByLineProducts,
    getAllProductsSoldByEmployee,
    getAvgProductsByClient,
    getAvgProductsByLineProducts
} from "./module/products.js";

import { 
    getAllClientsFromUSA,
    getAllCreditLimitPromFromClients,
    getAvgFromCreditLimitForCountry,
    getAvgFromCreditLimitByEmployee
} from "./module/customers.js";

import { 
    getAllEmployeesThatWorkInSF,
    getAllEmployeesNameThatReportAnEmployeeWithCode1143,
    getAllEmployees,
    getAllEmployeesForJob
} from "./module/employees.js";

import { 
    getAllOrdersWithShippedStatus,
    getAllOrdersMadeFromClientsInFrance,
    getAllOrdersMadeAndDetailsFromClient,
    getAllTotalOrdersForClient,
    getAllTotalOrdersByClient,
    getAvgOfVentasByEmployee,
    getAllOdersByEmployee,
    getAllOdersOdersByCountry,
    getAllOdersByOffice
} from "./module/orders.js";

import { 
    getAllPaymentsFromClient,
    getAllPaymentsFromAllClients,
    getTheSumOfAllPayments,
    getTotalPaymentsForClient,
    getTotalPaymentsByCountry,
    getTotalPaymentsByEmployee,
    getTotalPaymentsByYear
} from "./module/payments.js";

import { getAllOfficesFromCountry } from "./module/offices.js";

console.log(await getAvgProductsByLineProducts())
