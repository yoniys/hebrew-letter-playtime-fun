
import { useEffect } from 'react';
import { App as CapacitorApp, StatusBarStyle } from '@capacitor/core';
import { Capacitor } from '@capacitor/core';

/**
 * This component initializes Capacitor features when running as a native app
 */
const AppCapacitor = () => {
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      // Set up the status bar
      const setupStatusBar = async () => {
        try {
          if (Capacitor.getPlatform() === 'ios') {
            // For iOS, we might want to use a light status bar
            CapacitorApp.setStatusBarStyle({ style: StatusBarStyle.Light });
          } else {
            // For Android, we might want to use a dark status bar
            CapacitorApp.setStatusBarStyle({ style: StatusBarStyle.Dark });
          }
        } catch (error) {
          console.error('Error setting up status bar:', error);
        }
      };

      setupStatusBar();
    }
  }, []);

  // This is a utility component, it doesn't render anything
  return null;
};

export default AppCapacitor;
