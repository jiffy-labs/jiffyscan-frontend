// app/provider.js
'use client';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POST_HOG_API_KEY ? process.env.NEXT_PUBLIC_POST_HOG_API_KEY : '', {
        api_host: 'https://app.posthog.com',
    });
}

export default function PHProvider({ children }: any) {
    return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
