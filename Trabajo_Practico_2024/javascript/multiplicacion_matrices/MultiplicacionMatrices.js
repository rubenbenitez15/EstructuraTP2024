const fs = require('fs');
const readline = require('readline');

/**
 * Lee una matriz de un archivo CSV.
 * @param {string} filePath - La ruta al archivo CSV.
 * @returns {Promise<number[][]>} Una promesa que se resuelve con la matriz.
 */
async function readMatrixFromFile(filePath) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({ input: fileStream });

  const matrix = [];
  for await (const line of rl) {
    matrix.push(line.split(',').map(Number));
  }

  return matrix;
}

/**
 * Genera una matriz aleatoria.
 * @param {number} rows - El número de filas.
 * @param {number} cols - El número de columnas.
 * @param {number} min - El valor mínimo.
 * @param {number} max - El valor máximo.
 * @returns {number[][]} La matriz generada aleatoriamente.
 */
function generateRandomMatrix(rows, cols, min, max) {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    matrix[i] = [];
    for (let j = 0; j < cols; j++) {
      matrix[i][j] = Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
  return matrix;
}

/**
 * Multiplica dos matrices.
 * @param {number[][]} matrixA - La primera matriz.
 * @param {number[][]} matrixB - La segunda matriz.
 * @returns {number[][]} La matriz resultante.
 * @throws {Error} Si las matrices no son multiplicables.
 */
function multiplyMatrices(matrixA, matrixB) {
  const rowsA = matrixA.length;
  const colsA = matrixA[0].length;
  const colsB = matrixB[0].length;

  if (colsA !== matrixB.length) {
    throw new Error('No se pueden multiplicar las matrices. El número de columnas de la primera matriz debe ser igual al número de filas de la segunda matriz.');
  }

  const result = [];
  for (let i = 0; i < rowsA; i++) {
    result[i] = [];
    for (let j = 0; j < colsB; j++) {
      let sum = 0;
      for (let k = 0; k < colsA; k++) {
        sum += matrixA[i][k] * matrixB[k][j];
      }
      result[i][j] = sum;
    }
  }

  return result;
}

/**
 * Escribe una matriz en un archivo CSV.
 * @param {string} filePath - La ruta al archivo CSV.
 * @param {number[][]} matrix - La matriz a escribir.
 */
function writeMatrixToFile(filePath, matrix) {
  const data = matrix.map(row => row.join(',')).join('\n');
  fs.writeFileSync(filePath, data);
}

/**
 * Función principal.
 */
async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = query => new Promise(resolve => rl.question(query, resolve));

  console.log('Bienvenido al programa de multiplicación de matrices.');

  const matrixChoice = await question('¿Cómo desea ingresar las matrices? (1=Archivo, 2=Aleatorio): ');

  let matrixA, matrixB;
  if (matrixChoice === '1') {
    const matrixAFile = await question('Ingrese la ruta del archivo para la matriz A: ');
    const matrixBFile = await question('Ingrese la ruta del archivo para la matriz B: ');
    matrixA = await readMatrixFromFile(matrixAFile);
    matrixB = await readMatrixFromFile(matrixBFile);
  } else if (matrixChoice === '2') {
    const rowsA = parseInt(await question('Ingrese el número de filas para la matriz A: '), 10);
    const colsA = parseInt(await question('Ingrese el número de columnas para la matriz A: '), 10);
    const rowsB = parseInt(await question('Ingrese el número de filas para la matriz B: '), 10);
    const colsB = parseInt(await question('Ingrese el número de columnas para la matriz B: '), 10);
    matrixA = generateRandomMatrix(rowsA, colsA, 1, 10);
    matrixB = generateRandomMatrix(rowsB, colsB, 1, 10);
  } else {
    console.error('Opción inválida.');
    rl.close();
    return;
  }

  console.log('Matriz A:');
  console.table(matrixA);
  console.log('Matriz B:');
  console.table(matrixB);

  try {
    const resultMatrix = multiplyMatrices(matrixA, matrixB);
    console.log('Matriz resultante:');
    console.table(resultMatrix);
    writeMatrixToFile('resultado.csv', resultMatrix);
    console.log('La matriz resultante se ha guardado en "resultado.csv".');
  } catch (error) {
    console.error(error.message);
  }

  rl.close();
}

main();
