import re
from collections import Counter
import time

def contar_palabras(nombre_archivo):
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
    with open(nombre_archivo, 'r', encoding='utf-8') as archivo:
        texto = archivo.read()
    palabras = re.findall(r'\b\w+\b', texto.lower())
    palabras_filtradas = [palabra for palabra in palabras if palabra not in conectores_pronombres]
    conteo_palabras = Counter(palabras_filtradas)
    return conteo_palabras

def mostrar_palabras_frecuentes(conteo_palabras, n=10):
    print(f"Las {n} palabras más frecuentes son:")
    for palabra, conteo in conteo_palabras.most_common(n):
        print(f"{palabra}: {conteo}")

if __name__ == "__main__":
    nombre_archivo = input("Ingresa el nombre del archivo: ")
    
    # Medir tiempo de ejecución
    start_time = time.time()
    
    conteo = contar_palabras(nombre_archivo)
    mostrar_palabras_frecuentes(conteo)
    
    end_time = time.time()
    elapsed_time = end_time - start_time
    print(f"Tiempo de ejecución: {elapsed_time} segundos")
