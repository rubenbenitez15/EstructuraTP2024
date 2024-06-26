require 'benchmark'

# Definir el conjunto de conectores y pronombres a excluir
CONECTORES_PRONOMBRES = [
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
]

def contar_palabras(nombre_archivo, conectores_pronombres)
  frecuencia_palabras = {}

  # Verificar si el archivo existe
  if File.exist?(nombre_archivo)
    # Abrir el archivo en modo lectura
    File.open(nombre_archivo, "r") do |archivo|
      # Iterar sobre cada línea del archivo
      archivo.each_line do |linea|
        # Dividir la línea en palabras y convertirlas a minúsculas
        palabras = linea.downcase.scan(/\w+/)
        
        # Filtrar palabras que no están en conectores_pronombres
        palabras_filtradas = palabras.reject { |palabra| conectores_pronombres.include?(palabra) }

        # Contar la frecuencia de cada palabra filtrada
        palabras_filtradas.each do |palabra|
          frecuencia_palabras[palabra] ||= 0
          frecuencia_palabras[palabra] += 1
        end
      end
    end

    # Ordenar las palabras por frecuencia en orden descendente
    palabras_ordenadas = frecuencia_palabras.sort_by { |palabra, conteo| -conteo }

    # Mostrar las 10 palabras más frecuentes
    puts "Las 10 palabras más frecuentes en '#{nombre_archivo}' son:"
    palabras_ordenadas[0..9].each do |palabra, conteo|
      puts "- #{palabra}: #{conteo}"
    end

  else
    puts "El archivo '#{nombre_archivo}' no existe."
  end
end

if __FILE__ == $PROGRAM_NAME
  # Pedir al usuario que ingrese el nombre del archivo
  puts "Ingresa el nombre del archivo: "
  nombre_archivo = gets.chomp

  # Medir tiempo de ejecución
  tiempo_ejecucion = Benchmark.realtime do
    contar_palabras(nombre_archivo, CONECTORES_PRONOMBRES)
  end

  puts "Tiempo de ejecución: #{tiempo_ejecucion.round(8)} segundos"
end
