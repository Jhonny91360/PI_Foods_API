import { useState } from 'react';
import { getByName } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import styles from './SearchBar.module.css'

function SearchBar({setPage}) {

    const[name,setName]=useState("");

    const dispatch= useDispatch();  

    const searchName=(name)=>{
        dispatch(getByName(name))
        setPage(1)//Para volver a la primer pagina cuando hago una busqueda
    }

    const  handleChange= (event)=>{
        setName(event.target.value)
     }

  

   return (
      <div className={styles["search-container"]} >
         <input type='search'    onChange={handleChange}  className={styles["search-container"]}  placeholder="What are you looking for" />
         <button onClick={ ()=>{ searchName(name) } }   className={styles["search-boton"]}  >Search</button>
      </div>
   );
}

export default SearchBar;
