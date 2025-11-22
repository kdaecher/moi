type ThemeName = 'light' | 'dark';
export interface Theme {
  name: ThemeName;
  colors: {
    background: string;
    text: string;
    accent: string;
  };
}

export const themes: Record<string, Theme> = {
  light: {
    name: 'light',
    colors: {
      background: 'white',
      text: 'black',
      accent: 'blue'
    }
  },
  dark: {
    name: 'dark',
    colors: {
      background: 'black',
      text: 'white',
      accent: 'lightblue',
    }
  }
};

export class ThemeManager {
  private currentTheme: Theme;
  private storageKey = 'moi-theme';
  private listeners: Map<string, Set<(theme: Theme) => void>> = new Map();

  constructor() {
    const savedTheme = localStorage.getItem(this.storageKey);
    if (savedTheme && themes[savedTheme]) {
      this.currentTheme = themes[savedTheme];
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.currentTheme = prefersDark ? themes.dark : themes.light;
    }
    this.applyTheme();
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
    this.currentTheme = themes[newThemeName];
    this.applyTheme();
    this.saveTheme();
    this.emit('themeChange', this.currentTheme);
  }

  private applyTheme(): void {
    const root = document.documentElement;
    root.style.setProperty('--bg-color', this.currentTheme.colors.background);
    root.style.setProperty('--text-color', this.currentTheme.colors.text);
    root.style.setProperty('--accent-color', this.currentTheme.colors.accent);
  }

  private saveTheme(): void {
    localStorage.setItem(this.storageKey, this.currentTheme.name);
  }
}
