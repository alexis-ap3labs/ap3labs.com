/**
 * Interface for contact form API response
 * @interface ContactResponse
 * @property {boolean} success - Indicates if the contact form submission was successful
 * @property {string} [error] - Optional error message if submission failed
 */
export type ContactResponse = {
  success: boolean;
  error?: string;
}; 