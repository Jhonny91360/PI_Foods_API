import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getRecipeDetail,cleanDetail } from "../../redux/actions";
import { Link } from "react-router-dom";
import styles from './Detail.module.css';

function Detail(){

const {id}=useParams();
const dispatch=useDispatch();

const detail= useSelector( (state)=>state.recipe_detail)

if( Array.isArray(detail.analyzedInstructions) && detail.analyzedInstructions.length>0 ){  //Si es un array es porque viene del spooncular
    let instrutions= detail.analyzedInstructions[0].steps.map( (step)=>{
        return step.number +". "+step.step;
    } ) 
    instrutions=instrutions.join(" ");
    detail.analyzedInstructions=instrutions;
   
}


useEffect( ()=>{
    dispatch( getRecipeDetail(id) )

    return () => {
        // Código que se ejecuta cuando se va a desmontar el componente
        dispatch(cleanDetail())
      };
},[dispatch,id])

    return (
        <div className={styles.container}>
            {/* <h1> id:{id} </h1> */}
            <h1> {detail.title} </h1>
             <p>⏯ Summary: {detail.summary?.replace( /(<([^>]+)>)/ig, '')} </p>
            <img src={detail.image} alt={detail.title} />
            <br />
            <div><span>💚Health Score:  {detail.healthScore} </span></div>
            <br />
            <ul>Diets: {
                detail.diets?.map(diet=>{
                return <li key={diet}>{diet}</li>
                })
            }</ul>
            <p> ✅ Steps:  {detail.analyzedInstructions} </p>
            <div  className={styles.divButtons} >
                <Link to="/home">
                <button className={styles.goBack}>Go back</button>
                </Link>
            </div>
        </div>
    )
}

 export default Detail;