/** Convierte un nombre de municipio a slug de URL (sin tildes, en minúsculas). */
export function slugify(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // quita tildes (marcas diacríticas tras NFD)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
