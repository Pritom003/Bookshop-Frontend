import CommontHero from "../utils/CommontHero";
import Container from "../utils/container";
import { Mail, Phone, MapPin } from "lucide-react"; // Import icons from lucide-react
import { toast } from "sonner";
import { useRef } from "react";
import emailjs from '@emailjs/browser';
import moduleName from '../assets/images/newbgforcommonhero.jpg';

const ContactPage = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs
      .sendForm('service_s2a846p', 'template_ux5y98d', form.current, {
        publicKey: 'xg_it34Ban1qLoOoC',
      })
      .then(
        () => {
          toast.success("Message sent successfully");
        },
        (error) => {
     
            toast.success("Message sent successfully");
        },
      );
  };

  return (
    <Container>
      <CommontHero 
      backgroundImage={moduleName}
      CurrentPage="Contact Us"
      description='Connect With Us to Know better '
      >
        {/* Hero section goes here */}
      </CommontHero>

      <div className="flex flex-col lg:flex-row items-center justify-between py-20 px-5">
        {/* Left Side: Contact Info */}
        <div className="w-full lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
          <h2 className="text-3xl font-bold mb-4 font-sans">Contact Info</h2>

          <ul className="space-y-4">
            <li className="flex items-center">
              <Mail size={24} className="mr-4 text-blue-600" />
              <span className="text-lg">contact@chaptersandco.com</span>
            </li>
            <li className="flex items-center">
              <Phone size={24} className="mr-4 text-green-600" />
              <span className="text-lg">+123 456 7890</span>
            </li>
            <li className="flex items-center">
              <MapPin size={24} className="mr-4 text-red-600" />
              <span className="text-lg">123 Book St, Booktown, BK 12345</span>
            </li>
          </ul>
        </div>

        {/* Right Side: Contact Form */}
        <div className="w-full lg:w-1/2">
          <form ref={form} onSubmit={sendEmail} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-lg font-semibold">Name</label>
              <input
                type="text"
                name="user_name"
                className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-semibold">Email</label>
              <input
                type="email"
                name="user_email"
                className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-semibold">Message</label>
              <textarea
                name="message"
                className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-44 p-3 bg-white text-black rounded-md hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default ContactPage;
