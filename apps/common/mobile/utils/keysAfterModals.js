// SPDX-FileCopyrightText: 2026 Hearth contributors
// SPDX-License-Identifier: AGPL-3.0-only

/*
 * keysAfterModals turns the editor's key events back on when the last
 * sheet, popover, popup, action sheet or dialog closes.
 *
 * Each phone editor turns key events off when one of these opens (its
 * Main controller's bindEvents), so typing does not reach the document
 * behind it, but nothing turned them back on. After the formatting sheet
 * had been opened and closed, a tap put the caret back in the text and
 * every key was dropped: the text input's focus handler ignores a focus
 * while key events are off. On iOS Safari the keyboard then came up
 * with nothing typed.
 *
 * api: the editor's api; canType: whether the editor is editing now (not
 * the document editor's reader, not view mode), asked at each close.
 * Another modal still open (one sheet opened from another) keeps the keys
 * off.
 */
export function keysAfterModals(api, canType) {
    // $$ is Framework7's Dom7, set on window by each editor's app.js.
    window.$$(window).on('popover:closed popup:closed sheet:closed actions:closed dialog:closed searchbar:disable', () => {
        if (document.querySelector('.modal-in') || !canType()) return;
        api.asc_enableKeyEvents(true);
    });
}
