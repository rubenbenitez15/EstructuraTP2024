import random

# Función para leer una matriz desde un archivo CSV
def leer_matriz_desde_archivo(nombre_archivo):
    try:
        with open(nombre_archivo, 'r') as f:
            # Inicializa una lista vacía para almacenar la matriz
            matriz = []
            # Itera sobre cada línea del archivo
            for linea in f:
                # Divide la línea por comas y convierte cada valor a entero
                fila = [int(valor) for valor in linea.strip().split(',')]
                # Agrega la fila a la matriz
                matriz.append(fila)
            return matriz
    except FileNotFoundError:
        print(f"Error: Archivo '{nombre_archivo}' no encontrado.")
        return None

# Función para generar una matriz aleatoria de números entre 1 y 10
def generar_matriz_aleatoria(filas, columnas):
    matriz = []
    # Itera sobre el número de filas
    for t in range(filas):
        fila = []
        # Itera sobre el número de columnas
        for t in range(columnas):
            # Genera un número aleatorio entre 1 y 10 y lo agrega a la fila
            fila.append(random.randint(1, 10))
        # Agrega la fila a la matriz
        matriz.append(fila)
    return matriz

# Función para multiplicar dos matrices
def multiplicar_matrices(matriz1, matriz2):
    # Verifica si las matrices se pueden multiplicar
    if len(matriz1[0]) != len(matriz2):
        print("Error: Las matrices no se pueden multiplicar.")
        return None
    
    # Inicializa una lista vacía para almacenar el resultado de la multiplicación
    resultado = []
    # Itera sobre las filas de la matriz 1
    for fila_a in matriz1:
        # Inicializa una lista vacía para la fila actual del resultado
        fila_resultado = []
        # Itera sobre las columnas de la matriz 2 (transpuesta)
        for columna_b in zip(*matriz2):
            # Calcula el producto punto de la fila_a y columna_b
            producto = sum(a * b for a, b in zip(fila_a, columna_b))
            # Agrega el producto a la fila del resultado
            fila_resultado.append(producto)
        # Agrega la fila del resultado a la matriz resultado
        resultado.append(fila_resultado)
    return resultado

# Función para generar y guardar una matriz aleatoria en un archivo CSV
def generar_matriz_csv(nombre_archivo, filas, columnas):
    with open(nombre_archivo, 'w') as f:
        # Itera sobre el número de filas
        for _ in range(filas):
            # Genera una fila de números aleatorios entre 1 y 10 como cadenas
            fila = [str(random.randint(1, 10)) for _ in range(columnas)]
            # Escribe la fila en el archivo CSV, separando los valores por comas
            f.write(','.join(fila) + '\n')

# Función para guardar una matriz en un archivo de texto
def guardar_matriz_en_archivo(matriz, nombre_archivo):
    with open(nombre_archivo, 'w') as f:
        # Itera sobre las filas de la matriz
        for fila in matriz:
            # Convierte cada valor de la fila a cadena y los une por comas
            linea = ','.join(str(valor) for valor in fila)
            # Escribe la línea en el archivo de texto
            f.write(linea + '\n')


if __name__ == '__main__':
    opcion = input("¿Desea ingresar las matrices a travez de archivos (a) o generarlas (g)? ")

    if opcion.lower() == 'a':
        nombre_archivo_matriz1 = input("Ingrese el nombre del archivo de la primera matriz: ")
        nombre_archivo_matriz2 = input("Ingrese el nombre del archivo de la segunda matriz: ")
        matriz1 = leer_matriz_desde_archivo(nombre_archivo_matriz1)
        matriz2 = leer_matriz_desde_archivo(nombre_archivo_matriz2)
    elif opcion.lower() == 'g':
        filas_matriz1 = int(input("Ingrese el número de filas de la primera matriz: "))
        columnas_matriz1 = int(input("Ingrese el número de columnas de la primera matriz: "))
        filas_matriz2 = int(input("Ingrese el número de filas de la segunda matriz: "))
        columnas_matriz2 = int(input("Ingrese el número de columnas de la segunda matriz: "))
        matriz1 = generar_matriz_aleatoria(filas_matriz1, columnas_matriz1)
        matriz2 = generar_matriz_aleatoria(filas_matriz2, columnas_matriz2)
    else:
        print("Opción inválida.")
        exit()

    if matriz1 is not None and matriz2 is not None:
        print("Matriz 1:")
        for fila in matriz1:
            print(fila)
        print("\nMatriz 2:")
        for fila in matriz2:
            print(fila)

        resultado = multiplicar_matrices(matriz1, matriz2)

        if resultado is not None:
            print("\nResultado:")
            for fila in resultado:
                print(fila)
            guardar_matriz_en_archivo(resultado, 'resultado.csv')
            print("\nLa matriz resultante se ha guardado en 'resultado.csv'.")
