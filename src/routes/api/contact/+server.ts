import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';

/**
 * Initialize Resend email client
 * @see https://resend.com/docs
 */
const resend = new Resend(RESEND_API_KEY);

/**
 * Contact form submission handler
 * Processes POST requests to send contact form data via email
 * 
 * @param {Request} request - The incoming request object containing form data
 * @returns {Promise<Response>} JSON response indicating success or failure
 */
export const POST: RequestHandler = async ({ request }) => {
  try {
    // Extract form data from request
    const { name, email, message } = await request.json();

    console.log('Using API key:', RESEND_API_KEY);

    // Send email using Resend
    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>', // Will be customized after domain verification
      to: 'alexis@ap3labs.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    // Return success response
    return json({ success: true });
  } catch (error) {
    // Log error and return error response
    console.error('Email error:', error);
    return json(
      { error: 'Failed to send email' }, 
      { status: 500 }
    );
  }
} 