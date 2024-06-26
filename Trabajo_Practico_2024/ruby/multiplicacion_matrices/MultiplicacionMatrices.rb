# Método para leer una matriz de un archivo CSV
def leer_matriz(nombre_archivo)
    matriz = []
    File.open(nombre_archivo, "r") do |archivo|
      archivo.each_line do |linea|
        fila = linea.chomp.split(",").map(&:to_i)
        matriz << fila
      end
    end
    matriz
  end
  
  # Método para generar una matriz aleatoria
  def generar_matriz_aleatoria(filas, columnas)
    matriz = []
    filas.times do
      fila = []
      columnas.times { fila << rand(1..10) } # Genera números aleatorios entre 1 y 10
      matriz << fila
    end
    matriz
  end
  
  # Método para multiplicar dos matrices
  def multiplicar_matrices(matriz1, matriz2)
    filas_m1, columnas_m1 = matriz1.size, matriz1[0].size
    filas_m2, columnas_m2 = matriz2.size, matriz2[0].size
  
    raise "Las matrices no se pueden multiplicar: dimensiones incorrectas" unless columnas_m1 == filas_m2
  
    resultado = Array.new(filas_m1) { Array.new(columnas_m2, 0) }
  
    filas_m1.times do |i|
      columnas_m2.times do |j|
        filas_m2.times do |k|
          resultado[i][j] += matriz1[i][k] * matriz2[k][j]
        end
      end
    end
  
    resultado
  end
  
  # Método para guardar una matriz en un archivo CSV
  def guardar_matriz(nombre_archivo, matriz)
    File.open(nombre_archivo, "w") do |archivo|
      matriz.each do |fila|
        archivo.puts fila.join(",") # Asegura que se use coma como separador
      end
    end
  end
  
  # Obtener la opción de entrada del usuario
  puts "Seleccione la opción de entrada:"
  puts "1. Ingresar matrices desde archivos"
  puts "2. Generar matrices aleatorias"
  opcion = gets.chomp.to_i
  
  # Obtener las matrices de entrada
  if opcion == 1
    puts "Ingrese el nombre del archivo de la primera matriz:"
    nombre_archivo_matriz1 = gets.chomp
    matriz1 = leer_matriz(nombre_archivo_matriz1)
  
    puts "Ingrese el nombre del archivo de la segunda matriz:"
    nombre_archivo_matriz2 = gets.chomp
    matriz2 = leer_matriz(nombre_archivo_matriz2)
  elsif opcion == 2
    puts "Ingrese el número de filas de la primera matriz:"
    filas_m1 = gets.chomp.to_i
    puts "Ingrese el número de columnas de la primera matriz:"
    columnas_m1 = gets.chomp.to_i
    matriz1 = generar_matriz_aleatoria(filas_m1, columnas_m1)
  
    puts "Ingrese el número de filas de la segunda matriz:"
    filas_m2 = gets.chomp.to_i
    puts "Ingrese el número de columnas de la segunda matriz:"
    columnas_m2 = gets.chomp.to_i
    matriz2 = generar_matriz_aleatoria(filas_m2, columnas_m2)
  else
    puts "Opción no válida"
    exit
  end
  
  # Mostrar las matrices de entrada
  puts "\nMatriz 1:"
  puts matriz1.map(&:inspect)
  puts "\nMatriz 2:"
  puts matriz2.map(&:inspect)
  
  # Multiplicar las matrices
  begin
    matriz_resultado = multiplicar_matrices(matriz1, matriz2)
  
    # Mostrar la matriz resultado
    puts "\nMatriz Resultado:"
    puts matriz_resultado.map(&:inspect)
  
    # Guardar la matriz resultado en un archivo CSV
    guardar_matriz("resultado.csv", matriz_resultado)
    puts "\nLa matriz resultado se ha guardado en 'resultado.csv'"
  rescue StandardError => e
    puts "Error: #{e.message}"
  end