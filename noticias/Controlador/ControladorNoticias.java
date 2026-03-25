package Controlador;

import Modelo.Noticia;

public class ControladorNoticias {
   public ControladorNoticias() {
   }

   public static void main(String[] var0) {
      Noticia var1 = new Noticia("El mencho asesinado", "El 23 de febrero se da la baja del presunto lider del cartel.");
      System.out.println("El mencho fue dado de baja: " + var1.titulo);
      System.out.println("el dolar se mantiene a la baja : " + var1.texto);
      System.out.println("el colon es solido : " + var1.texto);
   }
}
