import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;

public class ContadorFrecuenciaPalabras {
    // Conjunto de palabras a filtrar (pronombres y conectores)
    private static final Set<String> conectoresPronombres = new HashSet<>(Arrays.asList(
            "y", "e", "ni", "que", "o", "u", "pero", "mas", "sino", "aunque", "tal", "es",
            "porque", "pues", "como", "si", "cuando", "mientras", "tan", "tanto", "más", "mã¡s",
            "según", "donde", "a", "ante", "bajo", "cabe", "con", "contra", "de", "al",
            "desde", "en", "entre", "hacia", "hasta", "para", "por", "según", "un", "qué",
            "sin", "so", "sobre", "tras", "yo", "tú", "él", "ella", "nosotros", "del",
            "nosotras", "vosotros", "vosotras", "ellos", "ellas", "me", "te", "su",
            "se", "nos", "os", "mío", "mía", "míos", "mías", "tuyo", "tuya", "una",
            "tuyos", "tuyas", "suyo", "suya", "suyos", "suyas", "nuestro", "mis", "mas",
            "nuestra", "nuestros", "nuestras", "vuestro", "vuestra", "vuestros", "mi",
            "vuestras", "este", "esta", "estos", "estas", "ese", "esa", "esos", "los", "ni", "es",
            "esas", "aquel", "aquella", "aquellos", "aquellas", "esto", "eso", "la", "el",
            "aquello", "lo", "le", "les"));

    public static void main(String[] args) {
        // Crear un objeto Scanner para leer la entrada del usuario
        Scanner scanner = new Scanner(System.in);
        System.out.print("Introduce el nombre del archivo: ");
        String archivo = scanner.nextLine();

        // Iniciar temporizador para medir el tiempo de ejecución
        long inicioTiempo = System.nanoTime();

        // Crear un mapa para almacenar la frecuencia de cada palabra
        Map<String, Integer> frecuenciaPalabras = new HashMap<>();

        // Intentar abrir y leer el archivo
        try (BufferedReader br = new BufferedReader(new FileReader(archivo))) {
            String linea;
            // Leer el archivo línea por línea
            while ((linea = br.readLine()) != null) {
                // Convertir la línea a minúsculas y dividirla en palabras
                String[] palabras = linea.toLowerCase().split("[\\s\\p{Punct}]+");
                // Iterar sobre cada palabra
                for (String palabra : palabras) {
                    // Filtrar pronombres y conectores
                    if (!palabra.isEmpty() && !conectoresPronombres.contains(palabra)) {
                        // Actualizar el mapa con la frecuencia de la palabra
                        frecuenciaPalabras.put(palabra, frecuenciaPalabras.getOrDefault(palabra, 0) + 1);
                    }
                }
            }
        } catch (IOException e) {
            // Manejar errores de lectura del archivo
            System.err.println("Error al leer el archivo: " + e.getMessage());
            return;
        }

        // Convertir el mapa a una lista de entradas (pares clave-valor)
        List<Map.Entry<String, Integer>> listaPalabras = new ArrayList<>(frecuenciaPalabras.entrySet());
        // Ordenar la lista por el valor (frecuencia) en orden descendente
        listaPalabras.sort(Map.Entry.<String, Integer>comparingByValue().reversed());

        // Imprimir las 10 palabras más frecuentes
        System.out.println("Palabras más frecuentes:");
        int contador = 0;
        for (Map.Entry<String, Integer> entry : listaPalabras) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
            contador++;
            // Detenerse después de imprimir las 10 palabras más frecuentes
            if (contador >= 10) {
                break;
            }
        }

        // Finalizar temporizador y calcular el tiempo de ejecución
        long finTiempo = System.nanoTime();
        long tiempoEjecucionNano = finTiempo - inicioTiempo;
        double tiempoEjecucionMillis = tiempoEjecucionNano / 1000000.0;

        // Imprimir el tiempo de ejecución en milisegundos
        System.out.printf("Tiempo de ejecución: %.2f milisegundos%n", tiempoEjecucionMillis);
    }
}