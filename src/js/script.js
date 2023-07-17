import { pageNavigation } from './sections/nevigation.js';
import { featuresTabs } from './sections/features.js';
import { aboutSectionFunc } from './sections/about.js';
import { slider } from './sections/gallery.js';
import Map from './sections/map.js';
import { subscription } from './sections/subscription.js';

const init = function () {
  // Navigation
  pageNavigation();

  // About
  aboutSectionFunc();

  // Features tabs
  featuresTabs();

  // Slider
  slider();

  // Map
  new Map();

  // Subscription
  subscription();
};

init();
