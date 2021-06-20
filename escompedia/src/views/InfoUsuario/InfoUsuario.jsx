

const InfoUsuario = ()=>{

    return(
        <main>
			<div className="card-panel black">
				<div className="white-text">
            <h2 className="center-align">Información del Usuario</h2>
			</div>
			</div>
			<div className="row">
				 <div className="col s4">
					  <div className="card-panel light-blue darken-3">
            <p className="center-align">Nombre:</p>
					 </div>
				</div>
				 <div className="col s4">
					 <div className="card-panel light-blue darken-2">
			<p className="center-align">Correo:</p>
					 </div>
				</div>
				 <div className="col s4">
					 <div className="card-panel light-blue darken-1">
			<p className="center-align">Escuela:</p>
					 </div>
				</div>
				</div>
			
			<footer className="page-footer blue accent-4">
          <div class="container">
            <div class="row">
              <div class="col l12 s12">
                <h5 class="white-text">Contacto</h5>
                <p class="grey-text text-lighten-4">Cualquier duda o comentario puedes enviarla al correo escompedia@gmail.com</p>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
                © 2021 Copyright Text
            <a class="grey-text text-lighten-4 right" href="https://www.escom.ipn.mx/">ESCOM</a>
            </div>
          </div>
</footer>
        </main>
    );
}

export default InfoUsuario;