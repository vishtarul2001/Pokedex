import CustomRoutes from './routes/CoustomRoutes'
import {Link} from 'react-router-dom';
import './App.css'

function App() {
  

  return (
    <div className="outer-pokedex">
      <h1 id="pokedex-heading">
        <Link to="/">Pokedex</Link>
      </h1>
      <CustomRoutes />
    </div>
  )
}

export default App
