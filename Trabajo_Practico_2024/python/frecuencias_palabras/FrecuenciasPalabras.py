import re  
from collections import Counter  # Importar Counter para contar elementos fácilmente
import time  # Importar time para medir el tiempo de ejecución

def contar_palabras(nombre_archivo):
    # Definir un conjunto de palabras que se van a filtrar (conectores y pronombres)
    conectores_pronombres = {
        'y', 'e', 'ni', 'que', 'o', 'u', 'pero', 'mas', 'sino', 'aunque', 'tal', 'es',
        'porque', 'pues', 'como', 'si', 'cuando', 'mientras', 'tan', 'tanto', 'más',
        'según', 'donde', 'a', 'ante', 'bajo', 'cabe', 'con', 'contra', 'de', 'al',
        'desde', 'en', 'entre', 'hacia', 'hasta', 'para', 'por', 'según', 'un', 'qué',
        'sin', 'so', 'sobre', 'tras', 'yo', 'tú', 'él', 'ella', 'nosotros', 'del',
        'nosotras', 'vosotros', 'vosotras', 'ellos', 'ellas', 'me', 'te', 'su',
        'se', 'nos', 'os', 'mío', 'mía', 'míos', 'mías', 'tuyo', 'tuya', 'una',
        'tuyos', 'tuyas', 'suyo', 'suya', 'suyos', 'suyas', 'nuestro', 'mis', 'mas',
        'nuestra', 'nuestros', 'nuestras', 'vuestro', 'vuestra', 'vuestros', 'mi',
        'vuestras', 'este', 'esta', 'estos', 'estas', 'ese', 'esa', 'esos', 'los',
        'esas', 'aquel', 'aquella', 'aquellos', 'aquellas', 'esto', 'eso', 'la', 'el',
        'aquello', 'lo', 'le', 'les'
    }
    
    # Abrir el archivo y leer su contenido
    with open(nombre_archivo, 'r', encoding='utf-8') as archivo:
        texto = archivo.read()
    
    # Encontrar todas las palabras en el texto usando una expresión regular para limpiar las basuras, texto/inicio/letrasodigitos/fin
    palabras = re.findall(r'\b\w+\b', texto.lower())
    
    # Filtrar las palabras que no están en el conjunto de conectores y pronombres
    palabras_filtradas = [palabra for palabra in palabras if palabra not in conectores_pronombres]
    
    # Contar la frecuencia de cada palabra filtrada 
    conteo_palabras = Counter(palabras_filtradas)
    
    return conteo_palabras

def mostrar_palabras_frecuentes(conteo_palabras, n=10):
    # Mostrar las palabras más frecuentes utilizando 
    print(f"Las {n} palabras más frecuentes son:")
    for palabra, conteo in conteo_palabras.most_common(n):
        print(f"{palabra}: {conteo}")

if __name__ == "__main__":
    nombre_archivo = input("Ingresa el nombre del archivo: ")  # Pedir al usuario el nombre del archivo
    
    start_time = time.time()  # Iniciar el conteo de tiempo de ejecución
    
    conteo = contar_palabras(nombre_archivo)  # Contar las palabras en el archivo
    mostrar_palabras_frecuentes(conteo)  # Mostrar las palabras más frecuentes
    
    end_time = time.time()  # Finalizar el conteo de tiempo de ejecución
    calc_time = end_time - start_time  # Calcular el tiempo transcurrido
    print(f"Tiempo de ejecución: {calc_time} segundos")  # Mostrar el tiempo de ejecución total
