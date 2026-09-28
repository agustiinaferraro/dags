import { Link } from 'react-router-dom'
import { itemPath, sectionPath } from '../lib/catalog.js'

export function SectionCard({ section }) {
  return (
    <li className="card">
      <h3>
        <Link to={sectionPath(section)}>{section.title}</Link>
      </h3>
      {section.summary ? <p>{section.summary}</p> : <p className="pending">Resumen pendiente</p>}
      <p className="muted">{section.items.length} servicios</p>
    </li>
  )
}

export function ItemCard({ section, item }) {
  return (
    <li className="card">
      <h3>
        <Link to={itemPath(section, item)}>{item.title}</Link>
      </h3>
      {item.summary ? <p>{item.summary}</p> : <p className="pending">Resumen pendiente</p>}
    </li>
  )
}
