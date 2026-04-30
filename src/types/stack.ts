export interface StackItem {
  name: string;
  desc: string;
  example?: string;
  isNew: boolean;
  isMCP?: boolean;
  link?: string;
  repo?: string;
  doc?: string;
  docLabel?: string;
}

export interface StackSection {
  cat: string;
  icon: string;
  items: StackItem[];
}

// Tipos para tradução
export interface TranslationCache {
  [repoName: string]: {
    original: string;
    translated: string;
    timestamp: number;
  };
}

export interface DiscoveryItem extends StackItem {
  stars: number;
  translatedDesc?: string;
  translationLang?: string;
  originalLang?: string;
}
