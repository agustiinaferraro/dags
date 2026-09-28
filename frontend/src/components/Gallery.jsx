const PLACEHOLDER_SLOTS = 3

export default function Gallery({ images, title }) {
  const slots = images.length > 0 ? images : Array.from({ length: PLACEHOLDER_SLOTS }, (_, i) => null)

  return (
    <section aria-label={`Galería de ${title}`}>
      <h2>Galería</h2>
      <ul className="gallery">
        {slots.map((image, index) => (
          <li key={image ?? `placeholder-${index}`}>
            {image ? (
              <img src={image} alt={`${title} — imagen ${index + 1}`} loading="lazy" />
            ) : (
              <span className="pending">
                {images.length > 0 ? 'Imagen pendiente' : `Foto ${index + 1}`}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
