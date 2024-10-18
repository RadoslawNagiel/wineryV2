import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: `com.bekarn.winery`,
    appName: `Winery`,
    webDir: `www`,
    plugins: {
        SplashScreen: {
            androidScaleType: `CENTER_CROP`,
            launchAutoHide: true,
            splashFullScreen: false,
            splashImmersive: false,
        },
    },
    // server: {
    //     cleartext: true,
    //     url: `http://192.168.1.58:4200`,
    // },
};

export default config;
