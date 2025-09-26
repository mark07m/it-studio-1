// Design tokens for different skins/themes

export interface SkinTokens {
  // Colors
  primary: string;
  secondary: string;
  accent: string;
  background: {
    gradient: {
      from: string;
      via?: string;
      to: string;
    };
    base: string;
    overlay: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  glass: {
    background: string;
    border: string;
    shadow: string;
  };
  neon: {
    glow: string;
    pulse: string;
    accent: string;
  };
  // Effects
  blur: {
    light: string;
    medium: string;
    heavy: string;
  };
  // Animation
  easing: {
    smooth: string;
    spring: string;
    bounce: string;
  };
}

export const skinTokens: Record<string, SkinTokens> = {
  neonGlass: {
    primary: '#8B5CF6',
    secondary: '#3B82F6',
    accent: '#A855F7',
    background: {
      gradient: {
        from: '#0A0F1E',
        via: '#1A1040',
        to: '#2D1B69'
      },
      base: '#0A0F1E',
      overlay: 'rgba(10, 15, 30, 0.8)'
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.8)',
      muted: 'rgba(255, 255, 255, 0.6)'
    },
    glass: {
      background: 'rgba(139, 92, 246, 0.1)',
      border: 'rgba(139, 92, 246, 0.3)',
      shadow: '0 8px 32px rgba(139, 92, 246, 0.2)'
    },
    neon: {
      glow: '#8B5CF6',
      pulse: '#A855F7',
      accent: '#3B82F6'
    },
    blur: {
      light: 'blur(4px)',
      medium: 'blur(8px)',
      heavy: 'blur(16px)'
    },
    easing: {
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.22, 1, 0.36, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
  },
  
  warmGlow: {
    primary: '#FFC857',
    secondary: '#FF8A65',
    accent: '#FFB74D',
    background: {
      gradient: {
        from: '#0C1020',
        via: '#1F1630',
        to: '#2D1A40'
      },
      base: '#0C1020',
      overlay: 'rgba(12, 16, 32, 0.8)'
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.85)',
      muted: 'rgba(255, 255, 255, 0.65)'
    },
    glass: {
      background: 'rgba(255, 200, 87, 0.1)',
      border: 'rgba(255, 200, 87, 0.3)',
      shadow: '0 8px 32px rgba(255, 200, 87, 0.2)'
    },
    neon: {
      glow: '#FFC857',
      pulse: '#FFB74D',
      accent: '#FF8A65'
    },
    blur: {
      light: 'blur(4px)',
      medium: 'blur(8px)',
      heavy: 'blur(16px)'
    },
    easing: {
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.22, 1, 0.36, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
  },
  
  monoWireframe: {
    primary: '#38BDF8',
    secondary: '#60A5FA',
    accent: '#22D3EE',
    background: {
      gradient: {
        from: '#0B0F17',
        via: '#121826',
        to: '#1E293B'
      },
      base: '#0B0F17',
      overlay: 'rgba(11, 15, 23, 0.8)'
    },
    text: {
      primary: '#F8FAFC',
      secondary: 'rgba(248, 250, 252, 0.8)',
      muted: 'rgba(248, 250, 252, 0.6)'
    },
    glass: {
      background: 'rgba(56, 189, 248, 0.05)',
      border: 'rgba(56, 189, 248, 0.2)',
      shadow: '0 8px 32px rgba(56, 189, 248, 0.1)'
    },
    neon: {
      glow: '#38BDF8',
      pulse: '#22D3EE',
      accent: '#60A5FA'
    },
    blur: {
      light: 'blur(2px)',
      medium: 'blur(4px)',
      heavy: 'blur(8px)'
    },
    easing: {
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.22, 1, 0.36, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
  }
};

export type SkinName = keyof typeof skinTokens;
