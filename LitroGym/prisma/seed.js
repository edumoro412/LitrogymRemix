import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.ejercicio.createMany({
    data: [
      {
        nombre: "abdominales",
        musculo: "abdominales",
        video: "abdominales.mp4",
      },
      {
        nombre: "press inclinado",
        musculo: "pecho",
        video: "press_banca_inclinado.mp4",
      },
      {
        nombre: "remo",
        musculo: "espalda",
        video: "remo.mp4",
      },
      {
        nombre: "cinta",
        musculo: "cardio",
        video: "cinta.mp4",
      },
      {
        nombre: "curl de bíceps inverso",
        musculo: "bíceps",
        video: "curl_biceps_inverso.mp4",
      },
      {
        nombre: "dominadas",
        musculo: "espalda",
        video: "dominadas.mp4",
      },
      {
        nombre: "empuje de caderas",
        musculo: "glúteo",
        video: "empuje_caderas.mp4",
      },
      {
        nombre: "jalon al pecho",
        musculo: "espalda",
        video: "jalon_pecho.mp4",
      },
      {
        nombre: "mariposa",
        musculo: "pecho",
        video: "mariposa.mp4",
      },
      {
        nombre: "press de banca",
        musculo: "pecho",
        video: "press_banca.mp4",
      },
      {
        nombre: "remo con barra inclinado",
        musculo: "espalda",
        video: "remo_barra_inclinado.mp4",
      },
      {
        nombre: "sentadilla",
        musculo: "cuadriceps",
        video: "sentadilla.mp4",
      },
      {
        nombre: "curl martillo",
        musculo: "bíceps",
        video: "curl_martillo.mp4",
      },
      {
        nombre: "triceps con polea",
        musculo: "triceps",
        video: "triceps_polea.mp4",
      },
      {
        nombre: "curl de bíceps inclinado",
        musculo: "bíceps",
        video: "curl_biceps_inclinado.mp4",
      },
      {
        nombre: "curl de bíceps predicador",
        musculo: "bíceps",
        video: "curl_biceps_predicador.mp4",
      },
      {
        nombre: "curl de bíceps concentrado",
        musculo: "bíceps",
        video: "curl_biceps_concentrado.mp4",
      },
      {
        nombre: "abdominales declinados",
        musculo: "abdominales",
        video: "abdominales_declinados.mp4",
      },
      {
        nombre: "press de pecho",
        musculo: "pecho",
        video: "press_pecho.mp4",
      },
      {
        nombre: "press de hombros",
        musculo: "hombro",
        video: "press_hombro.mp4",
      },
      {
        nombre: "elevaciones laterales",
        musculo: "hombro",
        video: "elevaciones_laterales.mp4",
      },
      {
        nombre: "cables cruzados",
        musculo: "pecho",
        video: "cables_cruzados.mp4",
      },
      {
        nombre: "curl araña",
        musculo: "bíceps",
        video: "curl_araña.mp4",
      },
      {
        nombre: "press de banca declinado",
        musculo: "pecho",
        video: "press_banca_declinado.mp4",
      },
      {
        nombre: "prensa",
        musculo: "cuadriceps",
        video: "prensa.mp4",
      },
      {
        nombre: "aducción de cadera",
        musculo: "aductor",
        video: "aduccion_cadera.mp4",
      },
      {
        nombre: "elevación de gemelos",
        musculo: "gemelos",
        video: "elevacion_gemelos.mp4",
      },
      {
        nombre: "peso muerto",
        musculo: "isquiotibiales",
        video: "peso_muerto.mp4",
      },
      {
        nombre: "curl de piernas",
        musculo: "isquiotibiales",
        video: "curl_piernas.mp4",
      },
      {
        nombre: "extensión de tríceps",
        musculo: "triceps",
        video: "extension_triceps.mp4",
      },
      {
        nombre: "extensión de cuadriceps",
        musculo: "cuadriceps",
        video: "extension_cuadriceps.mp4",
      },
      {
        nombre: "plancha",
        musculo: "abdominales",
        video: "plancha.mp4",
      },
    ],
  });

  console.log("Seed completado");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
