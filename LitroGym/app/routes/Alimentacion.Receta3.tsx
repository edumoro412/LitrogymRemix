export default function Receta3() {
    return(
      <div className="recetas">
      <div className="titulo">
        <p>
          <b>RECETAS</b>
        </p>
      </div>
      <div className="flip-container">
        <div className="card">
          <div className="frente" id="pescado1"></div>
          <div className="dorso">
            <p>Filetes de atún con boniato</p>
            <table>
              <tr>
                <td>Calorías</td>
                <td>Proteínas</td>
                <td>Carbohidratos</td>
                <td>Grasas</td>
              </tr>
              <tr>
                <td>342 kcal</td>
                <td>38 g</td>
                <td>33 g</td>
                <td>7 g</td>
              </tr>
            </table>
            <a
              href="https://www.myprotein.es/thezone/recetas/atun-con-boniato/"
              target="_blank" rel="noreferrer"
            >
              Ver Receta
            </a>
          </div>
        </div>
      </div>
      <div className="flip-container">
        <div className="card">
          <div className="frente" id="pescado2"></div>
          <div className="dorso">
            <p>Salmón al pesto</p>
            <table>
              <tr>
                <td>Calorías</td>
                <td>Proteínas</td>
                <td>Carbohidratos</td>
                <td>Grasas</td>
              </tr>
              <tr>
                <td>496 kcal</td>
                <td>40 g</td>
                <td>16 g</td>
                <td>29 g</td>
              </tr>
            </table>
            <a
              href="https://www.myprotein.es/thezone/recetas/salmon-al-pesto/"
              target="_blank" rel="noreferrer"
            >
              Ver Receta
            </a>
          </div>
        </div>
      </div>
      <div className="flip-container">
        <div className="card">
          <div className="frente" id="pescado3"></div>
          <div className="dorso">
            <p>Ensalada de pasta</p>
            <table>
              <tr>
                <td>Calorías</td>
                <td>Proteínas</td>
                <td>Carbohidratos</td>
                <td>Grasas</td>
              </tr>
              <tr>
                <td>415 kcal</td>
                <td>26 g</td>
                <td>40 g</td>
                <td>20 g</td>
              </tr>
            </table>
            <a
              href="https://www.myprotein.es/thezone/recetas/ensalada-pasta-saludable-deliciosa/"
              target="_blank" rel="noreferrer"
            >
              Ver Receta
            </a>
          </div>
        </div>
      </div>
    </div>
)}