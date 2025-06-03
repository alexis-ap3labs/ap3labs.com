import { writable } from 'svelte/store';

/**
 * Creates a custom store for managing the active section in navigation
 * Handles path cleaning and section state management
 * @returns {Object} Store with custom set method for section management
 */
function createActiveSection() {
    const { subscribe, set } = writable('');

    return {
        subscribe,
        /**
         * Sets the active section after cleaning the path
         * Removes leading slash and hash symbols if present
         * @param {string} path - The path or hash to set as active section
         */
        set: (path: string) => {
            // Remove leading slash and hash if present
            const cleanPath = path.replace(/^\/|#/g, '');
            set(cleanPath || '');
        }
    };
}

/**
 * Store for managing the currently active section in the navigation
 * Used to highlight current section in nav menu and handle scroll behavior
 */
export const activeSection = createActiveSection(); 