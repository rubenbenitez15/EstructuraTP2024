#include <iostream>
#include <fstream>
#include <string>
#include <map>
#include <algorithm>
#include <vector>
#include <set> 
#include <chrono> // Biblioteca para manejo de tiempo

using namespace std;
using namespace std::chrono; // Espacio de nombres para chrono

// Función para comparar pares (palabra, frecuencia) por frecuencia en orden descendente
bool compararFrecuencia(const pair<string, int>& a, const pair<string, int>& b) {
    return a.second > b.second;
}

int main() {
    // Nombre del archivo de texto
    string nombreArchivo;
    cout << "Ingrese el nombre del archivo: ";
    cin >> nombreArchivo;

    // Abrir el archivo de texto
    ifstream archivo(nombreArchivo);

    // Verificar si el archivo se abrió correctamente
    if (!archivo.is_open()) {
        cerr << "No se pudo abrir el archivo: " << nombreArchivo << endl;
        return 1;
    }

    // Conjunto para almacenar los conectores y pronombres a filtrar
    set<string> conectoresPronombres = {
        "y", "e", "ni", "que", "o", "u", "pero", "mas", "sino", "aunque", "tal", "es",
        "porque", "pues", "como", "si", "cuando", "mientras", "tan", "tanto", "mas",
        "según", "donde", "a", "ante", "bajo", "cabe", "con", "contra", "de", "al",
        "desde", "en", "entre", "hacia", "hasta", "para", "por", "según", "un", "qué",
        "sin", "so", "sobre", "tras", "yo", "tú", "él", "ella", "nosotros", "del",
        "nosotras", "vosotros", "vosotras", "ellos", "ellas", "me", "te", "su","qu",
        "se", "nos", "os", "mío", "mía", "míos", "mías", "tuyo", "tuya", "una",
        "tuyos", "tuyas", "suyo", "suya", "suyos", "suyas", "nuestro", "mis", "mas",
        "nuestra", "nuestros", "nuestras", "vuestro", "vuestra", "vuestros", "mi",
        "vuestras", "este", "esta", "estos", "estas", "ese", "esa", "esos", "los", "ni", "es",
        "esas", "aquel", "aquella", "aquellos", "aquellas", "esto", "eso", "la", "el",
        "aquello", "lo", "le", "les"
    };

    // Mapa para almacenar la frecuencia de las palabras
    map<string, int> frecuenciaPalabras;

    // Iniciar el temporizador
    auto inicio = high_resolution_clock::now();

    // Leer el archivo palabra por palabra
    string palabra;
    while (archivo >> palabra) {
        // Eliminar caracteres no alfanuméricos del principio y el final de la palabra
        palabra.erase(palabra.begin(), find_if(palabra.begin(), palabra.end(), ::isalnum));
        palabra.erase(find_if(palabra.rbegin(), palabra.rend(), ::isalnum).base(), palabra.end());

        // Convertir la palabra a minúsculas
        transform(palabra.begin(), palabra.end(), palabra.begin(), ::tolower);

        // Filtrar pronombres y conectores
        if (!palabra.empty() && conectoresPronombres.find(palabra) == conectoresPronombres.end()) {
            frecuenciaPalabras[palabra]++;
        }
    }

    // Detener el temporizador y calcular la duración
    auto fin = high_resolution_clock::now();
    auto duracion = duration_cast<milliseconds>(fin - inicio);

    // Cerrar el archivo
    archivo.close();

    // Crear un vector de pares (palabra, frecuencia) a partir del mapa
    vector<pair<string, int>> paresFrecuencia(frecuenciaPalabras.begin(), frecuenciaPalabras.end());

    // Ordenar el vector por frecuencia en orden descendente
    sort(paresFrecuencia.begin(), paresFrecuencia.end(), compararFrecuencia);

    // Mostrar las 10 palabras más frecuentes y su conteo
    cout << "\nLas 10 palabras mas frecuentes:\n";
    for (int i = 0; i < min(10, (int)paresFrecuencia.size()); ++i) {
        cout << paresFrecuencia[i].first << ": " << paresFrecuencia[i].second << endl;
    }

    // Mostrar el tiempo de ejecución
    cout << "\nTiempo de ejecucion: " << duracion.count() << " milisegundos" << endl;

    return 0;
}
