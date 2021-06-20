import Footer from "../../components/layout/Footer";

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
			
			<Footer></Footer>
        </main>
    );
}

export default InfoUsuario;