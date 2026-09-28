import { sections } from '../data/sections.js'

export function findSection(slug) {
  return sections.find((section) => section.slug === slug) ?? null
}

export function findItem(sectionSlug, itemSlug) {
  const section = findSection(sectionSlug)
  if (!section) return null
  const item = section.items.find((entry) => entry.slug === itemSlug)
  if (!item) return null
  return { section, item }
}

export function sectionPath(section) {
  return `/${section.slug}`
}

export function itemPath(section, item) {
  return `/${section.slug}/${item.slug}`
}

export function buildCrumbs(sectionSlug, itemSlug) {
  const crumbs = [{ label: 'Inicio', to: '/' }]
  const section = findSection(sectionSlug)
  if (!section) return crumbs

  crumbs.push({ label: section.title, to: sectionPath(section) })
  if (itemSlug) {
    const { item } = findItem(sectionSlug, itemSlug) ?? {}
    if (item) crumbs.push({ label: item.title, to: itemPath(section, item) })
  }
  return crumbs
}
