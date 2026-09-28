import { Link } from 'react-router-dom'
import { SectionCard } from '../components/Cards.jsx'
import { sections } from '../data/sections.js'

export default function NotFound() {
  return (
    <>
      <header className="page-header">
        <h1>Página no encontrada</h1>
        <p className="lede">La dirección que abriste no existe.</p>
      </header>
      <section aria-label="Secciones">
        <h2>Estas son las secciones</h2>
        <ul className="grid">
          {sections.map((section) => (
            <SectionCard key={section.slug} section={section} />
          ))}
        </ul>
      </section>
    </>
  )
}
