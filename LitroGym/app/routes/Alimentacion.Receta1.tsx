export default function Receta1() {
    return(
    <div className="recetas">
      <div className="titulo">
        <p>
          <b>RECETAS</b>
        </p>
      </div>
      <div className="flip-container">
        <div className="card">
          <div className="frente" id="pollo1"></div>
          <div className="dorso">
            <p>Pollo picante con cuscús</p>
            <table>
              <tr>
                <td>Calorías</td>
                <td>Proteínas</td>
                <td>Carbohidratos</td>
                <td>Grasas</td>
              </tr>
              <tr>
                <td>284 kcal</td>
                <td>50 g</td>
                <td>22 g</td>
                <td>3 g</td>
              </tr>
            </table>
            <a
              href="https://www.myprotein.es/thezone/recetas/pollo-picante-con-cuscus/"
              target="_blank" rel="noreferrer"
            >
              Ver Receta
            </a>
          </div>
        </div>
      </div>
      <div className="flip-container">
        <div className="card">
          <div className="frente" id="pollo2"></div>
          <div className="dorso">
            <p>Estofado de pollo</p>
            <table>
              <tr>
                <td>Calorías</td>
                <td>Proteínas</td>
                <td>Carbohidratos</td>
                <td>Grasas</td>
              </tr>
              <tr>
                <td>359 kcal</td>
                <td>37 g</td>
                <td>29 g</td>
                <td>13 g</td>
              </tr>
            </table>
            <a
              href="https://www.myprotein.es/thezone/recetas/estofado-de-pollo/"
              target="_blank" rel="noreferrer"
            >
              Ver Receta
            </a>
          </div>
        </div>
      </div>
      <div className="flip-container">
        <div className="card">
          <div className="frente" id="pollo3"></div>
          <div className="dorso">
            <p>Pasta con pollo cajún</p>
            <table>
              <tr>
                <td>Calorías</td>
                <td>Proteínas</td>
                <td>Carbohidratos</td>
                <td>Grasas</td>
              </tr>
              <tr>
                <td>516 kcal</td>
                <td>38 g</td>
                <td>71 g</td>
                <td>8 g</td>
              </tr>
            </table>
            <a
              href="https://www.myprotein.es/thezone/recetas/pasta-cremosa-con-pollo-cajun/"
              target="_blank" rel="noreferrer"
            >
              Ver Receta
            </a>
          </div>
        </div>
      </div>
    </div>
)}
