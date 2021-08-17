import { createGlobalStyle } from 'styled-components/macro';

import {
  Santana,
  SantanaBold,
  SantanaBlackCondensed,
  SantanaRegularCondensed,
  SantanaBlack,
  AvenirBook,
  AvenirBold,
  AvenirMedium,
  Omnes,
  ProximaNova,
} from '@hedwig/assets/fonts';

export const GlobalFonts = createGlobalStyle`
  @font-face {
    font-family: 'Santana';
    font-style: normal;
    font-weight: normal;
    src: url(${Santana}) format('woff');
  }

  @font-face {
    font-family: 'Santana-Bold';
    font-style: normal;
    font-weight: normal;
    src: url(${SantanaBold}) format('woff');
  }

  @font-face {
    font-family: 'Santana-BlackCondensed';
    font-style: normal;
    font-weight: normal;
    src: url(${SantanaBlackCondensed}) format('woff');
  }

  @font-face {
    font-family: 'Santana-RegularCondensed';
    font-style: normal;
    font-weight: normal;
    src: url(${SantanaRegularCondensed}) format('woff');
  }

  @font-face {
    font-family: 'Santana-Black';
    font-style: normal;
    font-weight: normal;
    src: url(${SantanaBlack}) format('woff');
  }

  @font-face {
    font-family: santana;
    src: url(${SantanaBold});
  }
  @font-face {
    font-family: avenir;
    src: url(${AvenirBook});
  }
  @font-face {
    font-family: avenirbold;
    src: url(${AvenirBold});
  }

  @font-face {
    font-family: avenirmedium;
    src: url(${AvenirMedium});
  }

  @font-face {
    font-family: avenirbook;
    src: url(${AvenirBook});
  }

  @font-face {
    font-family: 'Omnes';
    src: local('Omnes'), url(${Omnes});
  }

  @font-face {
    font-family: 'Proxima Nova';
    src: local('Proxima Nova'), url(${ProximaNova});
  }

  body {
    margin: 0;
    font-family: 'Proxima Nova', sans-serif;
    color: #333333;
  }
`;
