type ThemeName = 'light' | 'dark';
export interface Theme {
  name: ThemeName;
  colors: {
    background: string;
    text: string;
    hover: string;
  };
}

export class ThemeManager {
  private themes: Record<ThemeName, Theme>;
  private currentTheme: Theme;
  private listeners: Map<string, Set<(theme: Theme) => void>> = new Map();

  constructor() {
    this.themes = this.readThemesFromCSS();
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.currentTheme = prefersDark ? this.themes.dark : this.themes.light;
    this.applyTheme();
  }

  private readThemesFromCSS(): Record<ThemeName, Theme> {
    const tempElement = document.createElement('div');
    tempElement.style.display = 'none';
    document.body.appendChild(tempElement);

    const readThemeColors = (className: string) => {
      tempElement.className = className;
      const computedStyle = getComputedStyle(tempElement);
      return {
        background: computedStyle.getPropertyValue('--bg-color').trim(),
        text: computedStyle.getPropertyValue('--text-color').trim(),
        hover: computedStyle.getPropertyValue('--hover-color').trim(),
      };
    };
    const lightColors = readThemeColors('light');
    const darkColors = readThemeColors('dark');

    document.body.removeChild(tempElement);

    return {
      light: {
        name: 'light',
        colors: lightColors
      },
      dark: {
        name: 'dark',
        colors: darkColors
      }
    };
  }

  on(event: 'themeChange', callback: (theme: Theme) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
  }

  off(event: 'themeChange', callback: (theme: Theme) => void): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.delete(callback);
    }
  }

  private emit(event: string, theme: Theme): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(callback => callback(theme));
    }
  }

  get(): Theme {
    return this.currentTheme;
  }

  toggleTheme(): void {
    const newThemeName = this.currentTheme.name === 'light' ? 'dark' : 'light';
    this.currentTheme = this.themes[newThemeName];
    this.applyTheme();
    this.emit('themeChange', this.currentTheme);
  }

  private applyTheme(): void {
    const root = document.documentElement;
    root.style.setProperty('--bg-color', this.currentTheme.colors.background);
    root.style.setProperty('--text-color', this.currentTheme.colors.text);
    root.style.setProperty('--hover-color', this.currentTheme.colors.hover);
  }
}
