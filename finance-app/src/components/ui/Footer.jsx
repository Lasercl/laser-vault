import React from 'react';
import { t } from '../../utils/i18n';

const Footer = () => (
  <footer style={{ marginTop: '60px', textAlign: 'center' }}>
    <p style={{ fontSize: '7px', fontWeight: '900', color: '#30363d', textTransform: 'uppercase', letterSpacing: '5px' }}>
      {t('engineer')}: Laser // SRIN v3.1
    </p>
  </footer>
);

export default Footer;
