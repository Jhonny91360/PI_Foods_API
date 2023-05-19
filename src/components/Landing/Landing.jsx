import { Link } from "react-router-dom";
import { readAllRecipes } from "../../redux/actions";
import { getAllDiets } from "../../redux/actions";
import { useDispatch } from "react-redux";
import styles from './Landing.module.css';

function Landing(){

const dispatch= useDispatch()

const initialData=()=>{
    dispatch(readAllRecipes() )
    dispatch(getAllDiets())
}
    return (
        <div className={styles['my-landing']}>
            <video autoPlay loop muted playsInline className={styles['video-background']}>
                <source src="pexels-pressmaster-3196344-3840x2160-25fps.mp4" type="video/mp4"/>
                Tu navegador no soporta video HTML5.
            </video>

            <div className={styles['my-welcome']} >
                <img src="welcome.jpg" alt="" className={styles['my-welcome-image']} />
                
                    <div>
                        <Link to="/home">
                        <button onClick={()=>initialData() } className={styles['button-start']}  >Let's  cook</button>
                        </Link>
                    </div>
                </div>
            </div>
       
    )
}

 export default Landing;