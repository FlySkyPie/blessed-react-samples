import React, { useReducer } from 'react';
import blessed from 'blessed';
import { render } from 'react-blessed';
import { AnimatedBox } from './components/AnimatedBox';

const screen = blessed.screen({
    autoPadding: true,
    smartCSR: true,
    title: 'react-blessed box animation'
});

screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0);
});

render(<AnimatedBox />, screen, () => console.log('Rendered AnimatedBox!'));
