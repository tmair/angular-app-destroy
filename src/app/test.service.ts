import { Injectable } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Injectable()
export class TestService implements OnDestroy {
  constructor() {
    console.log('TestService created');
  }

  ngOnDestroy(): void {
    console.log('TestService destroyed');
  }
}
