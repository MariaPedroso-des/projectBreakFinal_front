import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const FormChoicePage = () => {
  return(
    <>
      <Navbar />
      <section>
        <h1>¿Qué quieres publicar?</h1>
        <h3>Elige si quieres añadir una ruta o una zona de pernocta</h3>
      </section>
      <section>
        <div>
          <h4>Comparte una ruta de senderismo para hacer con perro</h4>
          <Link to="/hikings/new">Subir ruta</Link>
        </div>
        <div>
          <h4>Comparte una zona donde descansar con tu camper y tu perro</h4>
          <Link to="/overnights/new">Subir pernocta</Link>         
        </div>
      </section>
    </>
  )
}

export default FormChoicePage