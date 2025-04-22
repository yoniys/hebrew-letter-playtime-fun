
import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';

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
            StatusBar.setStyle({ style: Style.Light });
          } else {
            // For Android, we might want to use a dark status bar
            StatusBar.setStyle({ style: Style.Dark });
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
