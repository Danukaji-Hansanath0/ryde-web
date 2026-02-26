export const palette = {
    chalk: {
        base: '#FFFFFF',
        contrast: '#F8FAFC',
        muted: '#F1F5F9',
    },
    slate: {
        base: '#94A3B8',
        dark: '#64748B',
        darker: '#475569',
    },
    midnight: {
        base: '#0B0F19',      // Deeper, richer background
        dark: '#151C2C',      // Cards / elevated surfaces
        light: '#2A3447',     // Hover / Active states
        border: '#2D3748',    // Subtle borders
    },
    royal: {
        base: '#3B82F6',      // Primary blue
        light: '#60A5FA',     // Lighter variant
        dark: '#2563EB',      // Darker variant
        glow: 'rgba(59, 130, 246, 0.5)',
    },
    flare: {
        base: '#EF4444',      // Accent red
        light: '#F87171',     // Lighter variant
        dark: '#DC2626',      // Darker variant
        glow: 'rgba(239, 68, 68, 0.5)',
    },
    success: {
        base: '#10B981',
        light: '#34D399',
    },
    warning: {
        base: '#F59E0B',
    }
} as const;

export const COLORS = {
    primary: palette.royal.base,
    primaryDark: palette.royal.dark,
    secondary: palette.midnight.light,
    accent: palette.flare.base,
    background: palette.midnight.base,
    surface: palette.midnight.dark,
    text: {
        primary: palette.chalk.base,
        secondary: palette.slate.base,
        light: palette.chalk.contrast,
    },
    border: palette.midnight.border,
} as const;
