export interface HeroContent {
  stage1: HeroStage1Content;
  stage2: HeroStage2Content;
  stage3: HeroStage3Content;
  stage4: HeroStage4Content;
}

export interface HeroStage1Content {
  title: {
    line1: string;
    line2: string;
  };
  subtitle: string;
  scrollCue: string;
}

export interface HeroStage2Content {
  titleA: {
    line1: string;
    line2: string;
  };
  titleB: {
    line1: string;
    line2: string;
  };
  subtitle: string;
}

export interface HeroStage3Content {
  title: {
    line1: string;
    line2: string;
  };
  subtitle: string;
}

export interface HeroStage4Content {
  title: {
    line1: string;
    line2: string;
  };
  subtitle: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta: {
    text: string;
    href: string;
  };
  badges: Array<{
    text: string;
    variant: 'primary' | 'secondary' | 'accent';
  }>;
  nextCue: string;
}

export type HeroStage = 1 | 2 | 3 | 4;

export interface HeroAnimationConfig {
  stage1: {
    title: {
      duration: number;
      stagger: number;
      easing: number[]; // Framer Motion cubic-bezier format [x1, y1, x2, y2]
    };
    subtitle: {
      duration: number;
      delay: number;
      easing: number[]; // Framer Motion cubic-bezier format [x1, y1, x2, y2]
    };
    scrollCue: {
      pulseDuration: number;
    };
  };
  stage2: {
    morph: {
      duration: number;
      easing: number[]; // Framer Motion cubic-bezier format [x1, y1, x2, y2]
    };
    crossfade: {
      duration: number;
    };
  };
  stage3: {
    background: {
      duration: number;
      easing: number[]; // Framer Motion cubic-bezier format [x1, y1, x2, y2]
    };
  };
  stage4: {
    primaryCta: {
      duration: number;
      spring: {
        stiffness: number;
        damping: number;
      };
    };
    secondaryCta: {
      duration: number;
      delay: number;
    };
    badges: {
      stagger: number;
      duration: number;
    };
  };
}
