export default function Receta5() {
    return(
      <div className="recetas">
      <div className="titulo">
        <p>
          <b>RECETAS</b>
        </p>
      </div>
      <div className="flip-container">
        <div className="card">
          <div className="frente" id="postres1"></div>
          <div className="dorso">
            <p>Tortitas proteicas de plátano</p>
            <table>
              <tr>
                <td>Calorías</td>
                <td>Proteínas</td>
                <td>Carbohidratos</td>
                <td>Grasas</td>
              </tr>
              <tr>
                <td>155 kcal</td>
                <td>15 g</td>
                <td>14 g</td>
                <td>1 g</td>
              </tr>
            </table>
            <a
              href="https://www.myprotein.es/thezone/recetas/tortitas-proteicas-de-platano/"
              target="_blank" rel="noreferrer"
            >
              Ver Receta
            </a>
          </div>
        </div>
      </div>
      <div className="flip-container">
        <div className="card">
          <div className="frente" id="postres2"></div>
          <div className="dorso">
            <p>Brownie Proteico</p>
            <table>
              <tr>
                <td>Calorías</td>
                <td>Proteínas</td>
                <td>Carbohidratos</td>
                <td>Grasas</td>
              </tr>
              <tr>
                <td>92 kcal</td>
                <td>12 g</td>
                <td>2 g</td>
                <td>3 g</td>
              </tr>
            </table>
            <a
              href="https://www.myprotein.es/thezone/recetas/brownie-proteico/"
              target="_blank" rel="noreferrer"
            >
              Ver Receta
            </a>
          </div>
        </div>
      </div>
      <div className="flip-container">
        <div className="card">
          <div className="frente" id="postres3"></div>
          <div className="dorso">
            <p>Gofres proteicos</p>
            <table>
              <tr>
                <td>Calorías</td>
                <td>Proteínas</td>
                <td>Carbohidratos</td>
                <td>Grasas</td>
              </tr>
              <tr>
                <td>492 kcal</td>
                <td>42 g</td>
                <td>62 g</td>
                <td>8.7 g</td>
              </tr>
            </table>
            <a
              href="https://www.myprotein.es/thezone/recetas/gofres-proteicos-marino-katsouris/"
              target="_blank" rel="noreferrer"
            >
              Ver Receta
            </a>
          </div>
        </div>
      </div>
    </div>
)}