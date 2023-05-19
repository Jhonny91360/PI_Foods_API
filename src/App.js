import './App.css';
import Landing from './components/Landing/Landing'
import Recipes from './components/Recipes/Recipes';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';

import {  Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
   
         <Route exact path="/" component={Landing} />
         <Route path="/home" component={Recipes} />
         <Route path="/detail/:id" component={Detail} />
         <Route path="/form" component={Form} />
        
    </div>
  );
}

export default App;

