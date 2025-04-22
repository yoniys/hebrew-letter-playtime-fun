
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.545271d339ba4c31ae568ed15a4942b0',
  appName: 'hebrew-letter-playtime-fun',
  webDir: 'dist',
  server: {
    url: 'https://545271d3-39ba-4c31-ae56-8ed15a4942b0.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'always',
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
      keystorePassword: undefined,
      keystoreAliasPassword: undefined,
    }
  }
};

export default config;
