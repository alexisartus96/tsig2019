import React from 'react';
import { render } from 'react-dom';
import App from './app/App';
import * as serviceWorker from './serviceWorker';

document.body.style.margin = "0px";
document.body.style.padding = "0px";

render(
  <App />,
  document.getElementById('root'),
);

serviceWorker.register();
