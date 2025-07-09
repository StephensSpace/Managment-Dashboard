import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';

// ✅ Firebase Imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

// ✅ Deine Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBDL55GhF8tyUuohV7Xbyc3U90dWhUSjt8",
  authDomain: "managment-dashboard-9d06b.firebaseapp.com",
  projectId: "managment-dashboard-9d06b",
  storageBucket: "managment-dashboard-9d06b.appspot.com",
  messagingSenderId: "9119685140",
  appId: "1:9119685140:web:0ac68a0e24e6ace1a0e501"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    // ✅ Firebase & Firestore registrieren
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ]
};
