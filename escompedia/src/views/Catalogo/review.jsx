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
    const [reviews, loading, error] = useCollectionData(reviewsQuery, {idField: "id"});
    console.log(reviews)

    const {Valores, Errores, handleChange, handleSubmit, handleBlur} = useValidacion(STATE_INICIAL,validarCampos, enviarReview);
    const {review, calificacion} = Valores;

    function enviarReview(){
        firebase.regReview(bookId, usuario.displayName, review, calificacion);
    }

    return(
        <section>
            <form onSubmit={handleSubmit}>
                <Input type="text" id="review" name="review" placeholder="review" onChange={handleChange} onBlur={handleBlur} value={review}/>
                {Errores.review && <p>{Errores.review}</p> }
                <select name="calificacion" id="calificacion" value={calificacion} onChange={handleChange} onBlur={handleBlur} >
                    <option value="5">⭐⭐⭐⭐⭐</option>
                    <option value="4">⭐⭐⭐⭐</option>
                    <option value="3">⭐⭐⭐</option>
                    <option value="2">⭐⭐</option>
                    <option value="1">⭐</option>
                 </select>
                <Input type="submit" id="enviar" name="enviar" value="Escribir reseña"/>   
            </form>

            <div>
                <h1>Reseñas</h1>
                {loading?<h2>Loading reviews...</h2>:
                (
                    reviews.map(({autor, text, createdAt, id, calificacion})=>(
                        <div key={id}>
                            {<p>{createdAt?.toDate()?.toString()}</p>}
                            <p>{autor}: {text}</p>
                            <p>{"⭐".repeat(calificacion)}</p>
                        </div>
                    ))
                )}
            </div>
        </section>
    )
}

export default Review;