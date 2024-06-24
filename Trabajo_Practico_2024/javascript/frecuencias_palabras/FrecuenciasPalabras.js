const fs = require('fs');
const readline = require('readline');

// Definición de conectores y pronombres a filtrar
const conectores_pronombres = [
  'y', 'e', 'ni', 'que', 'o', 'u', 'pero', 'mas', 'sino', 'aunque', 'tal', 'es', 's', 'n',
  'porque', 'pues', 'como', 'si', 'cuando', 'mientras', 'tan', 'tanto', 'más', 'est',
  'según', 'donde', 'a', 'ante', 'bajo', 'cabe', 'con', 'contra', 'de', 'al', 'qu',
  'desde', 'en', 'entre', 'hacia', 'hasta', 'para', 'por', 'según', 'un', 'qué',
  'sin', 'so', 'sobre', 'tras', 'yo', 'tú', 'él', 'ella', 'nosotros', 'del',
  'nosotras', 'vosotros', 'vosotras', 'ellos', 'ellas', 'me', 'te', 'su', 'm',
  'se', 'nos', 'os', 'mío', 'mía', 'míos', 'mías', 'tuyo', 'tuya', 'una', 's',
  'tuyos', 'tuyas', 'suyo', 'suya', 'suyos', 'suyas', 'nuestro', 'mis', 'mas',
  'nuestra', 'nuestros', 'nuestras', 'vuestro', 'vuestra', 'vuestros', 'mi',
  'vuestras', 'este', 'esta', 'estos', 'estas', 'ese', 'esa', 'esos', 'los',
  'esas', 'aquel', 'aquella', 'aquellos', 'aquellas', 'esto', 'eso', 'la', 'el',
  'aquello', 'lo', 'le', 'les'
];

/**
 * Función principal para contar palabras frecuentes en un archivo.
 */
function contarPalabras() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Introduce el nombre del archivo: ", nombreArchivo => {
    const inicioTiempo = performance.now(); // Iniciar temporizador

    fs.readFile(nombreArchivo, 'utf8', (err, data) => {
      if (err) {
        console.error("Error al leer el archivo:", err);
        rl.close();
        return;
      }

      // Función para limpiar y contar las palabras
      const limpiarYContarPalabras = (texto) => {
        return texto.toLowerCase()
          .replace(/[^a-záéíóúüñ\s]/g, '') // Elimina caracteres no deseados
          .split(/\s+/) // Divide por espacios en blanco para obtener palabras
          .filter(palabra => palabra && !conectores_pronombres.includes(palabra)); // Filtra palabras vacías y conectores/pronombres
      };

      const palabras = limpiarYContarPalabras(data);

      const frecuenciaPalabras = {};
      palabras.forEach(palabra => {
        frecuenciaPalabras[palabra] = (frecuenciaPalabras[palabra] || 0) + 1;
      });

      // Ordenar y mostrar las 10 palabras más frecuentes
      const palabrasOrdenadas = Object.entries(frecuenciaPalabras)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

      console.log("Palabras más frecuentes:");
      palabrasOrdenadas.forEach(([palabra, frecuencia]) => {
        console.log(`${palabra}: ${frecuencia}`);
      });

      const finTiempo = performance.now(); // Finalizar temporizador
      const tiempoEjecucion = finTiempo - inicioTiempo;
      console.log(`Tiempo de ejecución: ${tiempoEjecucion.toFixed(2)} milisegundos`);

      rl.close();
    });
  });
}

// Iniciar el programa llamando a la función principal
contarPalabras();
