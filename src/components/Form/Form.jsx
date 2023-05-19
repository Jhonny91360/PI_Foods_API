import { useEffect, useState } from "react";
import axios from "axios";
import styles from './Form.module.css';
import { Link } from "react-router-dom";
import { readAllRecipes } from "../../redux/actions";
import { useDispatch } from "react-redux";


//const URL= 'http://localhost:3001/'
const URL= 'https://pifoodsbackend-production.up.railway.app/'

const validate=(form,setErrors)=>{  
  const newErrors = {};
  newErrors.isActive=false

  if (!form.title) {newErrors.title = "You must enter a recipe name"} 
  else {newErrors.title = "";}

  if (!form.summary) {newErrors.summary = "Enter a summary of the recipe"}
  else {newErrors.summary = ""}

  if (form.healthScore<1 || form.healthScore>100) {newErrors.healthScore = "You must enter a health score [1-100]"} 
  else {newErrors.healthScore = "";}

  if(/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/.test(form.image)){
    newErrors.image="";
  }else{newErrors.image="You must enter a valid url format for images"}

  if (!form.analyzedInstructions) {newErrors.analyzedInstructions = "Enter the preparation instructions"} 
  else {newErrors.analyzedInstructions = ""}


  if(form.diets.length<1){newErrors.diets = "You must choose at least one diet" }
  else{newErrors.diets = ""}

  for(let property in newErrors){
    if(newErrors[property]) { newErrors.isActive=true}
  }


  setErrors(newErrors);

}



function Form(){

const dispatch=useDispatch()

const [form, setForm]= useState({
    //Datos que se enviaran para crear el Recipe
    title:"",
    summary:"",
    healthScore:0,
    analyzedInstructions:"",
    image:"",
    diets:[]

})

const [errors,setErrors]=useState({
    //Para visualizar errores en tiempo real
    title:"",
    summary:"",
    healthScore:"",
    analyzedInstructions:"",
    image:"",
    diets:"",
    isActive:true
})

const handleChange=(event)=>{
    
    const property=event.target.name
    const value= event.target.value
    
    //console.log(`cambio detectado en ${property} con valor de ${value} `)

    if(property==="diets"){
        let isActive= event.target.checked
        let arrayDiets=[...form.diets]
        
        if(isActive) {
            arrayDiets.push(Number(value))
            setForm({...form,[property]:arrayDiets})
        }
        
        else{
            let index= arrayDiets.indexOf(value)
            arrayDiets.splice(index,1)
            setForm({...form,[property]:arrayDiets})
        }

        validate({ ...form, [property]:arrayDiets},setErrors);
    }
    else{
        setForm({ ...form, [property]: value });
        validate({ ...form, [property]: value }, setErrors);
    }
    
    

}

const submitHandler=async(event)=>{
    event.preventDefault()
    
    for(let property in errors){
        if(errors[property]) return alert ("Faltan datos")
    }

    try {
         await axios.post(`${URL}recipes`,form)

    } catch (error) {
        console.log("Error: ",error.response.data)
        return alert(error.response.data)
    }
    
    console.log("Recipe created")
    alert("Recipe created")
    dispatch(readAllRecipes() )   //Actualizo mis recipes
}

useEffect( ()=>{
    validate({ ...form},setErrors);
},[form,setErrors])

const buttonCreate=()=>{
      if(errors.isActive){
        return <button type="submit" disabled={errors.isActive} className={styles.buttonError} >Create</button>
      }else{
        return <button type="submit" disabled={errors.isActive} className={styles.buttonOk} >Create</button>
      }
}

    return (
        <div>
            <form action="" onSubmit={submitHandler} className={styles.formulario} >
                <div className={styles.campo}>
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" onChange={handleChange} value={form.title}/>
                    <br /><span className={styles.errors} >{errors.title}</span>
                </div>
                <div className={styles.campo}>
                    <label htmlFor="summary">Summary: </label>
                    <p><textarea name="summary" id="" cols="45" rows="8" onChange={handleChange} value={form.summary}></textarea></p>
                    <br /><span className={styles.errors} >{errors.summary}</span>
                </div>
                <div >
                    <label htmlFor="healthScore">Health score: </label>
                    <input type="number" min="0" max="100" onChange={handleChange} name="healthScore" />
                    <br /><span className={styles.errors}>{errors.healthScore}</span>
                </div>
                <div className={styles.campo}>
                    <label htmlFor="image">Image: </label>
                    <input type="text" name="image" onChange={handleChange} value={form.image}/>
                    <br /><span className={styles.errors} >{errors.image}</span>
                </div>
                <div className={styles.campo}>
                    <label htmlFor="analyzedInstructions">Instructions: </label>
                    <p><textarea name="analyzedInstructions" id="" cols="45" rows="8" onChange={handleChange} value={form.analyzedInstructions}></textarea></p>
                    <br /><span className={styles.errors} >{errors.analyzedInstructions}</span>
                </div>
                <div>
                <label>Select at least one type of diet:</label>
                    <div>
                        <input type="checkbox" id="gluten free" name="diets" value={1} onChange={handleChange}/>
                        <label htmlFor="gluten free">gluten free</label>
                    </div>
                    <div>
                        <input type="checkbox" id="dairy free" name="diets" value={2} onChange={handleChange} />
                        <label htmlFor="dairy free">dairy free</label>
                    </div>
                    <div>
                         <input type="checkbox" id="lacto ovo vegetarian" name="diets" value={3} onChange={handleChange}/>
                         <label htmlFor="lacto ovo vegetarian">lacto ovo vegetarian</label>
                    </div>
                    <div>
                         <input type="checkbox" id="vegan" name="diets" value={4} onChange={handleChange}/>
                         <label htmlFor="vegan">vegan</label>
                    </div>
                    <div>
                         <input type="checkbox" id="paleolithic" name="diets" value={5} onChange={handleChange}/>
                         <label htmlFor="paleolithic">paleolithic</label>
                    </div>
                    <div>
                        <input type="checkbox" id="primal" name="diets" value={6} onChange={handleChange}/>
                        <label htmlFor="primal">primal</label>
                    </div>
                    <div>
                        <input type="checkbox" id="whole 30" name="diets" value={7} onChange={handleChange}/>
                        <label htmlFor="whole 30">whole 30</label>
                    </div>
                    <div>
                        <input type="checkbox" id="pescatarian" name="diets" value={8} onChange={handleChange}/>
                        <label htmlFor="pescatarian">pescatarian</label>
                    </div>
                    <div>
                        <input type="checkbox" id="ketogenic" name="diets" value={9} onChange={handleChange}/>
                        <label htmlFor="ketogenic">ketogenic</label>
                    </div>
                    <div>
                        <input type="checkbox" id="fodmap friendly" name="diets" value={10} onChange={handleChange}/>
                        <label htmlFor="fodmap friendly">fodmap friendly</label>
                    </div>
                    <br /><span className={styles.errors} >{errors.diets}</span>
                </div>
                <div  className={styles.divButtons} >
                <Link to="/home">
                <button className={styles.goBack}>Go back</button>
                </Link>
                    { buttonCreate() }
                {/* <button type="submit" disabled={errors.isActive} >Create</button> */}
                </div>
            </form>
        </div>
    )
}

 export default Form;