

const InfoUsuario = ()=>{

    return(
        <main>
			<div className="card-panel indigo darken-4">
				<div className="white-text">
            <h2 className="center-align">Información del Usuario</h2>
			</div>
			</div>
			<div className="row">
				 <div className="col s4">
					  <div className="card-panel green accent-2">
            <p className="center-align">Nombre:</p>
					 </div>
				</div>
				 <div className="col s4">
					 <div className="card-panel lime accent-2">
			<p className="center-align">Correo:</p>
					 </div>
				</div>
				 <div className="col s4">
					 <div className="card-panel orange lighten-1">
			<p className="center-align">Escuela:</p>
					 </div>
				</div>
				</div>
        </main>
    );
}

export default InfoUsuario;