import { useContext } from "react";
import { useCollectionData} from "react-firebase-hooks/firestore";
import { Input } from "../../components/Input";
import { authContext } from "../../context/authContext";
import { useValidacion } from "../../hooks";

const STATE_INICIAL = {
    review: "",
    calificacion: 5
}

const validarCampos = (valores) =>{
    let errores = {};
    //Valida review
    if(!valores.review) errores.review = "La reseña es obligatoria";
    return errores
}

const Review = ({bookId})=>{
    const {firebase, usuario} = useContext(authContext);
    const reviewsRef = firebase.getCollection("Reviews");
    const reviewsQuery = reviewsRef.where("idBook", "==", bookId);
    const [reviews, loading] = useCollectionData(reviewsQuery, {idField: "id"});
    console.log(reviews)

    const {Valores, Errores, handleChange, handleSubmit, handleBlur} = useValidacion(STATE_INICIAL,validarCampos, enviarReview);
    const {review, calificacion} = Valores;

    function enviarReview(){
        firebase.regReview(bookId, usuario.displayName, review, calificacion);
    }

    return(
        <section>
            <form onSubmit={handleSubmit}>
				
						<div className="center-align">
						 <label className="black-text"><h5>Reseña</h5></label>
                <Input type="text" id="review" name="review" placeholder="review" onChange={handleChange} onBlur={handleBlur} value={review}/>
				</div>
				
                {Errores.review && 
					<div className="center">
							
					<p className="card-panel pink accent-4">{Errores.review}</p>
							
						</div>
				}
				
                <select name="calificacion" id="calificacion" value={calificacion} onChange={handleChange} onBlur={handleBlur} >
                    <option value="5">⭐⭐⭐⭐⭐</option>
                    <option value="4">⭐⭐⭐⭐</option>
                    <option value="3">⭐⭐⭐</option>
                    <option value="2">⭐⭐</option>
                    <option value="1">⭐</option>
                 </select>
				<div className="center">
                <button className="btn waves-effect waves-light" type="submit" id="enviar" name="enviar">Escribir Reseña </button> 
				</div>
            </form>

            <div>
                <div className="row container">
                    <div className="col l12 m8 s12">
                        <h2 className="center white-text"> <i> Reseñas del titulo </i></h2>
                    </div>
            </div>
                {loading?<div className="row container">
          <div className="col l12 m12 s12 center"> 
              <div className="preloader-wrapper big active">
              <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
              <div className="circle"></div>
              </div>
              <div className="gap-patch">
              <div className="circle"></div>
             </div><div className="circle-clipper right">
            <div className="circle"></div>
            </div>
          </div>
        </div>
          </div>
        </div>:
                (
                    reviews.map(({autor, text, createdAt, id, calificacion})=>(
                        <div className="card" key={id}>
                            <div className="card-content">
                            {<p> <b>Hora y Fecha: </b> <i> {createdAt?.toDate()?.toString()} </i> </p>}
                            <p> <b>Autor: </b> <i> {autor}: {text} </i> </p>
                            <p> <b>Calificacion: </b> <i>{"⭐".repeat(calificacion)} </i> </p>
                        </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    )
}

export default Review;