import { Link, useParams } from "@remix-run/react";

const recetas = {
  "pollo-pavo": {
    nombre: "Recetas con pechuga de pollo o pavo",
    recetas: [
      {
        id: "pollo1",
        nombre: "Pollo picante con cuscús",
        calorias: "284 kcal",
        proteinas: "50 g",
        carbohidratos: "22 g",
        grasas: "3 g",
        url: "https://www.myprotein.es/thezone/recetas/pollo-picante-con-cuscus/",
        imagen: "/imgs/polloPicante.jpg",
      },
      {
        id: "pollo2",
        nombre: "Estofado de pollo",
        calorias: "359 kcal",
        proteinas: "37 g",
        carbohidratos: "29 g",
        grasas: "13 g",
        url: "https://www.myprotein.es/thezone/recetas/estofado-de-pollo/",
        imagen: "/imgs/estofadoPollo.jpg",
      },
      {
        id: "pollo3",
        nombre: "Pasta con pollo cajún",
        calorias: "516 kcal",
        proteinas: "38 g",
        carbohidratos: "71 g",
        grasas: "8 g",
        url: "https://www.myprotein.es/thezone/recetas/pasta-cremosa-con-pollo-cajun/",
        imagen: "/imgs/pastaPollo.jpg",
      },
    ],
  },
  "otras-carnes-queso": {
    nombre: "Recetas con otras carnes o queso",
    recetas: [
      {
        id: "carnes1",
        nombre: "Sánwich de ternera",
        calorias: "610 kcal",
        proteinas: "29 g",
        carbohidratos: "63 g",
        grasas: "22 g",
        url: "https://www.myprotein.es/thezone/recetas/sandwich-de-ternera-masa-muscular/",
        imagen: "/imgs/SandwichTernera.jpg",
      },
      {
        id: "carnes2",
        nombre: "Fajitas Halloumi asadas",
        calorias: "436 kcal",
        proteinas: "30 g",
        carbohidratos: "35 g",
        grasas: "21 g",
        url: "https://www.myprotein.es/thezone/recetas/fajitas-halloumi-saludables/",
        imagen: "/imgs/fajitasHalloumi.jpg",
      },
      {
        id: "carnes3",
        nombre: "Ramen de ternera",
        calorias: "482 kcal",
        proteinas: "26 g",
        carbohidratos: "61 g",
        grasas: "15 g",
        url: "https://www.myprotein.es/thezone/recetas/ramen-de-ternera/",
        imagen: "/imgs/ramenTernera.jpg",
      },
    ],
  },
  pescado: {
    nombre: "Recetas con pescado",
    recetas: [
      {
        id: "pescado1",
        nombre: "Filetes de atún con boniato",
        calorias: "342 kcal",
        proteinas: "38 g",
        carbohidratos: "33 g",
        grasas: "7 g",
        url: "https://www.myprotein.es/thezone/recetas/atun-con-boniato/",
        imagen: "/imgs/AtunConBoniato.jpg",
      },
      {
        id: "pescado2",
        nombre: "Salmón al pesto",
        calorias: "496 kcal",
        proteinas: "40 g",
        carbohidratos: "16 g",
        grasas: "29 g",
        url: "https://www.myprotein.es/thezone/recetas/salmon-al-pesto/",
        imagen: "/imgs/SalmonPesto.jpg",
      },
      {
        id: "pescado3",
        nombre: "Ensalada de pasta",
        calorias: "415 kcal",
        proteinas: "26 g",
        carbohidratos: "40 g",
        grasas: "20 g",
        url: "https://www.myprotein.es/thezone/recetas/ensalada-pasta-saludable-deliciosa/",
        imagen: "/imgs/ensaladaDePasta.jpg",
      },
    ],
  },
  veganas: {
    nombre: "Recetas veganas",
    recetas: [
      {
        id: "vegana1",
        nombre: "Hamburguesa vegana de remolacha",
        calorias: "455 kcal",
        proteinas: "21 g",
        carbohidratos: "68 g",
        grasas: "11 g",
        url: "https://www.myprotein.es/thezone/recetas/hamburguesa-vegana-remolacha/",
        imagen: "/imgs/hamburguesaVegana.jpg",
      },
      {
        id: "vegana2",
        nombre: "Boloñesa de lentejas vegana",
        calorias: "486 kcal",
        proteinas: "21 g",
        carbohidratos: "86 g",
        grasas: "6 g",
        url: "https://www.myprotein.es/thezone/recetas/bolonesa-de-lentejas-vegana/",
        imagen: "/imgs/BolonesaLentejasVegana.jpg",
      },
      {
        id: "vegana3",
        nombre: "Tacos veganos de coliflor",
        calorias: "278 kcal",
        proteinas: "11 g",
        carbohidratos: "23 g",
        grasas: "15 g",
        url: "https://www.myprotein.es/thezone/recetas/tacos-veganos-de-coliflor/",
        imagen: "/imgs/TacosVeganColiflor.jpg",
      },
    ],
  },
  postres: {
    nombre: "Recetas de postres proteicos",
    recetas: [
      {
        id: "postres1",
        nombre: "Tortitas proteicas de plátano",
        calorias: "155 kcal",
        proteinas: "15 g",
        carbohidratos: "14 g",
        grasas: "1 g",
        url: "https://www.myprotein.es/thezone/recetas/tortitas-proteicas-de-platano/",
        imagen: "/imgs/TortitasProteicas.jpg",
      },
      {
        id: "postres2",
        nombre: "Brownie Proteico",
        calorias: "92 kcal",
        proteinas: "12 g",
        carbohidratos: "2 g",
        grasas: "3 g",
        url: "https://www.myprotein.es/thezone/recetas/brownie-proteico/",
        imagen: "/imgs/BrownieProteico.jpg",
      },
      {
        id: "postres3",
        nombre: "Gofres proteicos",
        calorias: "492 kcal",
        proteinas: "42 g",
        carbohidratos: "62 g",
        grasas: "8.7 g",
        url: "https://www.myprotein.es/thezone/recetas/gofres-proteicos-marino-katsouris/",
        imagen: "/imgs/GofresProteicos.jpg",
      },
    ],
  },
  airfryer: {
    nombre: "Recetas en airfryer",
    recetas: [
      {
        id: "airfryer1",
        nombre: "Pizza en airfryer",
        calorias: "404 kcal",
        proteinas: "24 g",
        carbohidratos: "70 g",
        grasas: "2 g",
        url: "https://www.myprotein.es/thezone/recetas/pizza-en-airfryer/",
        imagen: "/imgs/PizzaAirfryer.jpg",
      },
      {
        id: "airfryer2",
        nombre: "Palomitas de pollo",
        calorias: "347 kcal",
        proteinas: "43 g",
        carbohidratos: "21 g",
        grasas: "9 g",
        url: "https://www.myprotein.es/thezone/recetas/palomitas-de-pollo-en-airfryer/",
        imagen: "/imgs/PalomitasPollo.jpg",
      },
      {
        id: "airfryer3",
        nombre: "Donut Biscoff bajos en calorías",
        calorias: "36 kcal",
        proteinas: "2.5 g",
        carbohidratos: "3.5 g",
        grasas: "1 g",
        url: "https://www.myprotein.es/thezone/recetas/agujeros-de-donut/",
        imagen: "/imgs/DonutBiscoff.jpg",
      },
    ],
  },
};

export default function Receta() {
  const { categoria } = useParams();
  const recetaData = recetas[categoria as keyof typeof recetas];

  if (!recetaData) {
    return <div>Receta no encontrada</div>;
  }

  return (
    <div className="recetas">
      <div className="titulo">
        <p>
          <b>RECETAS</b>
        </p>
      </div>
      {recetaData.recetas.map((receta) => (
        <div className="flip-container" key={receta.id}>
          <div className="card">
            <div
              className="frente"
              style={{ backgroundImage: `url(${receta.imagen})` }}
            ></div>
            <div className="dorso">
              <p>{receta.nombre}</p>
              <table>
                <tbody>
                  <tr>
                    <td>Calorías</td>
                    <td>Proteínas</td>
                    <td>Carbohidratos</td>
                    <td>Grasas</td>
                  </tr>
                  <tr>
                    <td>{receta.calorias}</td>
                    <td>{receta.proteinas}</td>
                    <td>{receta.carbohidratos}</td>
                    <td>{receta.grasas}</td>
                  </tr>
                </tbody>
              </table>
              <Link to={receta.url} target="_blank" rel="noreferrer">
                Ver Receta
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
