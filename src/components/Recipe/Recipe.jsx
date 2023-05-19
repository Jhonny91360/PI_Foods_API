import { Link } from "react-router-dom";
import styles from './Recipe.module.css';

export  function Recipe({id,image,title,diets}) {

   return (
      
      <div className={styles['my-card']} >

         <Link to={`/detail/${id}`} >
         <h3> {"👨‍🍳"} {title} {""}</h3>
            <div className={styles['my-card_recuadro']} >
               <img src={image} alt='' />
            </div>
         <div className={styles['overlay']} >
            <ul>Diets: <br /> <br /> {
            diets.map(diet=>{
            return <li key={diet}> {diet}</li>
            })
            } </ul>
         </div>
         </Link>
         
      </div>
      
   );
}


export default Recipe;