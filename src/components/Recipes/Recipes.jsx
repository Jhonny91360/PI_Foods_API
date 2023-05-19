import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Recipe from "../Recipe/Recipe";
import SearchBar from "../SearchBar/SearchBar";
import Filters from "../Filters/Filters";
import { useState } from "react";
import Paginated from "../Paginated/Paginated";
import styles from './Recipes.module.css';

function Recipes(){

//forzar cmabio git
    const recipes= useSelector( (state)=>state.recipes_to_show)
    
    
    

    ///COdigo para paginado//
    const [page, setPage] = useState(1);  //Estado para la pagina actual, inicia en 1
    const [perPage] = useState(9);       //Estado para la cantidad de elementos por pagina

    const startIndex = (page - 1) * perPage;  //para hallar el indice inicial del slice
    const endIndex = startIndex + perPage;    //para hallar el indice final del slice

    const max = Math.ceil(recipes?.length / perPage);  // para hallar la cantidad de paginas necesarias segun la cantidad de recetas

    const recipesPaginated= recipes?.slice(startIndex, endIndex);
    /////////////////////////

    //const dispatch= useDispatch()
    // useEffect( ()=>{
    //     // dispatch(readAllRecipes() )
    //     // dispatch(getAllDiets())
    // },[] )


    return (
        <div className={styles['my-home']}>
            <div className={styles['my-heading']}>
                <div className={styles['my-space']}>
                    {/* solo para ocupar espacio */}
                </div>

                <SearchBar setPage={setPage} />
                
                 <div className={styles['my-buttonDiv']} >
                    <Link to="/form">
                    <button >Create Recipe</button>
                    </Link>
                </div>
            </div>

            <Filters setPage={setPage} />
            
            <div className={styles['my-divFooter']}>
                <footer>
                    {/* Usamos componente de paginado al pie de pagina con las props necesarias */}
                    <Paginated page={page} setPage={setPage} max={max} />
                </footer>   
            </div> 
            
            <div  className={styles['my-cards']}>
            {  
         
                recipesPaginated.map(recipe => {
         
                    return <Recipe
                    key={recipe.id}
                    id={recipe.id}
                    title={recipe.title}
                    diets={recipe.diets}
                    image={recipe.image}
                    />
                })
            }
            </div>
            
        </div>
    )
}

 export default Recipes;