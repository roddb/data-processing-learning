// Importamos las librerías necesarias
const Papa = require('papaparse');
const fs = require('fs');

// Función para calcular la suma de ventas
function calcularTotalVentas(datos) {
    return datos.reduce((total, row) => total + Number(row.ventas), 0);
}

// Función para agrupar ventas por categoría
function ventasPorCategoria(datos) {
    const ventasCat = {};
    datos.forEach(row => {
        if (!ventasCat[row.categoria]) {
            ventasCat[row.categoria] = 0;
        }
        ventasCat[row.categoria] += Number(row.ventas);
    });
    return ventasCat;
}

// Función para agrupar ventas por región
function ventasPorRegion(datos) {
    const ventasReg = {};
    datos.forEach(row => {
        if (!ventasReg[row.region]) {
            ventasReg[row.region] = 0;
        }
        ventasReg[row.region] += Number(row.ventas);
    });
    return ventasReg;
}

// Función principal para procesar datos
async function procesarDatos() {
    console.log('Iniciando procesamiento de datos...');
    
    try {
        // Leer el archivo CSV
        const csvData = fs.readFileSync('./data/ventas_mensuales.csv', 'utf8');
        
        // Parsear el CSV
        Papa.parse(csvData, {
            header: true,
            complete: function(results) {
                const datos = results.data;
                
                // Calcular y mostrar estadísticas
                console.log('\n=== Resumen de Ventas ===');
                console.log(`Total de ventas: $${calcularTotalVentas(datos)}`);
                
                console.log('\n=== Ventas por Categoría ===');
                const ventasCat = ventasPorCategoria(datos);
                Object.entries(ventasCat).forEach(([cat, total]) => {
                    console.log(`${cat}: $${total}`);
                });
                
                console.log('\n=== Ventas por Región ===');
                const ventasReg = ventasPorRegion(datos);
                Object.entries(ventasReg).forEach(([reg, total]) => {
                    console.log(`${reg}: $${total}`);
                });
            }
        });
    } catch (error) {
        console.error('Error al procesar los datos:', error);
    }
}

// Ejecutar la función principal
procesarDatos();