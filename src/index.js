// Importamos las librerías necesarias
const Papa = require('papaparse');
const fs = require('fs');

// Función principal para procesar datos
async function procesarDatos() {
    console.log('Iniciando procesamiento de datos...');
    
    try {
        // Leer el archivo CSV
        const csvData = fs.readFileSync('./data/sample.csv', 'utf8');
        
        // Parsear el CSV
        Papa.parse(csvData, {
            header: true,
            complete: function(results) {
                console.log('Datos procesados:');
                console.log(results.data);
                
                // Aquí añadiremos más procesamiento...
            }
        });
    } catch (error) {
        console.error('Error al procesar los datos:', error);
    }
}

// Ejecutar la función principal
procesarDatos();