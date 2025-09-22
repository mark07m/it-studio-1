# 🪟 Glassmorphism Guide

## Установленная библиотека
**tailwindcss-glassmorphism** - готовые iOS/Figma стили для Tailwind CSS

## Доступные классы

### Основные классы
- `.glass` - основной glass эффект (iOS стиль)
- `.glass-dark` - темная версия glass эффекта
- `.glass-card` - для карточек с glass эффектом

### Использование в компонентах

#### Header & Dock
```tsx
// Вместо старого кода:
<div className="_glass _glass-header h-full w-full">

// Теперь просто:
<div className="glass h-full w-full">
```

#### Карточки и элементы
```tsx
// Вместо:
<div className="backdrop-blur-[16px] bg-white/25 border shadow...">

// Теперь:
<div className="glass p-4 hover:glass-dark">
  <h2>Glass Card</h2>
</div>
```

#### Формы
```tsx
// Вместо сложных классов:
<input className="backdrop-blur-[16px] bg-white/25 border..." />

// Теперь:
<input className="glass focus:ring-2 focus:ring-cyan-400/50" />
```

## Преимущества

✅ **Готовые стили** - не нужно писать CSS вручную
✅ **iOS/Figma качество** - профессиональный glass эффект
✅ **Оптимизация** - встроенная поддержка мобильных устройств
✅ **Темная тема** - автоматическая поддержка dark mode
✅ **Производительность** - оптимизировано для Safari/iOS
✅ **Accessibility** - поддержка `prefers-reduced-transparency`

## Мобильная оптимизация

На устройствах ≤768px автоматически применяется:
- Упрощенный blur (16px вместо 24px)
- Отключенный will-change для лучшей производительности

## Fallback поддержка

Для браузеров без поддержки backdrop-filter автоматически применяется:
- Плоский фон с тенью
- Отключенные backdrop-filter эффекты

## Примеры использования

### Простая карточка
```tsx
<div className="glass p-6 rounded-xl">
  <h3 className="text-xl font-bold">Glass Card</h3>
  <p>Содержимое с glass эффектом</p>
</div>
```

### Интерактивная карточка
```tsx
<div className="glass p-4 hover:glass-dark transition-all duration-300 cursor-pointer">
  <h3>Hover me</h3>
</div>
```

### Форма с glass эффектом
```tsx
<form className="glass p-6 rounded-xl space-y-4">
  <input className="glass w-full p-3 rounded-lg" placeholder="Name" />
  <input className="glass w-full p-3 rounded-lg" placeholder="Email" />
  <button className="glass px-6 py-3 rounded-lg hover:glass-dark">
    Submit
  </button>
</form>
```

## Настройка

Все настройки находятся в `tailwind.config.js`:
```js
plugins: [
  require('tailwindcss-glassmorphism'),
],
```

Дополнительные стили в `globals.css` для:
- Мобильной оптимизации
- Safari/iOS поддержки
- Accessibility
- Fallback для старых браузеров
