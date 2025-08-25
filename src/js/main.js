import { initEvents } from './events.js';
import { renderLibrary } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    initEvents();
    renderLibrary();
});