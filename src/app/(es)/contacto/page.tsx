import { ContactView, contactMetadata } from "@/views/contact";

export const metadata = contactMetadata("es");

export default function ContactPage() {
  return <ContactView locale="es" />;
}
