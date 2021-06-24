import "./estilosCatalogo.css";
import { useContext, useEffect } from "react";
import { useCollectionData} from "react-firebase-hooks/firestore";
import { authContext } from "../../context/authContext";
import { useValidacion } from "../../hooks";
import M from "materialize-css"

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

    useEffect(() => {
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems, "");
    }, [])

    return(
        <section>
            <form onSubmit={handleSubmit} className="formReview">
            <h5 className="center-align">Escribe tu reseña</h5>

                <div className="input-field col s12">
                    <div className="center-align">
                        <i className="material-icons prefix colorIcon iconLeft">rate_review</i>
                        <input type="text" id="review" name="review" placeholder="Review" onBlur={handleBlur} onChange={handleChange} value={review} />
                    </div>
                </div>

                {Errores.review &&
                    <div className="center">
                        <p className="card-panel pink accent-4 text-white">{Errores.review}</p>
                    </div>
                }
                <div className="input-field col s6">
                <i className="material-icons prefix colorIcon">stars</i>
                    <select name="calificacion" id="calificacion" value={calificacion} onChange={handleChange} onBlur={handleBlur} >
                        <option value="5">⭐⭐⭐⭐⭐</option>
                        <option value="4">⭐⭐⭐⭐</option>
                        <option value="3">⭐⭐⭐</option>
                        <option value="2">⭐⭐</option>
                        <option value="1">⭐</option>
                    </select>
                </div>
                <div className="center">
                    <button className="btn waves-effect waves-light colorSubmit" type="submit" id="enviar" name="enviar">Escribir Reseña </button>
                </div>
            </form>

            <div>
                <div className="row container">
                    <div className="col l12 m8 s12">
                        <h3 className="center"> Reseñas del libro</h3>
                    </div>
                </div>
                {loading ? <div className="row container">
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
                </div> :
                    (
                        reviews.map(({ autor, text, createdAt, id, calificacion }) => (
                            <div className="card" key={id}>
                                <div className="card-content">
                                    {<p> <b className="indigo-text text-darken-4">Fecha: </b> <i> {createdAt?.toDate()?.toString()} </i> </p>}
                                    <p> <b className="indigo-text text-darken-4">{autor} escribió:</b>  {text} </p>
                                    <p> <b className="indigo-text text-darken-4">Calificacion: </b> {"⭐".repeat(calificacion)} </p>
                                </div>
                            </div>
                        ))
                    )}
            </div>
        </section>
    )
}

export default Review;