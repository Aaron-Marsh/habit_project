import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

global.React = React;
global.render = render;
global.screen = screen;
global.userEvent = userEvent;
global.fireEvent = fireEvent;
