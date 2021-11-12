import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import App from './App';
import Inicial from './paginaInicial';


const Rotas = () => {
   return (

      <Router>
         <div>
            <p>a</p>

            <Link to="/quiz">quiz</Link>,
            <Link to="/">home</Link>,

            <Routes>
               <Route path="/" exact component={Inicial} />
               <Route path="/quiz" exact component={App} />
            </Routes>
         </div>
      </Router>

   )
}
export default Rotas