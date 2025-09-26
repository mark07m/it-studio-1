import { HeroContent, HeroAnimationConfig } from '@/types/hero';

export const heroContent: HeroContent = {
  // Stage 1: Эмоциональный крючок - Первое впечатление
  stage1: {
    title: {
      line1: '💡 Мечтаете о стартапе?',
      line2: 'Мы воплотим в реальность'
    },
    subtitle: 'Превращаем смелые идеи в цифровые продукты, которые меняют индустрии. 80% наших проектов привлекают инвестиции в первый год',
    scrollCue: '↓'
  },
  
  // Stage 2: Конкретизация - Как мы работаем
  stage2: {
    titleA: {
      line1: '🚀 От идеи за 30 дней',
      line2: 'до работающего MVP'
    },
    subtitle: 'Agile-разработка с недельными спринтами. Прозрачная отчетность и постоянная обратная связь. Ваш продукт растет у вас на глазах'
  },
  
  // Stage 3: Уникальность - Почему именно мы
  stage3: {
    title: {
      line1: '🏆 Опыт создания единорогов',
      line2: 'в вашем распоряжении'
    },
    subtitle: 'Команда ex-FAANG архитекторов, которые масштабировали продукты до миллиардов пользователей. Знаем подводные камни и как их обойти'
  },
  
  // Stage 4: Призыв к действию - Что получит клиент
  stage4: {
    title: {
      line1: '🎯 Готовы стать следующим',
      line2: 'технологическим лидером?'
    },
    subtitle: 'Бесплатная консультация + детальный roadmap вашего продукта. Начнем работу через 48 часов после подписания контракта',
    primaryCta: {
      text: '🚀 Запустить проект',
      href: '/contact'
    },
    secondaryCta: {
      text: '👀 Наши успехи',
      href: '/portfolio'
    },
    badges: [
      { text: '🔥 Ex-Google', variant: 'primary' },
      { text: '⚡ Ex-Meta', variant: 'secondary' },
      { text: '💎 Ex-Stripe', variant: 'accent' },
      { text: '🎨 Ex-Notion', variant: 'primary' },
      { text: '⭐ Ex-Linear', variant: 'secondary' }
    ],
    nextCue: '→'
  }
};

export const heroAnimationConfig: HeroAnimationConfig = {
  stage1: {
    title: {
      duration: 1000,
      stagger: 30,
      easing: [0.25, 0.46, 0.45, 0.94] // More bouncy entrance
    },
    subtitle: {
      duration: 800,
      delay: 200,
      easing: [0.4, 0, 0.2, 1]
    },
    scrollCue: {
      pulseDuration: 1200 // Faster pulse for engagement
    }
  },
  stage2: {
    morph: {
      duration: 600, // Reduced for smoother transition
      easing: [0.25, 0.46, 0.45, 0.94] // More natural easing
    },
    crossfade: {
      duration: 500 // Longer for better visibility
    }
  },
  stage3: {
    background: {
      duration: 1200,
      easing: [0.4, 0, 0.2, 1]
    }
  },
  stage4: {
    primaryCta: {
      duration: 700,
      spring: {
        stiffness: 240, // More responsive
        damping: 18
      }
    },
    secondaryCta: {
      duration: 500,
      delay: 100
    },
    badges: {
      stagger: 80, // Slower stagger for better readability
      duration: 500
    }
  }
};
