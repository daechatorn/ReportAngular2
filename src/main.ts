import 'zone.js/dist/zone';
import 'core-js';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

const platform = platformBrowserDynamic();

platform.bootstrapModule(AppModule);