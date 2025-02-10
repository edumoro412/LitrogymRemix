export default function Receta2() {
    return(
        <div className="recetas">
        <div className="titulo">
          <p>
            <b>RECETAS</b>
          </p>
        </div>
        <div className="flip-container">
          <div className="card">
            <div className="frente" id="carnes1"></div>
            <div className="dorso">
              <p>Sánwich de ternera</p>
              <table>
                <tr>
                  <td>Calorías</td>
                  <td>Proteínas</td>
                  <td>Carbohidratos</td>
                  <td>Grasas</td>
                </tr>
                <tr>
                  <td>610 kcal</td>
                  <td>29 g</td>
                  <td>63 g</td>
                  <td>22 g</td>
                </tr>
              </table>
              <a
                href="https://www.myprotein.es/thezone/recetas/sandwich-de-ternera-masa-muscular/"
                target="_blank" rel="noreferrer"
              >
                Ver Receta
              </a>
            </div>
          </div>
        </div>
        <div className="flip-container">
          <div className="card">
            <div className="frente" id="carnes2"></div>
            <div className="dorso">
              <p>Fajitas Halloumi asadas</p>
              <table>
                <tr>
                  <td>Calorías</td>
                  <td>Proteínas</td>
                  <td>Carbohidratos</td>
                  <td>Grasas</td>
                </tr>
                <tr>
                  <td>436 kcal</td>
                  <td>30 g</td>
                  <td>35 g</td>
                  <td>21 g</td>
                </tr>
              </table>
              <a
                href="https://www.myprotein.es/thezone/recetas/fajitas-halloumi-saludables/"
                target="_blank" rel="noreferrer"
              >
                Ver Receta
              </a>
            </div>
          </div>
        </div>
        <div className="flip-container">
          <div className="card">
            <div className="frente" id="carnes3"></div>
            <div className="dorso">
              <p>Ramen de ternera</p>
              <table>
                <tr>
                  <td>Calorías</td>
                  <td>Proteínas</td>
                  <td>Carbohidratos</td>
                  <td>Grasas</td>
                </tr>
                <tr>
                  <td>482 kcal</td>
                  <td>26 g</td>
                  <td>61 g</td>
                  <td>15 g</td>
                </tr>
              </table>
              <a
                href="https://www.myprotein.es/thezone/recetas/ramen-de-ternera/"
                target="_blank" rel="noreferrer"
              >
                Ver Receta
              </a>
            </div>
          </div>
        </div>
      </div>
)}