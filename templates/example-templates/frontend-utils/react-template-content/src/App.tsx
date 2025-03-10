import { useState } from "react";
import IntroductionSection from "./sections/IntroductionSection";
import TransactionSection from "./sections/TransactionSection";
import AssetSection from "./sections/AssetSection";
import TestingSection from "./sections/TestingSection";
import AlgoKitAccountDemo from "./sections/AlgoKitAccountDemo";
import Nav from "./components/Nav";
import Header from "./components/Header";

export default function App() {
  const [activeSection, setActiveSection] = useState("introduction");
  const sections = [
    { id: "introduction", title: "Introduction to AlgoKit Utils" },
    { id: "account", title: "Account Management" },
    { id: "transaction", title: "Transaction Operations" },
    { id: "asset", title: "Asset Operations" },
    { id: "testing", title: "Testing Utilities" },
  ];

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar Navigation */}
        <Nav sections={sections} activeSection={activeSection} handleSectionClick={handleSectionClick} />
        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeSection === "introduction" && <IntroductionSection />}
          {activeSection === "account" && <AlgoKitAccountDemo />}
          {activeSection === "transaction" && <TransactionSection />}
          {activeSection === "asset" && <AssetSection />}
          {activeSection === "testing" && <TestingSection />}
        </main>
      </div>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>AlgoKit Utils Documentation - Built with React</p>
      </footer>
    </div>
  );
}
