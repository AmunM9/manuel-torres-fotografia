/**
 * English copy for phase-1 location pages (Bogotá + Sabana de Bogotá) and the
 * region hubs. Keyed by slug; mirrors src/data/locations.ts one-to-one.
 */
export interface LocationCopyEn {
  facts: string[];
  intro: string;
  body: string[];
}

export interface RegionCopyEn {
  name: string;
  shortName: string;
  description: string;
}

export const SABANA_COPY_EN: Record<string, LocationCopyEn> = {
  bogota: {
    facts: [
      "Colombia's capital, home to nearly 8 million people and the widest range of wedding venues, hotels and haciendas in the country.",
      "Monserrate, the mountain with its hilltop sanctuary and panoramic view over the city, is one of the most recognizable backdrops for wedding photos in Bogotá.",
    ],
    intro:
      "Bogotá is where I live and spend most of my working time. Here I photograph weddings in event venues, hotels and the country haciendas that exist within the city itself, and it's also my base for country-estate weddings across the Sabana and the rest of Cundinamarca.",
    body: [
      "Bogotá, D.C. isn't a municipality of Cundinamarca but its own Capital District: a city of almost 8 million people with the largest and most varied selection of event venues, hotels and clubs in Colombia. The city also has its own countryside, in districts such as Suba, Usme and Ciudad Bolívar, with wedding haciendas like Haciendas Trinity Club (on the road to La Calera, with a panoramic view over the city), Hacienda Común y Silvestre and Hacienda Chic.",
      "For couples marrying in a church or wanting photos with historic architecture, downtown Bogotá (La Candelaria) preserves colonial streets and churches, while Monserrate offers a panoramic view of the city that often features in the couple's portrait session. The city also has more modern neighborhoods, such as Chicó, Usaquén and the north of the city, which give an urban, contemporary backdrop quite different from the country estates of the Sabana.",
      "Photographing a wedding in Bogotá means moving between very different styles in a single day: hotel or venue interiors, colonial or modern architecture, and sometimes nature without leaving the city. Bogotá is also my base of operations for every country-estate wedding in the Sabana de Bogotá and the rest of Cundinamarca. I usually start the day here before heading out to the venue.",
    ],
  },
  chia: {
    facts: [
      "Popularly known as the 'City of the Moon' because of its Indigenous Muisca heritage.",
      "One of the municipalities with the highest concentration of country estates, colonial haciendas and country clubs in the Sabana.",
    ],
    intro:
      "Along with Cajicá, Chía is the most sought-after destination in the Sabana (the high plateau around Bogotá) for a finca (country estate) wedding: less than half an hour from Bogotá via the Autopista Norte, it combines colonial haciendas, wetlands and green surroundings that rarely disappoint on camera.",
    body: [
      "Chía lies about 25 km north of Bogotá, a 30 to 45 minute drive depending on traffic on the Autopista Norte. It's the Sabana Centro municipality with the longest history as a wedding destination: century-old haciendas, country clubs and event venues sit side by side, surrounded by hills and pastures, all a short trip from the capital for guests coming from Bogotá.",
      "Photographing a wedding in Chía usually means the open light of the Sabana (wide skies, hills in the background, afternoons with that golden light so typical of the high plateau) and colonial or rustic architecture with plenty of visual possibilities: stone gateways, corridors with wooden beams, and large gardens for an outdoor ceremony.",
      "If your wedding is in Chía, or at any country estate in Sabana Centro, working with a photographer who already knows the area saves time on the day: knowing where the best light falls at each hour, which corners of the estate work for the couple's portraits, and how to move between reception hall, garden and chapel without missing a moment.",
    ],
  },
  cajica: {
    facts: [
      "Known for its dairy farming and its country retreats, many of which have been turned into event venues.",
      "The town center preserves a main square and colonial church typical of Sabana Centro.",
    ],
    intro:
      "Cajicá shares with Chía the unofficial title of country-wedding capital of the Sabana: between them, the two towns are home to some of the most in-demand haciendas and countryside event venues in Cundinamarca.",
    body: [
      "About 35 km from Bogotá (45 to 60 minutes via the Autopista Norte), Cajicá is a land of dairy farms turned event venues, with wide green grounds, groves of trees and views of the Sabana's eastern hills. Weddings here often combine an outdoor ceremony with a reception under a tent or in a covered country hall, making the most of the area's cool climate.",
      "For photos, Cajicá offers something many Sabana estates share: space. Wide meadows for sunset couple portraits, groves for more intimate sessions and, almost always, some architectural detail (a gateway, a private chapel, a colonial corridor) to serve as a backdrop.",
      "Knowing your chosen estate or venue in Cajicá ahead of time lets me plan the photographic flow of the day: where to set the ceremony based on the sun's position, which part of the estate to use for the couple's portraits, and how to pace getting ready, the ceremony and the party so nothing feels rushed.",
    ],
  },
  cota: {
    facts: [
      "One of the closest municipalities to Bogotá on the west side, with a strong food and events scene.",
      "Its town center and nearby hills (such as Cerro de La Moya) are a common landmark for outdoor activities.",
    ],
    intro:
      "Cota is one of the Sabana towns closest to Bogotá, which makes it popular both for the wedding itself and for guests who'd rather stay near the city.",
    body: [
      "About 20 km from Bogotá via Avenida Boyacá or Calle 80, Cota is a short drive (30 to 40 minutes), making it a practical choice for weddings with many guests coming from the capital. The town combines a small urban center, country retreats and a food scene known throughout the Sabana.",
      "Cota's country estates tend to have well-kept gardens, swimming pools and covered areas for the reception, plus views of the hills surrounding the town. It's a versatile setting to photograph: it works for an intimate ceremony as well as a large reception with a full banquet.",
      "As with any Sabana estate, the key to great photos is making the most of the natural sunset light and the green spaces before night falls. Knowing the area helps me anticipate those moments and move calmly through the day.",
    ],
  },
  tabio: {
    facts: [
      "Known for its hot springs and a quieter, more rural feel within Sabana Centro.",
      "It borders Tenjo and Cajicá, in an area of country estates and cool mountain climate.",
    ],
    intro:
      "Tabio keeps a more rural, peaceful feel than its Sabana Centro neighbors, with country estates surrounded by mountains that give a wedding a different frame: more intimate, less urban.",
    body: [
      "Located about 35 km from Bogotá (around an hour by car), Tabio is best known for its hot springs, but also for its cool-climate country estates surrounded by farmland and mountains. It's an alternative for couples looking for a more secluded, quieter wedding setting than the towns closest to the capital.",
      "Tabio's landscape, mountainous, with frequent morning mist and soft light for much of the day, produces photos with a different character from the flat Sabana: more atmospheric, with layers of mountains in the background and the feeling of truly being in the countryside.",
      "If your wedding is at an estate in Tabio, it's worth planning the photo session around the mountain weather, which can change quickly during the day. A photographer familiar with those conditions knows how to adapt without missing the key moments.",
    ],
  },
  tenjo: {
    facts: [
      "A farming and flower-growing municipality with an open Sabana landscape.",
      "It borders Tabio, Cota and Chía, in the heart of Sabana Centro.",
    ],
    intro:
      "Tenjo combines the open landscape of the Sabana with the calm of a less developed town, a contrast that shows in wedding photos taken at its country estates.",
    body: [
      "About 30 km from Bogotá (45 to 60 minutes by car), Tenjo is a farming and flower-growing municipality that still has large stretches of open Sabana. Its estates usually have spacious grounds, ideal for outdoor ceremonies and for making the most of the area's typical sunset light.",
      "Tenjo's landscape (pastures, flower farms nearby, gentle hills in the background) offers a natural, largely untouched setting for photos, different from more 'postcard' estates with heavily designed gardens. It's a good choice for couples who want a more rustic, less formal atmosphere.",
      "As in the rest of Sabana Centro, afternoon light is the best photographic ally in Tenjo: planning the ceremony and the couple's portraits around those hours makes a real difference in the final result.",
    ],
  },
  sopo: {
    facts: [
      "Home to one of Colombia's leading dairy companies and to well-known country restaurants.",
      "Close to the Tominé reservoir, one of the largest bodies of water in the Sabana.",
    ],
    intro:
      "Sopó is synonymous with country retreats and country restaurants known throughout the Sabana, and it's close to the Tominé reservoir, an extra natural draw for photos with water in the frame.",
    body: [
      "About 35 km from Bogotá (45 minutes to an hour), Sopó combines the region's dairy and food traditions with exceptional natural surroundings: near the Tominé reservoir and ringed by the mountains of Sabana Centro. It's a common choice for weddings and country events of every size.",
      "Many estates in Sopó have extensive gardens, mature groves and, in some cases, views of the reservoir, which expands the photographic possibilities beyond the traditional Sabana garden: water, mountains and countryside in one place.",
      "Knowing Sopó's estates in advance helps plan the flow of the day (where to hold the ceremony, where to do the couple's portraits with the water or mountains) and anticipate the weather, which in this area can be more changeable than in the rest of the Sabana.",
    ],
  },
  zipaquira: {
    facts: [
      "Home to the Salt Cathedral, one of the most visited monuments in Colombia.",
      "Capital of the Sabana Centro province and the commercial hub for neighboring towns.",
    ],
    intro:
      "Zipaquirá is the capital of Sabana Centro and one of the few towns in the region with a nationally recognized architectural icon, the Salt Cathedral, as well as a well-preserved colonial historic center.",
    body: [
      "About 48 km from Bogotá (roughly an hour via the Autopista Norte), Zipaquirá is larger and more urban than its Sabana Centro neighbors, with a historic center of colonial streets, a main square and a church that make a backdrop full of architectural character for wedding photos.",
      "Beyond the surrounding estates, Zipaquirá offers something different: the chance to shoot in the colonial town center, with façades, balconies and cobblestone streets that give a look unlike the typical estate garden. For couples marrying in church, the historic center is often a natural part of the photo route.",
      "Working with a photographer who knows Zipaquirá helps combine both worlds, the historic center and the estate, within the time available on the wedding day, without the drive between them eating into the party.",
    ],
  },
  cogua: {
    facts: [
      "Zipaquirá's immediate neighbor, with a more pronounced páramo and mountain landscape than the rest of Sabana Centro.",
      "Close to Chicaque Natural Park and to high-altitude wetland areas.",
    ],
    intro:
      "Cogua has a more mountainous, cooler landscape than the rest of Sabana Centro. It's close to Zipaquirá, but its natural setting feels different on camera: deeper greens, more mist, more 'páramo' (high Andean moorland).",
    body: [
      "About 55 km from Bogotá (just over an hour), Cogua is a small town right next to Zipaquirá, with a colder climate and a mountain landscape you can see in the light (more diffused, more bluish gray in the mornings) and in the greenery, darker than that of the flat Sabana.",
      "Cogua's estates tend to make the most of that mountain setting: farmland, sloping pastures and wide views toward the neighboring hills. It's a less conventional option for couples looking for something different from the classic Sabana garden.",
      "Cogua's weather can be more unpredictable than in lower-lying towns, so planning the photo session with some buffer and knowing the estate's best spots in advance helps make the most of the light when it appears.",
    ],
  },
  nemocon: {
    facts: [
      "Known for its own salt mine and its colonial town center, less crowded than Zipaquirá's.",
      "One of the northernmost municipalities in Sabana Centro.",
    ],
    intro:
      "Nemocón shares Zipaquirá's salt-mining tradition but with a smaller, quieter historic center, a different option for couples who want wedding photos with colonial charm without the bustle of a bigger town.",
    body: [
      "About 55 km from Bogotá (a little over an hour), Nemocón is one of the northernmost towns in Sabana Centro. Its colonial center (square, church, narrow streets) is more compact than Zipaquirá's, giving a more intimate atmosphere for photos in the heart of town.",
      "Nemocón's rural surroundings, with country estates and high Sabana landscape, work well for countryside ceremonies, while the town center adds the option of photos with colonial façades and cobblestone streets.",
      "For weddings in Nemocón, it pays to plan the route between the estate and the town carefully if you want to use both settings, and to keep in mind the high-Sabana climate, similar to that of Cogua and Zipaquirá.",
    ],
  },
  gachancipa: {
    facts: [
      "A small Sabana Centro municipality that you pass through on the Autopista Norte toward Tocancipá and Zipaquirá.",
      "An area of industrial growth, with country retreats in its rural surroundings.",
    ],
    intro:
      "Gachancipá is one of the smallest towns in Sabana Centro, with country retreats that benefit from being close to the Autopista Norte without losing the rural feel of the rest of the region.",
    body: [
      "About 45 km from Bogotá (around an hour), Gachancipá sits between Tocancipá and Zipaquirá, with a rural area of estates and pastures typical of Sabana Centro, though with fewer event venues than its better-known neighbors.",
      "Gachancipá's landscape (open Sabana, gentle hills, wide skies) offers the same photographic possibilities as the rest of the region: sunset light, green spaces for the ceremony and gardens for the couple's portraits.",
      "If your wedding is at an estate in Gachancipá, a photographer who knows Sabana Centro in general knows what to expect from the area's weather and light, even without having shot at that specific property before.",
    ],
  },
  tocancipa: {
    facts: [
      "Home to Parque Jaime Duque and the Tocancipá racetrack, two of the town's best-known landmarks.",
      "An area of fast industrial and residential growth within Sabana Centro.",
    ],
    intro:
      "Tocancipá combines an industrial zone with country retreats and some of the best-known attractions in the Sabana, such as Parque Jaime Duque, although weddings here are usually held at its rural estates.",
    body: [
      "About 35 km from Bogotá (roughly 45 minutes), Tocancipá has grown quickly in recent years, but it still has a rural area with country retreats where weddings and events take place, generally with the same open Sabana landscape found throughout Sabana Centro.",
      "Tocancipá's countryside works just as well as Chía's or Cajicá's for outdoor ceremonies and sunset couple sessions, with the advantage of sitting right on the Autopista Norte and being easy for guests to reach.",
      "Knowing the area helps plan the day calmly, especially if your estate is near main roads that get heavier traffic at certain hours.",
    ],
  },
  mosquera: {
    facts: [
      "One of the closest municipalities to Bogotá on the west side, on the road to Girardot and Facatativá.",
      "The unofficial capital of the Sabana Occidente province in terms of urban growth.",
    ],
    intro:
      "Mosquera is the Sabana Occidente town closest to Bogotá, which simplifies logistics for weddings with guests coming from different parts of the capital.",
    body: [
      "About 20 km from Bogotá (30 to 40 minutes via Calle 13 or Avenida Ciudad de Cali), Mosquera has grown a lot in recent years, but its rural area still has estates and event venues that host weddings of every size.",
      "The Sabana Occidente landscape is similar to Sabana Centro's (pastures, gentle hills, open Sabana light), though with fewer 'postcard' estates than Chía or Cajicá. Even so, there are solid options for outdoor ceremonies and countryside receptions.",
      "Mosquera's proximity to Bogotá is a practical advantage: less travel time for the photo team and for guests, leaving more room to make the most of daylight during the photo session.",
    ],
  },
  madrid: {
    facts: [
      "Traditionally known for its export flower farms.",
      "One of the most populous municipalities in the Sabana Occidente province.",
    ],
    intro:
      "Madrid is known for its extensive flower farms, a landscape unique to Sabana Occidente that sometimes becomes a backdrop for wedding photos in the area.",
    body: [
      "About 30 km from Bogotá (roughly 40 minutes), Madrid combines a growing urban area with a countryside marked by export flower greenhouses, as well as more traditional estates and event venues.",
      "Madrid's surroundings offer the typical Sabana landscape (pastures, hills in the background, wide skies) with the occasional addition of flower farms as a distinctive visual reference for the area.",
      "As in the rest of Sabana Occidente, the photographic key is making the most of sunset light and each estate's open spaces, something a photographer familiar with the region knows how to plan in advance.",
    ],
  },
  funza: {
    facts: [
      "One of the closest municipalities to Bogotá, almost adjoining the city's west side.",
      "Close to El Dorado airport, making it easy for out-of-town guests to arrive.",
    ],
    intro:
      "Funza is one of the closest towns to Bogotá on the west side, practically adjoining the city and near El Dorado airport, an advantage for weddings with guests traveling from other cities.",
    body: [
      "Less than 20 km from Bogotá (25 to 35 minutes), Funza is such a short trip it hardly feels like leaving the city. Its rural area still has country retreats with the characteristic Sabana landscape: open pastures, gentle hills and wide light for much of the day.",
      "Being close to Bogotá and El Dorado airport makes Funza a practical choice for weddings with guests flying in, without giving up the countryside feel of a Sabana estate.",
      "The photographic approach in Funza is similar to the rest of Sabana Occidente: making the most of open spaces and sunset light for the couple's portraits, with minimal travel from Bogotá for the whole team.",
    ],
  },
  facatativa: {
    facts: [
      "Capital of the Sabana Occidente province and home to the Piedras del Tunjo Archaeological Park.",
      "A landmark on the Bogotá–Girardot road heading into western Cundinamarca.",
    ],
    intro:
      "Facatativá is the capital of Sabana Occidente and the largest town in the area, with the Piedras del Tunjo Archaeological Park as one of its best-known natural landmarks.",
    body: [
      "About 40 km from Bogotá (50 minutes to an hour via Calle 80 or the road to Girardot), Facatativá is larger and more urban than the rest of Sabana Occidente, with a rural area of country estates and natural surroundings that include rock formations and woodland in Piedras del Tunjo Park.",
      "For weddings in Facatativá, the landscape offers more variety than other Sabana towns: besides traditional estates, there are rocky and wooded settings that give different options for the couple's photo session.",
      "As the main town of Sabana Occidente, Facatativá is also often where out-of-town guests stay, something to keep in mind when planning the timing of the wedding day.",
    ],
  },
  "el-rosal": {
    facts: [
      "A small, rural Sabana Occidente municipality on the Bogotá–Facatativá road.",
      "It shares the open Sabana landscape with Subachoque and Facatativá.",
    ],
    intro:
      "El Rosal is one of the smallest and most rural towns in Sabana Occidente, with an open Sabana landscape well suited to intimate country-estate weddings.",
    body: [
      "About 35 km from Bogotá (45 to 55 minutes), El Rosal keeps a more rural character than its larger neighbors, with estates and open pastures typical of Sabana Occidente and close to Subachoque and Facatativá.",
      "El Rosal's landscape (flat Sabana, hills in the background, wide light) works well for outdoor ceremonies and couple sessions with the same approach as the rest of the region: making the most of sunset light and each estate's green spaces.",
      "Since it's a small town, weddings here tend to be more intimate, which also leaves more room to focus on details and personal moments during the photo coverage.",
    ],
  },
  subachoque: {
    facts: [
      "Known for its páramo landscape, cloud forests and traditional agricultural fairs.",
      "One of the greenest and least developed municipalities in Sabana Occidente.",
    ],
    intro:
      "Subachoque is one of the greenest and least developed towns in Sabana Occidente, with páramo (high Andean moorland) and cloud forest scenery that gives photos a different character from the flat Sabana.",
    body: [
      "About 45 km from Bogotá (roughly an hour), Subachoque keeps a rural setting shaped by mountain scenery, with frequent morning mist and denser vegetation than towns like Mosquera or Funza.",
      "Subachoque's estates usually have large gardens, groves of trees and in some cases views of woodland, giving photos more visual depth than a conventional flat Sabana garden.",
      "Subachoque's mountain weather can change quickly during the day, so it's worth planning the photo session with flexibility and seizing windows of good light as they come.",
    ],
  },
  zipacon: {
    facts: [
      "One of the smallest municipalities in Cundinamarca by population, with a strongly rural character.",
      "It borders Facatativá and is part of the Sabana Occidente province.",
    ],
    intro:
      "Zipacón is one of the smallest and quietest towns in Sabana Occidente, an option for country-estate weddings away from the bustle of the larger towns.",
    body: [
      "About 45 km from Bogotá (roughly an hour), Zipacón is a small, rural town next to Facatativá, with estates offering the same kind of countryside setting as the rest of Sabana Occidente but with less traffic and more peace and quiet.",
      "Zipacón's landscape (pastures, hills, high Sabana vegetation) offers the same kind of photographic opportunities as other towns in the area: outdoor ceremonies, sunset couple sessions and wide green spaces.",
      "Because it's a small town, the logistics of a wedding here are usually simpler to coordinate, which also makes the photography work easier on the day.",
    ],
  },
  bojaca: {
    facts: [
      "A small Sabana Occidente municipality on the road toward Zipacón and La Mesa.",
      "It preserves a small colonial town center.",
    ],
    intro:
      "Bojacá is one of the smallest towns in Sabana Occidente, with a modest colonial center and a rural area that combines Sabana and the first foothills toward western Cundinamarca.",
    body: [
      "About 35 km from Bogotá (45 to 55 minutes), Bojacá marks nearly the transition between Sabana Occidente and the milder western part of Cundinamarca (Tequendama), which shows in a slightly warmer climate than towns like Facatativá.",
      "Its estates offer the same kind of countryside setting as the rest of Sabana Occidente, with the possibility of finding somewhat less chilly areas toward the south of the municipality.",
      "As in the rest of the region, knowing the area helps anticipate the light and weather on the wedding day to get the most out of the photo session.",
    ],
  },
  soacha: {
    facts: [
      "Part of the Soacha province, officially separate from the Sabana Centro and Sabana Occidente provinces, although commercially grouped within the Bogotá metropolitan area.",
      "One of the most populous municipalities in Cundinamarca because it adjoins southern Bogotá.",
    ],
    intro:
      "Administratively, Soacha belongs to the Soacha province rather than Sabana Centro or Occidente, but because it's right next to Bogotá it's usually grouped with those towns for wedding services and logistics.",
    body: [
      "Less than 20 km from downtown Bogotá, Soacha practically adjoins the city to the south, making it easy for guests to arrive without long drives. Its rural area, to the south and west of the municipality, still has estates and country retreats with mountain scenery.",
      "Soacha's surroundings combine a dense urban area with rural sectors that offer the kind of green space needed for an outdoor ceremony, though with fewer well-known event venues than towns like Chía or Cajicá.",
      "For weddings at estates in Soacha, the photographic approach is the same as in the rest of the Sabana: making the most of afternoon light and the open spaces each property offers.",
    ],
  },
  sibate: {
    facts: [
      "Part of the Soacha province, close to the Muña reservoir.",
      "A transitional municipality between the Sabana and the highlands toward Fusagasugá and Sumapaz.",
    ],
    intro:
      "Sibaté is Soacha's neighbor and also part of its province, with the distinction of sitting beside the Muña reservoir, a body of water that adds a different option to the typical Sabana landscape.",
    body: [
      "About 25 km from Bogotá (35 to 45 minutes), Sibaté combines a small urban area with rural mountain surroundings and proximity to the Muña reservoir, giving it more scenic variety than other towns in the Soacha province.",
      "Sibaté's estates tend to make the most of that mountain-and-water setting, with views that step a little outside the conventional flat Sabana garden, appealing for couples who want photos with a different backdrop.",
      "Sibaté's weather can be cooler and more changeable than in lower-lying towns, so planning the photo session with some buffer helps make the most of the best light conditions.",
    ],
  },
};

export const REGION_COPY_EN: Record<string, RegionCopyEn> = {
  "sabana-de-bogota": {
    name: "Sabana de Bogotá",
    shortName: "Sabana de Bogotá",
    description:
      "Bogotá and the Sabana (Sabana Centro, Sabana Occidente and the Soacha province): the heart of the country estates, haciendas and countryside venues where I photograph the most weddings every year.",
  },
  cundinamarca: {
    name: "Cundinamarca",
    shortName: "Cundinamarca",
    description:
      "I cover weddings in all 116 municipalities of Cundinamarca, from the cold Ubaté highlands to the warm Magdalena valley. Find your town and see why it pays to hire a photographer who already knows the terrain.",
  },
  "destinos-campestres": {
    name: "Countryside destinations within 200 km of Bogotá",
    shortName: "Countryside destinations",
    description:
      "Villa de Leyva, Tunja, Ibagué, Villavicencio and other classic country-estate wedding destinations less than a day's drive from Bogotá.",
  },
};
