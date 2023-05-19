import axios from "axios";
//const endpoint = 'http://localhost:3001/';
const endpoint= 'https://pifoodsbackend-production.up.railway.app/'

export const readAllRecipes=()=>{

    return async (dispatch)=>{
        try {
            const response= await axios.get(`${endpoint}recipes`)  //End point para que el server me de todas las recetas
            const data=response.data
            return dispatch({type:'READ_ALL_RECIPES',payload:data})
        } catch (error) {
            console.log("Error al leer recipes ",error.message)            
        }
    }

}

export const getRecipeDetail=(recipeID)=>{

    return async (dispatch)=>{
        try {
            const response= await axios.get(`${endpoint}recipes/${recipeID}`)
            const data=response.data
            return dispatch({type:'GET_DETAIL',payload:data })
        } catch (error) {
            console.log("Error al leer detalles ",error.message)
        }
    }
}

export const cleanDetail=()=>{
    return {
        type:'CLEAN_DETAIL',
        payload:{}
    }
}
export const getByName=(name)=>{

    return async (dispatch)=>{
        try {
            const response = await axios.get(`${endpoint}recipes?name=${name}`)
            const data=response.data
            //console.log("Respuesta del servidor ",data)
            return dispatch({type:'SEARCH_NAME',payload:data})
        } catch (error) {
            console.log("Error = ",error.response.data)
            alert("No search results")
        }
    }
}

export const getAllDiets=()=>{
    return async (dispatch)=>{
        try {
            const response= await axios.get(`${endpoint}diets`)
            const data=response.data
            return dispatch({type:'GET_DIETS',payload:data})
        } catch (error) {
            console.log("Error al obtener dietas ",error.message)
        }
    }
}

export const filterDiet=(dietName)=>{
    return{
        type:'FILTER_BY_DIET',
        payload:dietName
    }
}

export const filterOrigin=(origin)=>{
    return{
        type:'FILTER_BY_ORIGIN',
        payload:origin
    }
}

export const filterOrder=(order)=>{
    
    return{
        type:'FILTER_BY_ORDER',
        payload:order
    }
}
