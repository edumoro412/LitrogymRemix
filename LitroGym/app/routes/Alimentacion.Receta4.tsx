export default function Receta4() {
    return(
      <div className="recetas">
      <div className="titulo">
        <p>
          <b>RECETAS</b>
        </p>
      </div>
      <div className="flip-container">
        <div className="card">
          <div className="frente" id="vegana1"></div>
          <div className="dorso">
            <p>Hamburguesa vegana de remolacha</p>
            <table>
              <tr>
                <td>Calorías</td>
                <td>Proteínas</td>
                <td>Carbohidratos</td>
                <td>Grasas</td>
              </tr>
              <tr>
                <td>455 kcal</td>
                <td>21 g</td>
                <td>68 g</td>
                <td>11 g</td>
              </tr>
            </table>
            <a
              href="https://www.myprotein.es/thezone/recetas/hamburguesa-vegana-remolacha/"
              target="_blank" rel="noreferrer"
            >
              Ver Receta
            </a>
          </div>
        </div>
      </div>
      <div className="flip-container">
        <div className="card">
          <div className="frente" id="vegana2"></div>
          <div className="dorso">
            <p>Boloñesa de lentejas vegana</p>
            <table>
              <tr>
                <td>Calorías</td>
                <td>Proteínas</td>
                <td>Carbohidratos</td>
                <td>Grasas</td>
              </tr>
              <tr>
                <td>486 kcal</td>
                <td>21 g</td>
                <td>86 g</td>
                <td>6 g</td>
              </tr>
            </table>
            <a
              href="https://www.myprotein.es/thezone/recetas/bolonesa-de-lentejas-vegana/"
              target="_blank" rel="noreferrer"
            >
              Ver Receta
            </a>
          </div>
        </div>
      </div>
      <div className="flip-container">
        <div className="card">
          <div className="frente" id="vegana3"></div>
          <div className="dorso">
            <p>Tacos veganos de coliflor</p>
            <table>
              <tr>
                <td>Calorías</td>
                <td>Proteínas</td>
                <td>Carbohidratos</td>
                <td>Grasas</td>
              </tr>
              <tr>
                <td>278 kcal</td>
                <td>11 g</td>
                <td>23 g</td>
                <td>15 g</td>
              </tr>
            </table>
            <a
              href="https://www.myprotein.es/thezone/recetas/tacos-veganos-de-coliflor/"
              target="_blank" rel="noreferrer"
            >
              Ver Receta
            </a>
          </div>
        </div>
      </div>
    </div>
)}