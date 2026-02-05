import { NextRequest, NextResponse } from 'next/server';

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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const filter = searchParams.get('filter') || 'all';

    // Filter subscribers
    let filteredSubscribers = subscribers;

    if (search) {
      filteredSubscribers = filteredSubscribers.filter(sub => 
        sub.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter === 'verified') {
      filteredSubscribers = filteredSubscribers.filter(sub => sub.verified);
    } else if (filter === 'unverified') {
      filteredSubscribers = filteredSubscribers.filter(sub => !sub.verified);
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedSubscribers = filteredSubscribers.slice(startIndex, endIndex);

    // Statistics
    const stats = {
      total: subscribers.length,
      verified: subscribers.filter(sub => sub.verified).length,
      unverified: subscribers.filter(sub => !sub.verified).length,
      recent: subscribers.filter(sub => 
        new Date(sub.subscribedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      ).length,
    };

    return NextResponse.json({
      subscribers: paginatedSubscribers.map(sub => ({
        email: sub.email,
        subscribedAt: sub.subscribedAt,
        verified: sub.verified,
        preferences: sub.preferences,
      })),
      pagination: {
        page,
        limit,
        total: filteredSubscribers.length,
        totalPages: Math.ceil(filteredSubscribers.length / limit),
      },
      stats,
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, preferences } = body;

    if (!email || !preferences) {
      return NextResponse.json(
        { error: 'Email and preferences are required' },
        { status: 400 }
      );
    }

    // Find and update subscriber
    const subscriberIndex = subscribers.findIndex(sub => sub.email === email);
    if (subscriberIndex === -1) {
      return NextResponse.json(
        { error: 'Subscriber not found' },
        { status: 404 }
      );
    }

    subscribers[subscriberIndex].preferences = preferences;

    return NextResponse.json({
      message: 'Preferences updated successfully',
      subscriber: {
        email: subscribers[subscriberIndex].email,
        preferences: subscribers[subscriberIndex].preferences,
      },
    });

  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: 'Failed to update preferences' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find and delete subscriber
    const subscriberIndex = subscribers.findIndex(sub => sub.email === email);
    if (subscriberIndex === -1) {
      return NextResponse.json(
        { error: 'Subscriber not found' },
        { status: 404 }
      );
    }

    subscribers.splice(subscriberIndex, 1);

    return NextResponse.json({
      message: 'Subscriber deleted successfully',
      email,
    });

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete subscriber' },
      { status: 500 }
    );
  }
}
