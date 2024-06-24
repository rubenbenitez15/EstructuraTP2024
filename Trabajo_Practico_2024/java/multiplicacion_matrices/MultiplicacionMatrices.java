import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.Scanner;

public class MultiplicacionMatrices {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Obtener matrices de entrada
        int[][] matriz1 = obtenerMatriz("Ingrese 'm' para leer la matriz 1 desde un archivo o 'a' para generarla aleatoriamente: ", scanner);
        int[][] matriz2 = obtenerMatriz("Ingrese 'm' para leer la matriz 2 desde un archivo o 'a' para generarla aleatoriamente: ", scanner);

        // Verificar si las matrices se pueden multiplicar
        if (matriz1[0].length != matriz2.length) {
            System.out.println("No se pueden multiplicar las matrices. El número de columnas de la primera matriz debe ser igual al número de filas de la segunda matriz.");
            return;
        }

        // Multiplicar matrices
        int[][] resultado = multiplicarMatrices(matriz1, matriz2);

        // Imprimir matrices y resultado
        System.out.println("\nMatriz 1:");
        imprimirMatriz(matriz1);
        System.out.println("\nMatriz 2:");
        imprimirMatriz(matriz2);
        System.out.println("\nResultado:");
        imprimirMatriz(resultado);

        // Guardar resultado en archivo
        guardarMatrizEnArchivo(resultado, "resultado.csv");
        System.out.println("\nEl resultado se ha guardado en el archivo 'resultado.csv'.");
    }

    // Obtiene una matriz del usuario, ya sea leyendo desde un archivo o generando aleatoriamente.
    private static int[][] obtenerMatriz(String mensaje, Scanner scanner) {
        while (true) {
            System.out.print(mensaje);
            String opcion = scanner.nextLine().toLowerCase();

            if (opcion.equals("m")) {
                // Leer matriz desde archivo
                System.out.print("Ingrese la ruta del archivo: ");
                String rutaArchivo = scanner.nextLine();
                return leerMatrizDesdeArchivo(rutaArchivo);
            } else if (opcion.equals("a")) {
                // Obtener dimensiones de la matriz aleatoria
                System.out.print("Ingrese el número de filas para la matriz: ");
                int filas = scanner.nextInt();
                System.out.print("Ingrese el número de columnas para la matriz: ");
                int columnas = scanner.nextInt();
                scanner.nextLine(); // Consumir la nueva línea pendiente

                // Generar matriz aleatoria
                return generarMatrizAleatoria(filas, columnas);
            } else {
                System.out.println("Opción no válida. Ingrese 'm' o 'a'.");
            }
        }
    }

    // Lee una matriz desde un archivo CSV.
    private static int[][] leerMatrizDesdeArchivo(String rutaArchivo) {
        List<int[]> filas = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(rutaArchivo))) {
            String linea;
            while ((linea = br.readLine()) != null) {
                String[] valores = linea.split(",");
                int[] fila = Arrays.stream(valores)
                        .mapToInt(Integer::parseInt) // Cambiar a mapToInt para enteros
                        .toArray();
                filas.add(fila);
            }
        } catch (IOException e) {
            System.err.println("Error al leer el archivo: " + e.getMessage());
            System.exit(1);
        }
        return filas.toArray(new int[0][]); // Cambiar a int[][]
    }

    // Genera una matriz aleatoria con las dimensiones especificadas.
    private static int[][] generarMatrizAleatoria(int filas, int columnas) {
        Random random = new Random();
        int[][] matriz = new int[filas][columnas];
        for (int i = 0; i < filas; i++) {
            for (int j = 0; j < columnas; j++) {
                matriz[i][j] = random.nextInt(10); // Números aleatorios entre 0 y 9
            }
        }
        return matriz;
    }

    // Multiplica dos matrices.
    private static int[][] multiplicarMatrices(int[][] matriz1, int[][] matriz2) {
        int filas = matriz1.length;
        int columnas = matriz2[0].length;
        int longitudComun = matriz1[0].length;
        int[][] resultado = new int[filas][columnas];

        for (int i = 0; i < filas; i++) {
            for (int j = 0; j < columnas; j++) {
                for (int k = 0; k < longitudComun; k++) {
                    resultado[i][j] += matriz1[i][k] * matriz2[k][j];
                }
            }
        }
        return resultado;
    }

    // Imprime una matriz en la consola.
    private static void imprimirMatriz(int[][] matriz) {
        for (int[] fila : matriz) {
            System.out.println(Arrays.toString(fila));
        }
    }

    // Guarda una matriz en un archivo CSV.
    private static void guardarMatrizEnArchivo(int[][] matriz, String rutaArchivo) {
        try (FileWriter writer = new FileWriter(rutaArchivo)) {
            for (int[] fila : matriz) {
                for (int j = 0; j < fila.length; j++) {
                    writer.write(String.valueOf(fila[j]));
                    if (j < fila.length - 1) {
                        writer.write(",");
                    }
                }
                writer.write("\n");
            }
        } catch (IOException e) {
            System.err.println("Error al guardar la matriz en el archivo: " + e.getMessage());
        }
    }
}