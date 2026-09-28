import { site } from '../data/sections.js'

function formatPhone(value) {
  return value.replace(/[^\d+]/g, '')
}

export default function ContactCta() {
  const { phone, whatsapp, email } = site.contact
  const hasAny = Boolean(phone || whatsapp || email)

  return (
    <section className="cta" aria-label="Contacto">
      <h2>Consultanos</h2>
      {hasAny ? (
        <ul>
          {phone && (
            <li>
              <a href={`tel:${formatPhone(phone)}`}>{phone}</a>
            </li>
          )}
          {whatsapp && (
            <li>
              <a href={`https://wa.me/${formatPhone(whatsapp)}`} target="_blank" rel="noreferrer">
                WhatsApp: {whatsapp}
              </a>
            </li>
          )}
          {email && (
            <li>
              <a href={`mailto:${email}`}>{email}</a>
            </li>
          )}
        </ul>
      ) : (
        <p className="pending">Datos de contacto pendientes</p>
      )}
    </section>
  )
}
