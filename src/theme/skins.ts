import { skinTokens, SkinName, SkinTokens } from './tokens';

export interface SkinConfig {
  name: string;
  displayName: string;
  description: string;
  tokens: SkinTokens;
  features: {
    hasNeon: boolean;
    hasGlow: boolean;
    hasWireframe: boolean;
    hasParticles: boolean;
    blurIntensity: 'light' | 'medium' | 'heavy';
  };
}

export const skins: Record<SkinName, SkinConfig> = {
  neonGlass: {
    name: 'neonGlass',
    displayName: 'Neon Glass',
    description: 'Классический неоновый стеклянный стиль с фиолетовыми акцентами',
    tokens: skinTokens.neonGlass,
    features: {
      hasNeon: true,
      hasGlow: true,
      hasWireframe: false,
      hasParticles: true,
      blurIntensity: 'heavy'
    }
  },
  
  warmGlow: {
    name: 'warmGlow',
    displayName: 'Warm Glow',
    description: 'Теплое свечение с желтоватыми тонами и мягкими переходами',
    tokens: skinTokens.warmGlow,
    features: {
      hasNeon: false,
      hasGlow: true,
      hasWireframe: false,
      hasParticles: true,
      blurIntensity: 'medium'
    }
  },
  
  monoWireframe: {
    name: 'monoWireframe',
    displayName: 'Mono Wireframe',
    description: 'Строгий монохромный стиль с акцентом на геометрию',
    tokens: skinTokens.monoWireframe,
    features: {
      hasNeon: false,
      hasGlow: false,
      hasWireframe: true,
      hasParticles: false,
      blurIntensity: 'light'
    }
  }
};

export const getSkin = (skinName: SkinName): SkinConfig => {
  return skins[skinName];
};

export const getAllSkins = (): SkinConfig[] => {
  return Object.values(skins);
};

export const getDefaultSkin = (): SkinName => 'neonGlass';
