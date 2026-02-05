import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// In-memory storage (same as in subscribe route)
const subscribers: Array<{
  email: string;
  subscribedAt: Date;
  verified: boolean;
  verificationToken: string;
  unsubscribeToken: string;
  preferences: {
    projects: boolean;
    blogPosts: boolean;
    newsletter: boolean;
  };
}> = [];

// Email notification schema
const notificationSchema = z.object({
  type: z.enum(['blog', 'project', 'newsletter']),
  title: z.string().min(1),
  content: z.string().min(1),
  url: z.string().url().optional(),
});

// Email templates
const getEmailTemplate = (type: string, title: string, content: string, url?: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  const templates = {
    blog: {
      subject: `New Blog Post: ${title}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Blog Post</title>
          <style>
            body { font-family: Arial, sans-serif; background-color: #000; color: #fff; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background-color: #111; border-radius: 10px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; }
            .content { padding: 30px; }
            .title { font-size: 24px; font-weight: bold; margin-bottom: 20px; color: #fff; }
            .text { line-height: 1.6; margin-bottom: 20px; color: #ccc; }
            .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; }
            .footer { background-color: #222; padding: 20px; text-align: center; font-size: 12px; color: #888; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📝 New Blog Post Published!</h1>
            </div>
            <div class="content">
              <h2 class="title">${title}</h2>
              <p class="text">${content}</p>
              ${url ? `<a href="${url}" class="button">Read Full Article</a>` : ''}
            </div>
            <div class="footer">
              <p>You're receiving this email because you subscribed to blog updates.</p>
              <p><a href="${baseUrl}/unsubscribe">Unsubscribe</a></p>
            </div>
          </div>
        </body>
        </html>
      `,
    },
    project: {
      subject: `New Project: ${title}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Project</title>
          <style>
            body { font-family: Arial, sans-serif; background-color: #000; color: #fff; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background-color: #111; border-radius: 10px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 30px; text-align: center; }
            .content { padding: 30px; }
            .title { font-size: 24px; font-weight: bold; margin-bottom: 20px; color: #fff; }
            .text { line-height: 1.6; margin-bottom: 20px; color: #ccc; }
            .button { display: inline-block; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; }
            .footer { background-color: #222; padding: 20px; text-align: center; font-size: 12px; color: #888; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚀 New Project Launched!</h1>
            </div>
            <div class="content">
              <h2 class="title">${title}</h2>
              <p class="text">${content}</p>
              ${url ? `<a href="${url}" class="button">View Project</a>` : ''}
            </div>
            <div class="footer">
              <p>You're receiving this email because you subscribed to project updates.</p>
              <p><a href="${baseUrl}/unsubscribe">Unsubscribe</a></p>
            </div>
          </div>
        </body>
        </html>
      `,
    },
    newsletter: {
      subject: title,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Newsletter</title>
          <style>
            body { font-family: Arial, sans-serif; background-color: #000; color: #fff; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background-color: #111; border-radius: 10px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 30px; text-align: center; }
            .content { padding: 30px; }
            .title { font-size: 24px; font-weight: bold; margin-bottom: 20px; color: #fff; }
            .text { line-height: 1.6; margin-bottom: 20px; color: #ccc; }
            .footer { background-color: #222; padding: 20px; text-align: center; font-size: 12px; color: #888; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📬 Newsletter</h1>
            </div>
            <div class="content">
              <h2 class="title">${title}</h2>
              <div class="text">${content}</div>
            </div>
            <div class="footer">
              <p>You're receiving this email because you subscribed to our newsletter.</p>
              <p><a href="${baseUrl}/unsubscribe">Unsubscribe</a></p>
            </div>
          </div>
        </body>
        </html>
      `,
    },
  };

  return templates[type as keyof typeof templates] || templates.newsletter;
};

// Mock email sending function (replace with real email service)
const sendEmail = async (to: string, subject: string, html: string) => {
  console.log('📧 Sending email:', { to, subject });
  console.log('📧 Email preview:', html.substring(0, 200) + '...');
  
  // In production, use a service like:
  // - Resend
  // - SendGrid
  // - AWS SES
  // - Nodemailer with SMTP
  
  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return { success: true, message: 'Email sent successfully' };
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, title, content, url } = notificationSchema.parse(body);

    // Get verified subscribers who opted in for this type of content
    const targetSubscribers = subscribers.filter(subscriber => {
      if (!subscriber.verified) return false;
      
      switch (type) {
        case 'blog':
          return subscriber.preferences.blogPosts;
        case 'project':
          return subscriber.preferences.projects;
        case 'newsletter':
          return subscriber.preferences.newsletter;
        default:
          return false;
      }
    });

    if (targetSubscribers.length === 0) {
      return NextResponse.json({
        message: 'No subscribers found for this notification type',
        sentCount: 0,
      });
    }

    // Get email template
    const template = getEmailTemplate(type, title, content, url);

    // Send emails (in production, you'd want to batch these and handle rate limiting)
    const results = await Promise.allSettled(
      targetSubscribers.map(async (subscriber) => {
        try {
          return await sendEmail(subscriber.email, template.subject, template.html);
        } catch (error) {
          console.error(`Failed to send email to ${subscriber.email}:`, error);
          return { success: false, error: (error as Error).message };
        }
      })
    );

    // Count successful and failed sends
    const successful = results.filter(result => 
      result.status === 'fulfilled' && result.value.success
    ).length;
    
    const failed = results.length - successful;

    return NextResponse.json({
      message: `Email notification sent to ${successful} subscribers`,
      sentCount: successful,
      failedCount: failed,
      totalTargeted: targetSubscribers.length,
      type,
      title,
    });

  } catch (error) {
    console.error('Notification error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid notification data', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to send notifications' },
      { status: 500 }
    );
  }
}

// GET endpoint to preview email templates
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'newsletter';
    const title = searchParams.get('title') || 'Sample Title';
    const content = searchParams.get('content') || 'Sample content for preview.';
    
    const template = getEmailTemplate(type, title, content);
    
    return NextResponse.json({
      template,
      preview: {
        type,
        title,
        subject: template.subject,
      },
    });

  } catch (error) {
    console.error('Preview error:', error);
    return NextResponse.json(
      { error: 'Failed to generate preview' },
      { status: 500 }
    );
  }
}
