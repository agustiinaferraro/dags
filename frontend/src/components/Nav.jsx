import { NavLink } from 'react-router-dom'
import { sections } from '../data/sections.js'
import { sectionPath } from '../lib/catalog.js'

export default function Nav() {
  return (
    <header>
      <nav aria-label="Secciones">
        <ul>
          {sections.map((section) => (
            <li key={section.slug}>
              <NavLink to={sectionPath(section)}>{section.nav}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
