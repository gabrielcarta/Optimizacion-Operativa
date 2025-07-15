import { Link } from 'react-router-dom'
import './MenuRadial.css'

function MenuRadial() {
  return (
    <div className="radial-container">
      <div className="center-button">
        Modelos
        <div className="options">
          <Link to="/grafico" className="option" style={{ '--i': 0 }}>
            Gráfico
          </Link>
          <Link to="/transporte" className="option" style={{ '--i': 1 }}>
            Transporte
          </Link>
          <Link to="/asignacion" className="option" style={{ '--i': 2 }}>
            Asignación
          </Link>
          <Link to="/simplex" className="option" style={{ '--i': 3 }}>
            Simplex
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MenuRadial
