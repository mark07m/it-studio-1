import { HeroContent, HeroAnimationConfig } from '@/types/hero';

export const heroContent: HeroContent = {
  stage1: {
    title: {
      line1: 'Создаем цифровые',
      line2: 'решения будущего'
    },
    subtitle: 'Разрабатываем инновационные веб-приложения и мобильные решения, которые помогают бизнесу расти и развиваться в цифровом мире',
    scrollCue: '↓'
  },
  stage2: {
    titleA: {
      line1: 'Создаем цифровые',
      line2: 'решения будущего'
    },
    titleB: {
      line1: 'Превращаем идеи',
      line2: 'в цифровую реальность'
    },
    subtitle: 'Разрабатываем инновационные веб-приложения и мобильные решения, которые помогают бизнесу расти и развиваться в цифровом мире'
  },
  stage3: {
    title: {
      line1: 'Превращаем идеи',
      line2: 'в цифровую реальность'
    },
    subtitle: 'Разрабатываем инновационные веб-приложения и мобильные решения, которые помогают бизнесу расти и развиваться в цифровом мире'
  },
  stage4: {
    title: {
      line1: 'Превращаем идеи',
      line2: 'в цифровую реальность'
    },
    subtitle: 'Разрабатываем инновационные веб-приложения и мобильные решения, которые помогают бизнесу расти и развиваться в цифровом мире',
    primaryCta: {
      text: 'Обсудить проект',
      href: '/contact'
    },
    secondaryCta: {
      text: 'Посмотреть работы',
      href: '/portfolio'
    },
    badges: [
      { text: 'Веб-разработка', variant: 'primary' },
      { text: 'Мобильные приложения', variant: 'secondary' },
      { text: 'UI/UX дизайн', variant: 'accent' },
      { text: 'Консалтинг', variant: 'primary' }
    ],
    nextCue: '→'
  }
};

export const heroAnimationConfig: HeroAnimationConfig = {
  stage1: {
    title: {
      duration: 800,
      stagger: 25,
      easing: [0.22, 1, 0.36, 1] // Framer Motion cubic-bezier format
    },
    subtitle: {
      duration: 600,
      delay: 180,
      easing: [0.4, 0, 0.2, 1] // Framer Motion cubic-bezier format
    },
    scrollCue: {
      pulseDuration: 1500
    }
  },
  stage2: {
    morph: {
      duration: 800,
      easing: [0.22, 1, 0.36, 1] // Framer Motion cubic-bezier format
    },
    crossfade: {
      duration: 150
    }
  },
  stage3: {
    background: {
      duration: 1000,
      easing: [0.4, 0, 0.2, 1] // Framer Motion cubic-bezier format
    }
  },
  stage4: {
    primaryCta: {
      duration: 600,
      spring: {
        stiffness: 220,
        damping: 20
      }
    },
    secondaryCta: {
      duration: 400,
      delay: 120
    },
    badges: {
      stagger: 60,
      duration: 400
    }
  }
};
