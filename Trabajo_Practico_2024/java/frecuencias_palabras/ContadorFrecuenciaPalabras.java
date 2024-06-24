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
        Scanner scanner = new Scanner(System.in);
        System.out.print("Introduce la ruta de acceso del archivo: ");
        String archivo = scanner.nextLine();

        long inicioTiempo = System.nanoTime(); // Iniciar temporizador

        Map<String, Integer> frecuenciaPalabras = new HashMap<>();

        try (BufferedReader br = new BufferedReader(new FileReader(archivo))) {
            String linea;
            while ((linea = br.readLine()) != null) {
                String[] palabras = linea.toLowerCase().split("[\\s\\p{Punct}]+");
                for (String palabra : palabras) {
                    // Filtrar pronombres y conectores
                    if (!palabra.isEmpty() && !conectoresPronombres.contains(palabra)) {
                        frecuenciaPalabras.put(palabra, frecuenciaPalabras.getOrDefault(palabra, 0) + 1);
                    }
                }
            }
        } catch (IOException e) {
            System.err.println("Error al leer el archivo: " + e.getMessage());
            return;
        }

        List<Map.Entry<String, Integer>> listaPalabras = new ArrayList<>(frecuenciaPalabras.entrySet());
        listaPalabras.sort(Map.Entry.<String, Integer>comparingByValue().reversed());

        System.out.println("Palabras más frecuentes:");
        int contador = 0;
        for (Map.Entry<String, Integer> entry : listaPalabras) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
            contador++;
            if (contador >= 10) {
                break;
            }
        }

        long finTiempo = System.nanoTime(); // Finalizar temporizador
        long tiempoEjecucionNano = finTiempo - inicioTiempo;
        double tiempoEjecucionMillis = tiempoEjecucionNano / 1_000_000.0; // Convertir a milisegundos

        System.out.printf("Tiempo de ejecución: %.2f milisegundos%n", tiempoEjecucionMillis);
    }
}
