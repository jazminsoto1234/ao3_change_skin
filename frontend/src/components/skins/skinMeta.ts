import type { Skin, SkinConfig } from '@/types/skin';

export const skinColors = (config: SkinConfig): string[] => [config.linkColor, config.backgroundColor];

// "Last Updated: October 26, 2022, 7:03 AM"
export function lastUpdatedLabel(skin: Skin): string {
  const date = new Date(skin.updated_at);
  const day = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return `Last Updated: ${day}, ${time}`;
}
