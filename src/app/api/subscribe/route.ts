import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema
const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
});

// In-memory storage for development (replace with database in production)
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = subscribeSchema.parse(body);
    
    // Check if email already exists
    const existingSubscriber = subscribers.find(sub => sub.email === email);
    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 409 }
      );
    }
    
    // Generate tokens
    const verificationToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const unsubscribeToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    // Create new subscriber
    const newSubscriber = {
      email,
      subscribedAt: new Date(),
      verified: false,
      verificationToken,
      unsubscribeToken,
      preferences: {
        projects: true,
        blogPosts: true,
        newsletter: true,
      },
    };
    
    subscribers.push(newSubscriber);
    
    // TODO: Send verification email
    console.log('Verification link:', `/api/subscribe?token=${verificationToken}&action=verify`);
    console.log('Unsubscribe link:', `/api/subscribe?token=${unsubscribeToken}&action=unsubscribe`);
    
    return NextResponse.json({
      message: 'Successfully subscribed! Please check your email to verify.',
      subscriber: {
        email: newSubscriber.email,
        subscribedAt: newSubscriber.subscribedAt,
      },
    });
    
  } catch (error) {
    console.error('Subscription error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const action = searchParams.get('action');
    
    if (!token || !action) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      );
    }
    
    if (action === 'verify') {
      // Verify email
      const subscriberIndex = subscribers.findIndex(sub => sub.verificationToken === token);
      if (subscriberIndex === -1) {
        return NextResponse.json(
          { error: 'Invalid verification token' },
          { status: 404 }
        );
      }
      
      subscribers[subscriberIndex].verified = true;
      subscribers[subscriberIndex].verificationToken = '';
      
      return NextResponse.json({
        message: 'Email verified successfully!',
        email: subscribers[subscriberIndex].email,
      });
    }
    
    if (action === 'unsubscribe') {
      // Unsubscribe
      const subscriberIndex = subscribers.findIndex(sub => sub.unsubscribeToken === token);
      if (subscriberIndex === -1) {
        return NextResponse.json(
          { error: 'Invalid unsubscribe token' },
          { status: 404 }
        );
      }
      
      const unsubscribedEmail = subscribers[subscriberIndex].email;
      subscribers.splice(subscriberIndex, 1);
      
      return NextResponse.json({
        message: 'Successfully unsubscribed',
        email: unsubscribedEmail,
      });
    }
    
    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
    
  } catch (error) {
    console.error('Action error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
