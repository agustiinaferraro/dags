import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import ContactCta from '../components/ContactCta.jsx'
import Gallery from '../components/Gallery.jsx'
import Pending from '../components/Pending.jsx'
import NotFound from './NotFound.jsx'
import { buildCrumbs, findItem } from '../lib/catalog.js'

export default function ItemRoute() {
  const { section: sectionSlug, item: itemSlug } = useParams()
  const found = findItem(sectionSlug, itemSlug)

  useEffect(() => {
    if (found) document.title = `${found.item.title} | Página`
  }, [found])

  if (!found) return <NotFound />

  const { section, item } = found
  const paragraphs = item.body.filter(Boolean)
  const includes = item.includes.filter(Boolean)

  return (
    <article>
      <Breadcrumbs crumbs={buildCrumbs(sectionSlug, itemSlug)} />
      <header className="page-header">
        <h1>{item.title}</h1>
        {item.summary ? <p className="lede">{item.summary}</p> : <p className="pending">Resumen pendiente</p>}
      </header>

      <section aria-label="Descripción">
        {paragraphs.length > 0 ? (
          paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)
        ) : (
          <Pending label="Descripción pendiente" count={2} />
        )}
      </section>

      <section aria-label="Qué incluye">
        <h2>Qué incluye</h2>
        {includes.length > 0 ? (
          <ul>
            {includes.map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>
        ) : (
          <Pending label="Puntos a definir" count={3} />
        )}
      </section>

      <Gallery images={item.images} title={item.title} />
      <ContactCta />
    </article>
  )
}
