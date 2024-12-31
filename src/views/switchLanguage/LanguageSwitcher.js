import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Box from '@mui/material/Box';
import LanguageIcon from '@mui/icons-material/Language';
import { t } from 'i18next';
const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    window.location.reload();
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '20px' }}>
      <Box>
        <FormControl sx={{ fontSize: '0.875rem' }}>
          <InputLabel sx={{ display: 'flex', alignItems: 'center', paddingTop: 1 }} id="language-select-label">
            {t('Language')}
          </InputLabel>
          <Select
            labelId="language-select-label"
            defaultValue={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
            label="Language"
          >
            <MenuItem value="en">{t('English')}</MenuItem>
            <MenuItem value="es">{t('Chines')}</MenuItem>
            <MenuItem value="hi">{t('Hindi')}</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};
export default LanguageSwitcher;
