import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.ejercicio.createMany({
    data: [
      {
        id: "cm5y8wk600002bf4pubkbh",
        nombre: "abdominales",
        musculo: "abdominales",
        video: "abdominales.mp4",
      },
      {
        id: "cm5y8wk600002bf474d10l3",
        nombre: "press inclinado",
        musculo: "pecho",
        video: "press_banca_inclinado.mp4",
      },
      {
        id: "cm5y8wk600002bf4yk9ykg2",
        nombre: "remo",
        musculo: "espalda",
        video: "remo.mp4",
      },
      {
        id: "cm5y8wk600002bf4q82wh2",
        nombre: "cinta",
        musculo: "cardio",
        video: "cinta.mp4",
      },
      {
        id: "cm5y8wk600002bf4qc8p4s",
        nombre: "curl de bíceps inverso",
        musculo: "bíceps",
        video: "curl_biceps_inverso.mp4",
      },
      {
        id: "cm5y8wk600002bf488u51k",
        nombre: "dominadas",
        musculo: "espalda",
        video: "dominadas.mp4",
      },
      {
        id: "cm5y8wk600002bf4kf1jls",
        nombre: "empuje de caderas",
        musculo: "glúteo",
        video: "empuje_caderas.mp4",
      },
      {
        id: "cm5y8wk600002bf4kl98dk",
        nombre: "jalon al pecho",
        musculo: "espalda",
        video: "jalon_pecho.mp4",
      },
      {
        id: "cm5y8wk600002bf4j4v8ovx",
        nombre: "mariposa",
        musculo: "pecho",
        video: "mariposa.mp4",
      },
      {
        id: "cm5y8wk600002bf4y9gd1a",
        nombre: "press de banca",
        musculo: "pecho",
        video: "press_banca.mp4",
      },
      {
        id: "cm5y8wk600002bf4qd5t5t",
        nombre: "remo con barra inclinado",
        musculo: "espalda",
        video: "remo_barra_inclinado.mp4",
      },
      {
        id: "cm5z7mcr1200028qonjzow",
        nombre: "sentadilla",
        musculo: "cuadriceps",
        video: "sentadilla.mp4",
      },
      {
        id: "cm5z7mcr1200028qonbh5e",
        nombre: "curl martillo",
        musculo: "bíceps",
        video: "curl_martillo.mp4",
      },
      {
        id: "cm5z7mcr1200028qoqbw0k",
        nombre: "triceps con polea",
        musculo: "triceps",
        video: "triceps_polea.mp4",
      },
      {
        id: "cm5z7mcr1200028qoqbw0k",
        nombre: "curl de bíceps inclinado",
        musculo: "bíceps",
        video: "curl_biceps_inclinado.mp4",
      },
      {
        id: "cm5z7mcr1200028qoqbw0l",
        nombre: "curl de bíceps predicador",
        musculo: "bíceps",
        video: "curl_biceps_predicador.mp4",
      },
      {
        id: "cm5z7mcr1200028qoqbw0m",
        nombre: "curl de bíceps concentrado",
        musculo: "bíceps",
        video: "curl_biceps_concentrado.mp4",
      },
      {
        id: "cm5z7mcr1200028qoqbw0n",
        nombre: "abdominales declinados",
        musculo: "abdominales",
        video: "abdominales_declinados.mp4",
      },
      {
        id: "cm5z7mcr1200028qoqbw0o",
        nombre: "press de pecho",
        musculo: "pecho",
        video: "press_pecho.mp4",
      },
      {
        id: "cm5z7mcr1200028qoqbw0p",
        nombre: "press de hombros",
        musculo: "hombro",
        video: "press_hombro.mp4",
      },
      {
        id: "cm5z7mcr1200028qoqbw0q",
        nombre: "elevaciones laterales",
        musculo: "hombro",
        video: "elevaciones_laterales.mp4",
      },
      {
        id: "cm5z7mcr1200028qoqbw0r",
        nombre: "cables cruzados",
        musculo: "pecho",
        video: "cables_cruzados.mp4",
      },
      {
        id: "cm5z7mcr1200028qoqbw0s",
        nombre: "curl araña",
        musculo: "bíceps",
        video: "curl_araña.mp4",
      },
      {
        id: "cm5z7mcr1200028qoqbw0t",
        nombre: "press de banca declinado",
        musculo: "pecho",
        video: "press_banca_declinado.mp4",
      },
      {
        id: "cm5z7mcr1200028qoqbw0u",
        nombre: "prensa",
        musculo: "cuadriceps",
        video: "prensa.mp4",
      },
      {
        id: "cm5z7mcr1200028qoqbw0v",
        nombre: "aducción de cadera",
        musculo: "aductor",
        video: "aduccion_cadera.mp4",
      },
      {
        id: "cm5z7mcr1200028qoqbw0w",
        nombre: "elevación de gemelos",
        musculo: "gemelos",
        video: "elevacion_gemelos.mp4",
      },
      {
        id: "cm5z7mcr1200028qoqbw0x",
        nombre: "peso muerto",
        musculo: "isquiotibiales",
        video: "peso_muerto.mp4",
      },
      {
        id: "cm5z7mcr1200028qoqbw0y",
        nombre: "curl de piernas",
        musculo: "isquiotibiales",
        video: "curl_piernas.mp4",
      },
      {
        id: "cm5z7mcr1200028qoqbw0z",
        nombre: "extensión de tríceps",
        musculo: "triceps",
        video: "extension_triceps.mp4",
      },
      {
        id: "cm5z7mcr1200028qoqbw10",
        nombre: "extensión de cuadriceps",
        musculo: "cuadriceps",
        video: "extension_cuadriceps.mp4",
      },
      {
        id: "cm5z7mcr1200028qoqbw11",
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
