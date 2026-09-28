import { Link } from 'react-router-dom'

export default function Breadcrumbs({ crumbs }) {
  return (
    <nav className="breadcrumbs" aria-label="Ruta de navegación">
      <ol>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1
          return (
            <li key={crumb.to}>
              {isLast ? <span aria-current="page">{crumb.label}</span> : <Link to={crumb.to}>{crumb.label}</Link>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
