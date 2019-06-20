import {
  Directive,
  Inject,
  ElementRef,
  forwardRef,
  OnDestroy,
  AfterViewInit,
  PLATFORM_ID,
} from '@angular/core'

import { MasonryComponent } from './masonry.component'
import { isPlatformBrowser } from '@angular/common'

interface MutationWindow extends Window {
  MutationObserver: any
  WebKitMutationObserver: any
}

declare var window: MutationWindow

@Directive({
  selector: '[usMasonryItem], usMasonryItem',
})
export class MasonryItemDirective implements OnDestroy, AfterViewInit {
  constructor(
    private _element: ElementRef,
    @Inject(forwardRef(() => MasonryComponent))
    private _parent: MasonryComponent,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this._parent.add(this._element.nativeElement)
      this.watchForHtmlChanges()
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      this._parent.remove(this._element.nativeElement)
    }
  }

  /** When HTML in brick changes dinamically, observe that and change layout */
  private watchForHtmlChanges(): void {
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver

    if (MutationObserver) {
      /** Watch for any changes to subtree */

      const observer = new MutationObserver(
        (mutations, observerFromElement) => {
          this._parent.layout()
        }
      )

      // define what element should be observed by the observer
      // and what types of mutations trigger the callback
      observer.observe(this._element.nativeElement, {
        subtree: true,
        childList: true,
      })
    }
  }
}
