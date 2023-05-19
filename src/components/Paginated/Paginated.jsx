import React from 'react'
import styles from './Paginated.module.css';

const Paginated = ({page, setPage, max}) => {
    const pages = Array.from({length: max}, (_, i) => i + 1);
    

    const createButton = (paginas)=>{  //Funcion crea botones, el boton sera mas grande si es el numero de la pagina actual
      if(paginas===page) return (<button key={paginas} className={styles['my-actualButton']} onClick={() => setPage(paginas)}>{paginas}</button>)
      else return (<button key={paginas} onClick={() => setPage(paginas)}>{paginas}</button>)
    } 
  
    

  return (
    <div className={styles['my-paginated']} >
    
    <button  disabled={page === 1} onClick={() =>{if(page>1){setPage(page-1)}}}>{"<"}</button>
    {/* Mostrar botones para cada página */}
    {pages.map((paginas) => (
      createButton(paginas) //LLamo a la funcion para crear botones
    ))}
    <button  disabled={page === max? true:false} onClick={() => setPage(page + 1)}>{">"}</button>
  </div>
  )
}
export default Paginated