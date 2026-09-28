import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { ItemCard } from '../components/Cards.jsx'
import NotFound from './NotFound.jsx'
import { buildCrumbs, findSection } from '../lib/catalog.js'

export default function SectionRoute() {
  const { section: slug } = useParams()
  const section = findSection(slug)

  useEffect(() => {
    if (section) document.title = `${section.title} | Página`
  }, [section])

  if (!section) return <NotFound />

  return (
    <>
      <Breadcrumbs crumbs={buildCrumbs(slug)} />
      <header className="page-header">
        <h1>{section.title}</h1>
        {section.summary ? <p className="lede">{section.summary}</p> : <p className="pending">Resumen pendiente</p>}
      </header>

      {section.pending ? (
        <p className="pending notice">Contenido en preparación</p>
      ) : (
        <section aria-label="Servicios">
          <ul className="grid">
            {section.items.map((item) => (
              <ItemCard key={item.slug} section={section} item={item} />
            ))}
          </ul>
        </section>
      )}
    </>
  )
}
