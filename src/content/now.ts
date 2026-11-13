/** Owner's check-in. Update these three values in [-1, 1] and the ISO date.
 * null means the widget is a neutral placeholder, not a live report of my mood.
 * Visitor adjustments are a temporary sandbox and never write to this file.
 */
export const currentCheckIn = {
  updated: '2026-11-11' as string | null,
  mood: 0.3,
  energy: -0.5,
  attention: -0.1,
  note: 'A small snapshot of the day.',
}
