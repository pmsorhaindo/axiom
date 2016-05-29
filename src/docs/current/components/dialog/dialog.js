import { Dialog, DialogBody, DialogFooter, DialogTitle } from 'axiom/react';
import DialogFullscreen from './DialogFullscreen';
import DialogSizes from './DialogSizes';

export default {
  id: 'dialog',
  path: 'dialog',
  group: 'components',
  components: [{
    Component: Dialog,
    children: [
      { Component: DialogTitle },
      { Component: DialogBody },
      { Component: DialogFooter },
    ],
  }],
  imports: {
    sass: ['components/dialog'],
  },
  examples: () => [{
    title: 'Dialog sizes',
    children: [{
      Component: DialogSizes,
    }],
  }, {
    title: 'Dialog fullscreen',
    children: [{
      Component: DialogFullscreen,
    }],
  }],
};