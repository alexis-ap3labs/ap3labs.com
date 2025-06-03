import { writable } from 'svelte/store';

/**
 * Store to track the loading state of the page
 * Used to coordinate initial page load animations and transitions
 * @type {import('svelte/store').Writable<boolean>}
 */
export const isPageLoaded = writable(false); 