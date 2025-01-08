import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createUser() {
  try {
    // Crear un nuevo usuario
    const newUser = await prisma.user.create({
      data: {
        name: "Juan Perez", // Nombre del usuario
        email: "juan.perez@example.com", // Correo electrónico
        password: "contraseñaSegura123", // Contraseña
      },
    });

    console.log("Usuario creado:", newUser); // Muestra el nuevo usuario creado en consola
  } catch (error) {
    console.error("Error al crear el usuario:", error);
  } finally {
    // Cierra la conexión con la base de datos
    await prisma.$disconnect();
  }
}

createUser();
