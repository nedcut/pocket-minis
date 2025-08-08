// Centralized design tokens for consistent styling across the app

export const colors = {
  // Base
  background: '#F6F7FB',
  surface: '#FFFFFF',
  border: '#E5E7EB',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  muted: '#9CA3AF',

  // Brand
  brand: '#6366F1', // indigo
  brandDark: '#4F46E5',
  success: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',

  // Rarities
  rarity: {
    common: '#9CA3AF',
    rare: '#3B82F6',
    epic: '#8B5CF6',
    legendary: '#F59E0B',
  },

  // Subtle pastels for backgrounds
  pastel: {
    blue: '#EEF2FF',
    purple: '#F3E8FF',
    teal: '#ECFEFF',
    amber: '#FFFBEB',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
};

export const shadow = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  raised: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },
};

export const typography = {
  heading: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: colors.textPrimary,
  },
  title: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: colors.textPrimary,
  },
  body: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  label: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500' as const,
  },
};

export const rarityBackground = {
  common: colors.pastel.blue,
  rare: '#EBF8FF',
  epic: colors.pastel.purple,
  legendary: colors.pastel.amber,
};

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';


