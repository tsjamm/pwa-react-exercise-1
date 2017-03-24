
// ./src/index.jsx
import React, { Component } from 'react';
import { render } from 'react-dom';

import { BaseView } from './components/BaseView.jsx';


render(
    <BaseView />,
    document.getElementById('bodyWrapper')
);