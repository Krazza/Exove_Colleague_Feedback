import React from 'react';
import { useTranslation } from "react-i18next";

function LanguageSelector() {
  const { i18n } = useTranslation();

  function handleChange(event: { target: { value: any; }; }) {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
  }
  
  return (
    <select onChange={handleChange}>
      <option value="en">English</option>
      <option value="fi">Suomi</option>
    </select>
  );
}

export default LanguageSelector;

