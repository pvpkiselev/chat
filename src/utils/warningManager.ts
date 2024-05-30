import { warning } from '@elements/domElements';
import type { Warning } from '@elements/domElements';

class WarningManager {
  private active: boolean = false;
  private timeoutId: number | null = null;
  private warning: Warning;

  constructor(warning: Warning) {
    this.warning = warning;
  }

  hideWarning(): void {
    const { modal } = this.warning;
    if (!modal) return;

    modal.close();
    this.active = false;
  }

  showWarning(message: string, time = 3000, singleCall?: boolean): void {
    const isActive = this.active && singleCall;
    if (isActive) return;

    const { modal, messageWarning, closeButton } = this.warning;
    if (!modal || !messageWarning) return;

    messageWarning!.textContent = message;

    closeButton?.addEventListener('click', () => {
      this.hideWarning();
    });

    modal?.show();
    this.active = true;

    if (time > 0) {
      clearTimeout(this.timeoutId!);
      this.timeoutId = setTimeout(() => {
        this.hideWarning();
      }, time);
    }
  }
}

const warningManager = new WarningManager(warning);

export { warningManager };
