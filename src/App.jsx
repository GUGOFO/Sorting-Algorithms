import TabelaDados from './TabelaDados/TabelaDados'
import ListaDeOpções from './ListaDeOpções/ListaDeOpções'
import './App.css'

function App() {

  return(
    <div id='paginaCompleta'>
      <ListaDeOpções/>

      <div id="pagina">
        <TabelaDados/>
      </div>

    </div>
  )
}

export default App
