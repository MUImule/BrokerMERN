// // LanguageSwitcher.js
 import React from 'react';
 import { useTranslation } from 'react-i18next';

 const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

 const changeLanguage = (lng) => {
     if (i18n.language !== lng) {
      i18n.changeLanguage(lng)
        .then(() => {
          // Reload the page to apply the new language
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error changing language:', error);
        });
    }
  };

   return (
    <div>
      {/* <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('am')}>አማርኛ</button> */}
    </div>
  );
};

 export default LanguageSwitcher;
