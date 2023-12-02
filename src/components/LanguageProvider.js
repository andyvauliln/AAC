import React, { useState, useContext, createContext } from 'react';
import ReactDOM from 'react-dom';

// Language data
const languages = {
  EN: { data: { company_title: "AI AUTOMATION AGENCY" }, currentLng: "EN" },
  IND: { data: { company_title: "AI AUTOMATI AGENCY" }, currentLng: "IND" },
  RU: { data: { company_title: "ИИ АГЕНСТВО" }, currentLng: "RU" },
};

// Create a Context for the language
const LanguageContext = createContext();

// Language Provider
const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(languages.EN);

  const switchLanguage = (value) => {
    const selectedLanguage = languages[value];
    console.log(selectedLanguage)
    setLanguage(selectedLanguage);
  };

  return (
    <LanguageContext.Provider value={{ ...language, setLanguage: switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

function LanguageSwitcher() {
  const { setLanguage, currentLng } = useContext(LanguageContext);

  const handleChange = (e) => {
    console.log('Event:', e); // Log the entire event for debugging
    if (e.target && e.target.value) {
      console.log('Switching language to:', e.target.value); // Log the value being set
      setLanguage(e.target.value);
    }
  };

  return (
    <div>
      <input type="radio" id="radio1-1" name="radio" value="EN" checked={currentLng === "EN"} onChange={handleChange} />
      <label htmlFor="radio1-1">EN</label>
      <input type="radio" id="radio1-2" name="radio" value="IND" checked={currentLng === "IND"} onChange={handleChange} />
      <label htmlFor="radio1-2">IND</label>
      <input type="radio" id="radio1-3" name="radio" value="RU" checked={currentLng === "RU"} onChange={handleChange} />
      <label htmlFor="radio1-3">RU</label>
    </div>
  );
}


export { LanguageContext, LanguageProvider, LanguageSwitcher }