export const siteData = {
  name: "Chifi's Barbershop",
  tagline: "Fresh cuts. Clean lines. Modern barbering.",
  phoneDisplay: "(612) 735-8435",
  phoneTel: "+16127358435",
  email: "calvarado624@gmail.com",
  owner: "Carlos Alvarado",
  addressLine1: "3055 NE Columbia Ave",
  addressLine2: "Minneapolis, MN 55418",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=3055%20NE%20Columbia%20Ave%2C%20Minneapolis%2C%20MN%2055418",
  hero: {
    eyebrow: "BARBER SHOP",
    headlineTop: "Chifi’s",
    headlineBottom: "Barbershop",
    subhead:
      "Sharp fades, clean line-ups, and beard work done right. Call to book fast or walk in when available.",
  },
  shopHighlights: [
    { title: "Appointments Available", desc: "Call to schedule quickly." },
    { title: "Walk-Ins Welcome", desc: "When spots are open." },
    { title: "Clean Detailing", desc: "Crisp edges & clean blends." },
    { title: "Beard & Line Ups", desc: "Precision finish, every time." },
  ],
  hours: [
    { label: "Mon–Sat", value: "9:00am – 6:00pm" },
    { label: "Sun", value: "10:00am – 5:00pm" },
  ],
  services: [
    {
      title: "Haircuts",
      desc: "Classic cuts to modern fades, tailored to your face and style.",
    },
    { title: "Beard", desc: "Beard trims, shaping, and clean-ups." },
    { title: "Line Ups", desc: "Crisp edges with precision detailing." },
    { title: "Kids", desc: "Clean, comfortable cuts for kids." },
  ],
  serviceMenu: [
    { name: "Haircut", note: "Call for pricing" },
    { name: "Beard Trim", note: "Call for pricing" },
    { name: "Line Up", note: "Call for pricing" },
    { name: "Kids Haircut", note: "Call for pricing" },
  ],
  gallery: [
    { src: "/gallery/IMG_4979.jpg", alt: "Haircut example 1" },
    { src: "/gallery/IMG_4980.jpg", alt: "Haircut example 2" },
    { src: "/gallery/IMG_4981.jpg", alt: "Haircut example 3" },
    { src: "/gallery/IMG_4982.jpg", alt: "Haircut example 4" },
    { src: "/gallery/IMG_4983.jpg", alt: "Haircut example 5" },
    { src: "/gallery/IMG_4986.jpg", alt: "Haircut example 6" },
  ],
} as const


