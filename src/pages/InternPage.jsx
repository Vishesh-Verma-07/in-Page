import React from 'react'
import HeroSection from "../components/HeroSection/HeroSection";
import ApplicationForm from "../components/ApplicationForm/ApplicationForm";
import FAQSection from "../components/FAQ/FAQSection";
import { useState } from 'react';

function InternPage() {
  const [selectedInternshipId, setSelectedInternshipId] = useState(null);
  
  
  return (
    <>
      <HeroSection />
      <ApplicationForm selectedInternshipId={selectedInternshipId} />
      <FAQSection />
    </>
  );
}

export default InternPage