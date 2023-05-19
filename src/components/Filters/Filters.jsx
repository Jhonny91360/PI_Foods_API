import { useSelector } from "react-redux";
import { filterDiet,filterOrigin,filterOrder } from "../../redux/actions";
import { useDispatch } from "react-redux";
import styles from "./Filters.module.css";
import { useEffect } from "react";
import { useState } from "react";

function Filters({setPage}) {

    const [valueDiet, setValueDiet] = useState("default");
    const [valueOrigin, setValueOrigin] = useState("default");
    const [valueOrder, setValueOrder] = useState("default");

    const diet_value= useSelector( (state)=>state.filter_diet) 
    const origin_value=useSelector( (state)=>state.filter_origin) 
    const order_value=useSelector( (state)=>state.filter_order) 


    const diets= useSelector( (state)=>state.all_diets)
   
    const dispatch= useDispatch()

    const handlerDiet=(event)=>{
        dispatch(filterDiet(event.target.value))
        setPage(1)//Para volver a la primer pagina cuando hago una busqueda
    }
    const handlerOrigin=(event)=>{
        dispatch(filterOrigin(event.target.value))
        setPage(1)//Para volver a la primer pagina cuando hago una busqueda
    }
    const handlerOrder=(event)=>{
        dispatch(filterOrder(event.target.value))
        setPage(1)//Para volver a la primer pagina cuando hago una busqueda
    }

    useEffect( ()=>{
        setValueDiet(diet_value)
        setValueOrigin(origin_value)
        setValueOrder(order_value)
    } ,[diet_value,origin_value,order_value] )

    return (
        <div className={styles.filter} >

           <select name="" id="diet_type" value={valueDiet} className={styles["filter-select"]} onChange={handlerDiet}>   
                <option value="default">Select diet type</option>
                {
                    diets?.map( diet=>{
                        return(
                        <option key={diet.id} value={diet.name} > {diet.name} </option>
                        )
                    } )
                }    
            </select>

            <select name="" id="origin" value={valueOrigin}  className={styles["filter-select"]} onChange={handlerOrigin} >
                <option value="default">Select origin</option>
                <option value="api">from spoonacular</option>
                <option value="bdd">from user</option>
            </select>

            <select name="" id="order" value={valueOrder}  className={styles["filter-select"]} onChange={handlerOrder}>
                <option value="default">Select order</option>
                <option value="A">Ascendent</option>
                <option value="D">Descendent</option>
                <option value="H_A">Health score(↑) </option>
                <option value="H_D">Health score(↓) </option>
            </select>

    

        </div>
     );
}




export default Filters;