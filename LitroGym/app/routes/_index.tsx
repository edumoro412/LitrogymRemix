export default function Index() {
  return (
    <div>
      <div className="home-content">
        <div className="home-info">
          <p className="home-slogan">
            <b>LITROGYM</b>
          </p>
          <img src="/imgs/logo.png" alt="" className="home-logo2"></img>
          <p className="home-textContent">
            ALCANZA TUS METAS DENTRO Y FUERA DEL GIMNASIO!
          </p>
          <br />
          <br />
          <p>
            DIETAS PERSONALIZADAS, RUTINAS DIFERENTES Y AJUSTADAS A CADA UNO,
            EJERCICIOS ESPECIFICOS Y MUCHO MÁS
          </p>
        </div>
      </div>
      <div className="home-end">
        <p className="home-endName">
          <b>NUESTROS SERVICIOS</b>
        </p>
        <p className="home-tipo">ALIMENTACION PERSONALIZADA:</p>
        <p className="home-tipo">CREA TU RUTINA:</p>
        <p className="home-tipo">EJERCICIOS ESPECÍFICOS:</p>
        <button className="home-services" id="alimentacion"></button>
        <button className="home-services" id="rutina"></button>
        <button className="home-services" id="ejercicios"></button>
      </div>
    </div>
  );
}
