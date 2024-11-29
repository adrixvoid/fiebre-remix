import { icons } from 'lucide-react';

function LucideIcon({ icon, color, size }: { icon: keyof typeof icons, color?: string, size?: number }) {
  const LucideIcon = icons[icon];

  return <LucideIcon color={color} size={size} />;
}

export default LucideIcon