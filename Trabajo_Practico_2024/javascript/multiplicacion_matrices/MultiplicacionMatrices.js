const fs = require('fs');
const readline = require('readline');

/**
 * Lee una matriz desde un archivo CSV.
 * @param {string} filePath - La ruta al archivo CSV.
 * @returns {Promise<number[][]>} Una promesa que resuelve con la matriz leída.
 */
async function readMatrixFromFile(filePath) {
  const fileStream = fs.createReadStream(filePath); // Crea un flujo de lectura desde el archivo
  const rl = readline.createInterface({ input: fileStream }); // Crea una interfaz de lectura de líneas

  const matrix = [];
  for await (const line of rl) { // Itera sobre cada línea del archivo
    matrix.push(line.split(',').map(Number)); // Divide la línea por comas y convierte a números
  }

  return matrix; // Retorna la matriz leída desde el archivo
}

/**
 * Genera una matriz aleatoria con valores entre min y max.
 * @param {number} rows - Número de filas.
 * @param {number} cols - Número de columnas.
 * @param {number} min - Valor mínimo para los elementos de la matriz.
 * @param {number} max - Valor máximo para los elementos de la matriz.
 * @returns {number[][]} La matriz aleatoria generada.
 */
function generateRandomMatrix(rows, cols, min, max) {
  const matriz = [];
  for (let i = 0; i < rows; i++) {
    matriz[i] = [];
    for (let j = 0; j < cols; j++) {
      matriz[i][j] = Math.floor(Math.random() * (max - min + 1)) + min; // Genera números aleatorios entre min y max
    }
  }
  return matriz; // Retorna la matriz aleatoria generada
}

/**
 * Multiplica dos matrices y retorna el resultado.
 * @param {number[][]} matrizA - La primera matriz.
 * @param {number[][]} matrizB - La segunda matriz.
 * @returns {number[][]} La matriz resultante de la multiplicación.
 * @throws {Error} Si las matrices no son multiplicables.
 */
function multiplyMatrices(matrizA, matrizB) {
  const rowsA = matrizA.length;
  const colsA = matrizA[0].length;
  const colsB = matrizB[0].length;

  if (colsA !== matrizB.length) {
    throw new Error('No se pueden multiplicar las matrices. El número de columnas de la primera matriz debe ser igual al número de filas de la segunda matriz.');
  }

  const result = [];
  for (let i = 0; i < rowsA; i++) {
    result[i] = [];
    for (let j = 0; j < colsB; j++) {
      let sum = 0;
      for (let k = 0; k < colsA; k++) {
        sum += matrizA[i][k] * matrizB[k][j]; // Calcula el elemento resultante en la posición (i, j)
      }
      result[i][j] = sum;
    }
  }

  return result; // Retorna la matriz resultante de la multiplicación
}

/**
 * Escribe una matriz en un archivo CSV.
 * @param {string} filePath - La ruta al archivo CSV.
 * @param {number[][]} matrix - La matriz a escribir.
 */
function writeMatrixToFile(filePath, matrix) {
  const data = matrix.map(row => row.join(',')).join('\n'); // Convierte la matriz a formato CSV
  fs.writeFileSync(filePath, data); // Escribe los datos en el archivo especificado
}

/**
 * Función principal que gestiona la entrada del usuario y llama a las funciones correspondientes.
 */
async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = query => new Promise(resolve => rl.question(query, resolve));

  console.log('Bienvenido al programa de multiplicación de matrices.');

  const matrizChoice = await question('¿Cómo desea ingresar las matrices? (1=Archivo, 2=Aleatorio): ');

  let matrizA, matrizB;
  if (matrizChoice === '1') {
    const matrizAFile = await question('Ingrese la ruta del archivo para la matriz A: ');
    const matrizBFile = await question('Ingrese la ruta del archivo para la matriz B: ');
    matrizA = await readMatrixFromFile(matrizAFile); 
    matrizB = await readMatrixFromFile(matrizBFile); 
  } else if (matrizChoice === '2') {
    const rowsA = parseInt(await question('Ingrese el número de filas para la matriz A: '), 10);
    const colsA = parseInt(await question('Ingrese el número de columnas para la matriz A: '), 10);
    const rowsB = parseInt(await question('Ingrese el número de filas para la matriz B: '), 10);
    const colsB = parseInt(await question('Ingrese el número de columnas para la matriz B: '), 10);
    matrizA = generateRandomMatrix(rowsA, colsA, 1, 10); 
    matrizB = generateRandomMatrix(rowsB, colsB, 1, 10); 
  } else {
    console.error('Opción inválida.');
    rl.close();
    return;
  }

  console.log('Matriz A:');
  console.table(matrizA); // Muestra la matriz A en formato de tabla
  console.log('Matriz B:');
  console.table(matrizB); // Muestra la matriz B en formato de tabla

  try {
    const resultMatriz = multiplyMatrices(matrizA, matrizB); // Multiplica las matrices A y B
    console.log('Matriz resultante:');
    console.table(resultMatriz); // Muestra la matriz resultante en formato de tabla
    writeMatrixToFile('resultado.csv', resultMatriz); // Escribe la matriz resultante en un archivo CSV
    console.log('La matriz resultante se ha guardado en "resultado.csv".');
  } catch (error) {
    console.error(error.message); // Captura y muestra errores de multiplicación de matrices
  }

  rl.close(); // Cierra la interfaz readline
}

main(); // Llama a la función principal para iniciar el programa
