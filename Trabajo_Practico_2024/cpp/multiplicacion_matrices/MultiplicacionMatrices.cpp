#include <iostream>
#include <fstream>
#include <vector>
#include <sstream>
#include <cstdlib>
#include <ctime>

using namespace std;

// Función para leer una matriz de un archivo
vector<vector<int>> leerMatrizDeArchivo(string nombreArchivo) {
    vector<vector<int>> matriz;
    ifstream archivo(nombreArchivo);

    if (archivo.is_open()) {
        string linea;
        while (getline(archivo, linea)) {
            vector<int> fila;
            stringstream ss(linea);
            string valor;
            while (getline(ss, valor, ',')) {
                fila.push_back(stoi(valor));
            }
            matriz.push_back(fila);
        }
        archivo.close();
    } else {
        cout << "No se pudo abrir el archivo: " << nombreArchivo << endl;
    }

    return matriz;
}

// Función para generar una matriz aleatoria
vector<vector<int>> generarMatrizAleatoria(int filas, int columnas) {
    vector<vector<int>> matriz(filas, vector<int>(columnas));
    srand(time(0));
    for (int i = 0; i < filas; ++i) {
        for (int j = 0; j < columnas; ++j) {
            matriz[i][j] = rand() % 10; // Genera números aleatorios entre 0 y 9
        }
    }
    return matriz;
}

// Función para multiplicar dos matrices
vector<vector<int>> multiplicarMatrices(const vector<vector<int>>& A, const vector<vector<int>>& B) {
    int filasA = A.size();
    int columnasA = A[0].size();
    int columnasB = B[0].size();

    vector<vector<int>> resultado(filasA, vector<int>(columnasB, 0));

    for (int i = 0; i < filasA; ++i) {
        for (int j = 0; j < columnasB; ++j) {
            for (int k = 0; k < columnasA; ++k) {
                resultado[i][j] += A[i][k] * B[k][j];
            }
        }
    }

    return resultado;
}

// Función para imprimir una matriz en la consola
void imprimirMatriz(const vector<vector<int>>& matriz) {
    for (const auto & fila : matriz) {
        for (int valor : fila) {
            cout << valor << " ";
        }
        cout << endl;
    }
}

// Función para guardar una matriz en un archivo
void guardarMatrizEnArchivo(const vector<vector<int>>& matriz, string nombreArchivo) {
    ofstream archivo(nombreArchivo);
    if (archivo.is_open()) {
        for (const auto & fila : matriz) {
            for (size_t j = 0; j < fila.size(); ++j) {
                archivo << fila[j];
                if (j < fila.size() - 1) {
                    archivo << ",";
                }
            }
            archivo << endl;
        }
        archivo.close();
        cout << "Matriz guardada en el archivo: " << nombreArchivo << endl;
    } else {
        cout << "No se pudo abrir el archivo: " << nombreArchivo << endl;
    }
}

int main() {
    int opcion;
    cout << "Seleccione una opcion:\n";
    cout << "1. Leer matrices de archivos\n";
    cout << "2. Generar matrices aleatorias\n";
    cin >> opcion;

    vector<vector<int>> matrizA;
    vector<vector<int>> matrizB;

    if (opcion == 1) {
        string archivoMatrizA, archivoMatrizB;
        cout << "Ingrese el nombre del archivo de la matriz A: ";
        cin >> archivoMatrizA;
        cout << "Ingrese el nombre del archivo de la matriz B: ";
        cin >> archivoMatrizB;
        matrizA = leerMatrizDeArchivo(archivoMatrizA);
        matrizB = leerMatrizDeArchivo(archivoMatrizB);
    } else if (opcion == 2) {
        int filasA, columnasA, filasB, columnasB;
        cout << "Ingrese el numero de filas de la matriz A: ";
        cin >> filasA;
        cout << "Ingrese el numero de columnas de la matriz A: ";
        cin >> columnasA;
        cout << "Ingrese el numero de filas de la matriz B: ";
        cin >> filasB;
        cout << "Ingrese el numero de columnas de la matriz B: ";
        cin >> columnasB;

        // Verificar si las matrices se pueden multiplicar
        if (columnasA != filasB) {
            cerr << "Error: El numero de columnas de la matriz A debe ser igual al numero de filas de la matriz B." << endl;
            return 1;
        }

        matrizA = generarMatrizAleatoria(filasA, columnasA);
        matrizB = generarMatrizAleatoria(filasB, columnasB);
    } else {
        cerr << "Opción inválida." << endl;
        return 1;
    }

    cout << "Matriz A:\n";
    imprimirMatriz(matrizA);
    cout << "Matriz B:\n";
    imprimirMatriz(matrizB);

    vector<vector<int>> resultado = multiplicarMatrices(matrizA, matrizB);

    cout << "Resultado:\n";
    imprimirMatriz(resultado);

    // Guardar el resultado en un archivo
    guardarMatrizEnArchivo(resultado, "resultado.csv");

    return 0;
}