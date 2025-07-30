// src/app/shared/countdown.directive.ts
import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
declare const $: any;

@Directive({
  selector: '[appCountdown]',
  standalone: true
})
export class CountdownDirective implements OnChanges {
  @Input('appCountdown') targetDate!: string;
  private initialized = false;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnChanges(changes: SimpleChanges) {
  if (changes['targetDate'] && this.targetDate && !this.initialized) {
    const $el = $(this.el.nativeElement);

    // 1. Turn "YYYY‑MM‑DD" → "YYYY‑MM‑DDT23:59:59" if needed:
    let tgt = this.targetDate;
    if (/^\d{4}-\d{2}-\d{2}$/.test(tgt)) {
      tgt = `${tgt}T23:59:59`;
    }

    // 2. Parse into a Date object
    const dateObj = new Date(tgt);

    $el
      .countdown(dateObj)        // ← pass a Date, not a raw string
      .on('update.countdown', (e: any) => {
        const o = e.offset;
        $el.html(`
          <div class="count"><p>${o.days}</p><span>Days</span></div>
          <div class="count"><p>${this.pad(o.hours)}</p><span>Hrs</span></div>
          <div class="count"><p>${this.pad(o.minutes)}</p><span>Min</span></div>
          <div class="count"><p>${this.pad(o.seconds)}</p><span>Sec</span></div>
        `);
      })
      .on('finish.countdown', () => $el.hide());

    this.initialized = true;
    }
  }

  private pad(n: number) {
    return n < 10 ? '0' + n : '' + n;
  }
}
