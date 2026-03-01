import ContactChannels from "../components/contact/ContactChannels";
import ContactForm from "../components/contact/ContactForm";
import ContactHero from "../components/contact/ContactHero";
import FAQ from "../components/contact/FAQ";

export default function Contact() {
  return (
    <>
        <ContactHero />
        <ContactChannels />
        <ContactForm />
        <FAQ />
    </>
  )
}
