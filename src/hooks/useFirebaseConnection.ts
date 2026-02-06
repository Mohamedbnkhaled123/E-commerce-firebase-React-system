import { useState, useEffect } from 'react';

interface FirebaseConnectionState {
    isOnline: boolean;
    isFirebaseConnected: boolean;
}

/**
 * Custom hook to monitor network connectivity and Firebase connection status
 * Provides a clean interface for UI components to respond to offline states
 */
export function useFirebaseConnection(): FirebaseConnectionState {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isFirebaseConnected, setIsFirebaseConnected] = useState(true);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => {
            setIsOnline(false);
            setIsFirebaseConnected(false);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // When back online, assume Firebase will reconnect
    useEffect(() => {
        if (isOnline) {
            setIsFirebaseConnected(true);
        }
    }, [isOnline]);

    return { isOnline, isFirebaseConnected };
}
