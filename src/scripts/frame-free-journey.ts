/**
 * Loaded on every page. Records the landing context before any internal link discards
 * the campaign tags, and turns marked links into journey events.
 *
 * A static page marks an action with `data-ff-event` and `data-ff-location`; it never
 * needs its own script. Copy buttons are handled here too, so the starter text works the
 * same way on every page that offers it.
 */
import { captureLanding } from '../lib/acquisitionAttribution';
import { EVENTS, trackFrameFree, type EventName } from '../lib/frameFreeEvents';

captureLanding();

const byKey: Record<string, EventName> = {
  pdf_requested: EVENTS.pdfRequested,
  example_selected: EVENTS.exampleSelected,
};

document.addEventListener('click', (event) => {
  const target = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-ff-event]');
  if (!target) return;
  const name = byKey[target.dataset.ffEvent ?? ''];
  if (name) trackFrameFree(name, target.dataset.ffLocation ?? 'unknown');
});

/* Copy buttons: `data-ff-copy` names the id of the element whose text is copied. On
   failure the text is selected so the reader can copy it by hand, and the status says so. */
document.querySelectorAll<HTMLButtonElement>('[data-ff-copy]').forEach((button) => {
  button.hidden = false;
  button.addEventListener('click', async () => {
    const source = document.getElementById(button.dataset.ffCopy ?? '');
    const status = document.getElementById(`${button.dataset.ffCopy}-status`);
    if (!source) return;
    const text = source.textContent?.trim() ?? '';
    try {
      await navigator.clipboard.writeText(text);
      if (status) status.textContent = 'Copied. Paste it into the chat.';
      trackFrameFree(EVENTS.starterCopied, button.dataset.ffLocation ?? 'unknown');
    } catch {
      const range = document.createRange();
      range.selectNodeContents(source);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      if (status) status.textContent = 'Copying is blocked in this browser. The text is selected: press Ctrl+C or Cmd+C, or copy it by hand.';
    }
  });
});

if (document.body.dataset.ffPage === 'start') trackFrameFree(EVENTS.startViewed, 'start_page');
