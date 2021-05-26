import { createGlobalStyle } from 'styled-components';
import { darkSber, darkEva, darkJoy } from '@sberdevices/plasma-tokens/themes'; // Или один из списка: darkEva, darkJoy, lightEva, lightJoy, lightSber
import {
    text, // Цвет текста
    background, // Цвет подложки
    gradient, // Градиент
} from '@sberdevices/plasma-tokens';

const DocumentStyle = createGlobalStyle`
    html:root {
        min-height: 100vh;
        color: ${text};
        background-color: ${background};
        background-image: ${gradient};
    }
`;
const ThemeSber = createGlobalStyle(darkSber);
const ThemeJoy = createGlobalStyle(darkJoy);
const ThemeEva = createGlobalStyle(darkEva);

export const GlobalStyle = () => (
    <>
        <DocumentStyle />
        <ThemeSber />
    </>
);