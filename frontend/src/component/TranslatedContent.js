// TranslatedContent.js
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const TranslatedContent = ({ translationKey }) => {
  const { t } = useTranslation();
  const [content, setContent] = useState('');

  // useEffect(() => {
  //   const fetchTranslation = () => {
  //     try {
  //       const translatedContent = t(translationKey);
  //       setContent(translatedContent);
  //     } catch (error) {
  //       console.error('Error fetching translation:', error);
  //       setContent(`Error: ${error.message}`);
  //     }
  //   };

   // fetchTranslation();
 // }, [translationKey, t]);

  return <div>{content}</div>;
};

export default TranslatedContent;
