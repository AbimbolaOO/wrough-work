import { css, Theme } from '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    palette: {
      blackBlackMain: string;
      blackBlack2: string;
      blackBlack3: string;
      greyGrey1: string;
      greyGrey2: string;
      mainBlue: string;
      mainPurple: string;
      purplePurple1: string;
      greyGrey3: string;
      backgroundColor: string;
      stateColorYellow: string;
      stateColorGreen: string;
      borderColor: string;
      stateColorRed: string;
      white: string;
      lightLemon: string;
      highlightColor: string;
    };
  }
}

export const theme: Theme = {
  palette: {
    //Locums colors
    blackBlackMain: '#0A0A0A',
    blackBlack2: '#11171D',
    blackBlack3: '#333',
    greyGrey1: '#4F4F4F',
    greyGrey2: '#828282',
    mainBlue: '#2857D1',
    mainPurple: '#7A40F2F2',
    greyGrey3: '#BDBDBD',
    backgroundColor: '#F2F8FD',
    stateColorYellow: '#E2B93B',
    stateColorGreen: '#27AE60',
    borderColor: '#cdcdd0',
    stateColorRed: '#E01D1D',
    purplePurple1: '#2857D1',
    white: '#FFF',
    lightLemon: '#DBFDE9',
    highlightColor: '#F6F6F6',
  },
};

const GlobalStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  * {
    margin: 0;
    font-size: 1em;
  }
  html,
  body {
    height: 100%;
  }
  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    font-family: 'Kanit';
    font-weight: 300;
    color: #4f4f4f;
  }
  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }
  input,
  button,
  textarea,
  select {
    font: inherit;
  }
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }
  #root,
  #__next {
    isolation: isolate;
  }
`;

export default GlobalStyles;
