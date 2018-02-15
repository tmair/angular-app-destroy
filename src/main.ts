import { enableProdMode, NgModuleRef, TestabilityRegistry } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

declare global {
  interface Window {
    performBootstrap: (callback: () => void) => void;
    performDestroy: (node: HTMLElement, callback: () => void) => void;
  }
}

let appModule: NgModuleRef<AppModule> | undefined;

window.performBootstrap = function(callback) {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then((app: NgModuleRef<AppModule>) => (appModule = app))
    .then(callback)
    .catch(err => console.log(err));
};

window.performDestroy = function(node, callback) {
  if (appModule) {
    const testability = appModule.injector.get(TestabilityRegistry);
    appModule.destroy();
    testability.unregisterApplication(node);
  }
  appModule = undefined;
  callback();
};
