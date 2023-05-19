//import { act } from "react-dom/test-utils";

const uuidRegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;


//Objeto que almacena el estado de los filtros (activo o inactivo) y el valor a filtrar (por ejemplo filtrar por dieta="vegan")
const filtersHandler={
    dietFilter: {
      isActive: false,
      value: ""
    },
    originFilter: {
      isActive: false,
      value: ""
    },
    orderFilter: {
      isActive: false,
      value: ""
    }
  }

//Funcion que recibe un array (copia del listado de recipes) y retorna el array con los filtros activos aplicados
const applyFilters=(array)=>{

   let filterArray=[...array]  //Se hace una copia del array recibido
 
   if(filtersHandler.dietFilter.isActive){ //Primer filtro, dietas activo?
                    //Filtro recipes en las que se incluya la dieta especificada por payload
        filterArray=filterArray.filter( recipe=>recipe.diets.includes(filtersHandler.dietFilter.value) )  
   }

   if(filtersHandler.originFilter.isActive){  //Segundo filtro, origen activo?
                    //Filtro recipes segun id, si el id es tipo uuid, proviene de la BDD sino proviene de la API spoonacular
        if(filtersHandler.originFilter.value==="api")filterArray=filterArray.filter( recipe=> !uuidRegExp.test(recipe.id) )
        if(filtersHandler.originFilter.value==="bdd")filterArray=filterArray.filter( recipe=> uuidRegExp.test(recipe.id) ) 
        
   }

   if(filtersHandler.orderFilter.isActive){  //Tercer filtro, orden activo?

                //EL valor que llega por payload puede ser: "A" , "D" , "H_A" , "H_D" esto esta difinido en componente Filters.jsx
         switch (filtersHandler.orderFilter.value) {
            case "A":
                filterArray.sort((a,b)=> {      //A = Orden alfabetico de manera ascendete
                    if (a.title < b.title) {
                        return -1;
                      }
                      if (a.title > b.title) {
                        return 1;
                      }
                      return 0;
                }) 
                break;

            case "D":                          //D = Orden alfabetico de manera descendete
                filterArray.sort((a,b)=> {
                    if (a.title > b.title) {
                        return -1;
                      }
                      if (a.title < b.title) {
                        return 1;
                      }
                      return 0;
                })
                break; 
            
            case "H_A":                       //H_A= Ordena por healScore de manera ascendente
                filterArray.sort((a,b)=> a.healthScore - b.healthScore)
                break; 

            case "H_D":                       //H_D= Ordena por healScore de manera descendente
                filterArray.sort((a,b)=> b.healthScore - a.healthScore)
                break; 
            
         
            default:
                break;
         }

   }
    
   return filterArray                       //Retorna array modificado por los filtros


}


const initialState={
    recipes_before_filters:[],//Donde almaceno la respuesta de mi api ya sean 100 recipes o la busqueda por name
    recipes_to_show:[],      //Para almacenar las recipes a mostrar en "/home", esta puede variar segun busquedas o filtros
    
    recipe_detail:{},    //Para almacenar una recipe de la cual se mostraran sus detalles
    all_diets:[],       //Para almacernar listado de dietas

    filter_diet:"",
    filter_origin:"",
    filter_order:"",
}

const reducer= (state=initialState,action)=>{
    switch (action.type) {
        
        case 'READ_ALL_RECIPES':        //Cargo recipes_before_filters con la data traida del back y recipes_to_show inicialmente muestra todas tambien
            return {...state,recipes_to_show:action.payload,recipes_before_filters:action.payload}
            
       
        case 'GET_DETAIL':  //Cargo recipe_detail con la data recibida segun id
            return {...state,recipe_detail:action.payload}

        case 'CLEAN_DETAIL':
            return {...state,recipe_detail:action.payload}

        case 'SEARCH_NAME':             //Voy a mostrar los resultados de la busqueda
            return {...state,recipes_to_show:action.payload,
                     recipes_before_filters:action.payload,
                     filter_diet:"",    //Reinicio filtros
                     filter_order:"",
                     filter_origin:""
                    }


        case 'GET_DIETS':              //Almaceno el resultado de get /diets
            return {...state,all_diets:action.payload}


        
        case 'FILTER_BY_DIET':

                if(action.payload!=="default"){     //Si llega un valor a filtrar
                    filtersHandler.dietFilter.isActive=true   //Activo filtro
                    filtersHandler.dietFilter.value=action.payload  //le paso valor al filtro
                    let array= applyFilters( [...state.recipes_before_filters]) //Lamo a funcion que aplica filtros pasandole una copia de mis recipes
                    return{
                        ...state,
                        recipes_to_show:array,                       //Muestro los recipes segun resultado de los filtros
                        filter_diet:action.payload
                    }
                }else{                                          //Si llega defaulta por payload
                    filtersHandler.dietFilter.isActive=false   //Desactivo filtro
                    let array=applyFilters( [...state.recipes_before_filters])  //Aplico filtros
                    return{
                        ...state,
                        recipes_to_show:array,                   //Muestro resultado con el filtro desactivado
                        filter_diet:action.payload
                    }
                }
                
           
        
        case 'FILTER_BY_ORIGIN':
                 

                if(action.payload!=="default"){
                    filtersHandler.originFilter.isActive=true  //Activo filtro
                    filtersHandler.originFilter.value=action.payload //Le paso valor al filtro
                    let array= applyFilters( [...state.recipes_before_filters])
                    return{
                        ...state,
                        recipes_to_show:array,
                        filter_origin:action.payload 
                    }
                }else{
                    filtersHandler.originFilter.isActive=false   //Desactivo filtro
                    let array=applyFilters( [...state.recipes_before_filters])  //Aplico filtros
                    return{
                        ...state,
                        recipes_to_show:array,
                        filter_origin:action.payload
                    }

                }


            
        case  'FILTER_BY_ORDER':
                 if(action.payload!=="default"){
                    filtersHandler.orderFilter.isActive=true  //Activo filtro
                    filtersHandler.orderFilter.value=action.payload //Le paso valor al filtro
                    let array= applyFilters( [...state.recipes_before_filters])
                    return{
                        ...state,
                        recipes_to_show:array,
                        filter_order:action.payload 
                    }
                }else{
                    filtersHandler.orderFilter.isActive=false   //Desactivo filtro
                    let array=applyFilters( [...state.recipes_before_filters])  //Aplico filtros
                    return{
                        ...state,
                        recipes_to_show:array,
                        filter_order:action.payload
                    }
    
                }      
                    


        default:
            return {...state};
    }
}

export default reducer;


