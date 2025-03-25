import { BookOpen, FlaskConical, BrainCircuit, Feather, Book } from "lucide-react";

const categoryOptions = [
  { value: "", label: "All", icon: <Book size={24} /> },
  { value: "Fiction", label: "Fiction", icon: <BookOpen size={24} /> },
  { value: "Science", label: "Science", icon: <FlaskConical size={24} /> },
  { value: "SelfDevelopment", label: "Self Dev", icon: <BrainCircuit size={24} /> },
  { value: "Poetry", label: "Poetry", icon: <Feather size={24} /> },
  { value: "Religious", label: "Religious", icon: <Book size={24} /> },
];

export default categoryOptions;
