import { useEffect } from 'react'
import { SectionCard } from '../components/Cards.jsx'
import { sections, site } from '../data/sections.js'

export default function Home() {
  useEffect(() => {
    document.title = site.name
  }, [])

  return (
    <>
      <section className="hero">
        <h1>{site.name}</h1>
        <p>{site.tagline}</p>
      </section>
      <section aria-label="Secciones">
        <h2>Secciones</h2>
        <ul className="grid">
          {sections.map((section) => (
            <SectionCard key={section.slug} section={section} />
          ))}
        </ul>
      </section>
    </>
  )
}
