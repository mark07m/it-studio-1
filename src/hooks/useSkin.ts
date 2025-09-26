import { useAppStore } from '@/store/appStore';
import { getSkin, SkinName } from '@/theme/skins';

export const useSkin = () => {
  const { currentSkin, setSkin, nextSkin, isSkinTransitioning } = useAppStore();
  const skinConfig = getSkin(currentSkin);
  
  return {
    currentSkin,
    skinConfig,
    setSkin,
    nextSkin,
    isSkinTransitioning,
    tokens: skinConfig.tokens
  };
};
