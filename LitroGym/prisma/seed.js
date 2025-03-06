import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    // Crear usuarios
    const user1 = await prisma.user.create({
        data: {
            name: "Juan Pérez",
            email: "juan@example.com",
            password: "password123",
            color: "blue",
        },
    });

    const user2 = await prisma.user.create({
        data: {
            name: "Maria López",
            email: "maria@example.com",
            password: "password456",
            color: "red",
        },
    });

    // Lista de ejercicios desde los archivos
    const videos = [
        "abdominales_declinados.mp4",
        "abdominales.mp4",
        "aduccion_cadera.mp4",
        "cables_cruzados.mp4",
        "cinta.mp4",
        "curl_araña.mp4",
        "curl_biceps_concentrado.mp4",
        "curl_biceps_inclinado.mp4",
        "curl_biceps_inverso.mp4",
        "curl_biceps_predicador.mp4",
        "curl_martillo.mp4",
        "curl_piernas.mp4",
        "dominadas.mp4",
        "elevacion_gemelos.mp4",
        "elevaciones_laterales.mp4",
        "empuje_caderas.mp4",
        "extension_cuadriceps.mp4",
        "extension_triceps.mp4",
        "fondo_banco.mp4",
        "jalon_pecho.mp4",
        "mariposa.mp4",
        "peso_muerto.mp4",
        "plancha.mp4",
        "prensa.mp4",
        "press_banca_declinado.mp4",
        "press_banca_inclinado.mp4",
        "press_banca.mp4",
        "press_hombro.mp4",
        "press_pecho.mp4",
        "remo_barra_inclinado.mp4",
        "remo.mp4",
        "sentadilla.mp4",
        "triceps_polea.mp4",
    ];

    const ejerciciosData = videos.map((video) => ({
        nombre: video.replace(".mp4", "").replace(/_/g, " "), // Quita ".mp4" y reemplaza "_" con espacio
        video,
        musculo: "Desconocido", // Puedes asignar después el músculo correspondiente
    }));

    // Insertar ejercicios
    const ejercicios = await prisma.ejercicio.createMany({
        data: ejerciciosData,
    });

    // Obtener ejercicios de la base de datos para asociarlos a las rutinas
    const allEjercicios = await prisma.ejercicio.findMany();

    // Crear rutinas para cada usuario
    const rutina1 = await prisma.rutina.create({
        data: {
            userId: user1.id,
            nombre: "Rutina de Juan",
            ejercicios: {
                connect: allEjercicios.slice(0, 5).map((ej) => ({ id: ej.id })), // 5 ejercicios random
            },
        },
    });

    const rutina2 = await prisma.rutina.create({
        data: {
            userId: user1.id,
            nombre: "Rutina de pepe",
            ejercicios: {
                connect: allEjercicios.slice(5, 10).map((ej) => ({ id: ej.id })), // 5 ejercicios distintos
            },
        },
    });

    const rutina3 = await prisma.rutina.create({
        data: {
            userId: user2.id,
            nombre: "Rutina de jose",
            ejercicios: {
                connect: allEjercicios.slice(10, 15).map((ej) => ({ id: ej.id })), // 5 ejercicios random
            },
        },
    });

    const rutina4 = await prisma.rutina.create({
        data: {
            userId: user2.id,
            nombre: "Rutina de ahmad",
            ejercicios: {
                connect: allEjercicios.slice(15, 20).map((ej) => ({ id: ej.id })), // 5 ejercicios distintos
            },
        },
    });

    console.log("Seed ejecutado correctamente ✅");
}

main()
    .catch((e) => {
        console.error("Error ejecutando el seed ❌", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
