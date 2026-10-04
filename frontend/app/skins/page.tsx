import type { Metadata } from 'next';
import { SavedSkinsPage } from '@/components/skins/SavedSkinsPage';

export const metadata: Metadata = {
  title: 'My Saved Skins · Make your AO3 pretty',
};

export default function SkinsPage() {
  return <SavedSkinsPage />;
}
