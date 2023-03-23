import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import nProgress from 'nprogress';

// Create a client
const queryClient = new QueryClient();

nProgress.configure({
    showSpinner: true,
});

Router.events.on('routeChangeStart', () => nProgress.start());
Router.events.on('routeChangeComplete', () => nProgress.done());
Router.events.on('routeChangeError', () => nProgress.done());

export default function App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
        </QueryClientProvider>
    );
}
