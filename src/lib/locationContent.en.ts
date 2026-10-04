import { hashIndex, type ContentInput } from "@/lib/locationContent";

/**
 * English counterpart of the phase 2/3 content generator. Same deterministic
 * rotation (seeded by slug) as the Spanish one, with copy written for
 * English-speaking couples — often planning a destination wedding — who
 * don't know the region, so it explains distances and context from Bogotá.
 * `fact` here is the English fragment from TOWN_FACTS_EN.
 */

const INTRO_NO_FACT = [
  (i: ContentInput) =>
    `${i.distanceKm} km from Bogotá, ${i.name} is one of the towns of the ${i.province} province in Cundinamarca — less photographed than the Sabana, but with the same kind of countryside setting for a wedding at a finca (country estate).`,
  (i: ContentInput) =>
    `${i.name}, in the ${i.province} province, is about ${i.distanceKm} km from Bogotá. As across the rest of Cundinamarca, weddings here usually make the most of the rural setting and the chance of an outdoor ceremony.`,
  (i: ContentInput) =>
    `Located ${i.distanceKm} km from Bogotá, in the ${i.province} province, ${i.name} offers the kind of countryside setting many couples look for: open space, nature and a reasonable drive from the city.`,
  (i: ContentInput) =>
    `In the ${i.province} province, ${i.distanceKm} km from Bogotá, ${i.name} is one of the 116 towns of Cundinamarca where I photograph weddings with the same care as at any estate in the Sabana.`,
  (i: ContentInput) =>
    `${i.name} belongs to the ${i.province} province and sits about ${i.distanceKm} km from Bogotá. If your wedding is at an estate in this area, the photographic approach starts from the same place as anywhere in Cundinamarca: making the most of natural light and the landscape.`,
  (i: ContentInput) =>
    `${i.distanceKm} km from the capital, in the ${i.province} province, ${i.name} is a Cundinamarca town where the countryside sets the tone: estates, pastures and open skies — the setting many couples want for a wedding outside the city.`,
];

const INTRO_WITH_FACT = [
  (i: ContentInput) =>
    `${i.distanceKm} km from Bogotá, in the ${i.province} province, ${i.name} is known for ${i.fact}. Beyond that, it has the rural setting typical of this part of Colombia for a countryside wedding.`,
  (i: ContentInput) =>
    `${i.name}, in the ${i.province} province (about ${i.distanceKm} km from Bogotá), is known for ${i.fact} — a detail that also says something about the character of the place where you could celebrate your wedding.`,
  (i: ContentInput) =>
    `About ${i.distanceKm} km from Bogotá, ${i.name} — in the ${i.province} province — is known for ${i.fact}, along with the countryside setting typical of the region.`,
  (i: ContentInput) =>
    `In the ${i.province} province, ${i.name} lies ${i.distanceKm} km from Bogotá and is known for ${i.fact}. A good starting point if you're considering this area for your wedding.`,
  (i: ContentInput) =>
    `${i.name} is known for ${i.fact}. It's in the ${i.province} province, ${i.distanceKm} km from Bogotá, and shares the estate-and-open-countryside setting that makes the region popular for weddings.`,
  (i: ContentInput) =>
    `${i.distanceKm} km from Bogotá, ${i.name} — ${i.province} province — has something that sets it apart: it's known for ${i.fact}. Useful context if you're thinking of a countryside wedding here.`,
];

const BODY_LOGISTICS = [
  (i: ContentInput) =>
    `The drive from Bogotá to ${i.name} usually takes between ${Math.round((i.distanceKm / 70) * 60 - 10)} and ${Math.round((i.distanceKm / 55) * 60 + 10)} minutes, depending on the road and traffic leaving the city. It's worth factoring in when planning the wedding-day timeline, especially for guests flying into Bogotá's El Dorado airport.`,
  (i: ContentInput) =>
    `For a wedding in ${i.name}, it pays to plan travel times from Bogotá (about ${i.distanceKm} km) carefully — for the photo and video team and for guests — especially if the ceremony and reception are at the same venue and you want to make the most of the afternoon light.`,
  (i: ContentInput) =>
    `As with any wedding outside Bogotá, the distance to ${i.name} (${i.distanceKm} km) is a practical detail more than an aesthetic one: it decides how much time there is for portraits before nightfall and how much margin to leave for guests' travel.`,
];

const BODY_PHOTO_APPROACH = [
  () =>
    `Photographically, an estate wedding in this region offers the same essentials anywhere: natural light, green spaces for the ceremony and gardens or groves for couple portraits. What changes from one area to another is the backdrop — flatter on the Sabana, more mountainous to the east, warmer toward the Magdalena valley — and that contrast is exactly what makes photographing weddings across Colombia's countryside so interesting.`,
  () =>
    `My approach doesn't change from town to town: make the most of the afternoon light, get to know the corners of the chosen estate or venue beforehand, and move calmly between the ceremony, the couple portraits and the reception without missing any important moment of the day.`,
  () =>
    `Working at an estate I haven't visited before doesn't change the result: arriving early, checking the available light at different spots and planning the day's flow with the couple are steps I follow the same way wherever the wedding is.`,
  () =>
    `Every estate has its own light and its own rhythm. Part of photographing weddings across the region is exactly that: adapting to the place each couple chose, without depending on already knowing it, and making the most of what that particular setting offers.`,
];

export function buildLocationContentEn(input: ContentInput): { intro: string; body: string[] } {
  const introBank = input.fact ? INTRO_WITH_FACT : INTRO_NO_FACT;
  const intro = introBank[hashIndex(input.slug, introBank.length)](input);
  const bodyLogistics = BODY_LOGISTICS[hashIndex(input.slug + "-l", BODY_LOGISTICS.length)](input);
  const bodyPhoto = BODY_PHOTO_APPROACH[hashIndex(input.slug + "-p", BODY_PHOTO_APPROACH.length)]();
  return { intro, body: [bodyLogistics, bodyPhoto] };
}
