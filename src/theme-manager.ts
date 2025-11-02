export interface Theme {
  name: string;
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

  constructor() {
    const savedTheme = localStorage.getItem(this.storageKey);
    this.currentTheme = (savedTheme && themes[savedTheme]) ? themes[savedTheme] : themes.light;
    this.applyTheme();
  }

  toggleTheme(): void {
    const newTheme = this.currentTheme.name === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  private setTheme(themeName: string): void {
    if (themes[themeName]) {
      this.currentTheme = themes[themeName];
      this.applyTheme();
      this.saveTheme();
    }
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
