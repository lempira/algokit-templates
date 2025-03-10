interface Props {
  sections: any[];
  activeSection: string;
  handleSectionClick: (sectionId: string) => void;
}
export default function Nav({ sections, activeSection, handleSectionClick }: Props) {
  return (
    <nav className="w-full md:w-64 bg-white p-6 shadow-md">
      <ul>
        {sections.map((section) => (
          <li key={section.id} className="mb-2">
            <button
              onClick={() => handleSectionClick(section.id)}
              className={`w-full text-left p-2 rounded ${
                activeSection === section.id ? "bg-blue-100 text-blue-700 font-medium" : "hover:bg-gray-100"
              }`}
            >
              {section.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
