/**
 * Translation Service - MyMemory API
 * Suporta múltiplos idiomas de origem: inglês, japonês, chinês, coreano, espanhol, etc.
 * Traduz para português brasileiro (PT-BR)
 */

import type { TranslationCache } from '../types/stack';

const CACHE_KEY = 'vibe_hub_translations';
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 dias em ms
const MAX_CONCURRENT = 3; // Máximo de requisições simultâneas

// Mapeamento de idiomas suportados para código MyMemory
const LANGUAGE_CODES: Record<string, string> = {
  'en': 'en',
  'ja': 'ja',
  'zh': 'zh',
  'ko': 'ko',
  'es': 'es',
  'fr': 'fr',
  'de': 'de',
  'ru': 'ru',
  'pt': 'pt-BR',
  'pt-BR': 'pt-BR',
};

// Idiomas que não precisam de tradução para PT-BR
const SKIP_LANGUAGES = ['pt', 'pt-BR', 'br'];

/**
 * Detecta o idioma de um texto baseado em caracteres
 * Retorna o código do idioma ou 'en' como padrão
 */
function detectLanguage(text: string): string {
  if (!text || text.trim().length === 0) return 'en';

  // Contar caracteres de cada tipo
  const hiraganaMatch = text.match(/[\u3040-\u309F]/g);
  const katakanaMatch = text.match(/[\u30A0-\u30FF]/g);
  const kanjiMatch = text.match(/[\u4E00-\u9FFF]/g);
  const hangulMatch = text.match(/[\uAC00-\uD7AF]/g);
  const cyrillicMatch = text.match(/[\u0400-\u04FF]/g);
  
  const hiraganaCount = hiraganaMatch ? hiraganaMatch.length : 0;
  const katakanaCount = katakanaMatch ? katakanaMatch.length : 0;
  const kanjiCount = kanjiMatch ? kanjiMatch.length : 0;
  const hangulCount = hangulMatch ? hangulMatch.length : 0;
  const cyrillicCount = cyrillicMatch ? cyrillicMatch.length : 0;

  // Verificar se é japonês (tem hiragana OU katakana, ou muitos kanji)
  if (hiraganaCount > 0 || katakanaCount > 0 || (kanjiCount > 5 && hiraganaCount + katakanaCount > 0)) {
    return 'ja';
  }

  // Verificar se é chinês (tem kanji mas NÃO tem hiragana nem katakana)
  if (kanjiCount > 0 && hiraganaCount === 0 && katakanaCount === 0) {
    return 'zh';
  }

  // Verificar se é coreano (hangul)
  if (hangulCount > 0) {
    return 'ko';
  }

  // Verificar se é russo (cirílico)
  if (cyrillicCount > 0) {
    return 'ru';
  }

  // Verificar se é espanhol (palavras comuns)
  const spanishWords = ['el', 'la', 'los', 'las', 'de', 'que', 'es', 'en', 'para', 'con', 'por', 'una', 'del', 'como', 'este', 'esta', 'pero', 'tiene', 'para', 'sobre'];
  const words = text.toLowerCase().split(/\s+/);
  const spanishCount = words.filter(w => spanishWords.includes(w)).length;
  if (spanishCount >= 2) return 'es';

  // Verificar se é francês
  const frenchWords = ['le', 'la', 'les', 'de', 'des', 'et', 'est', 'en', 'pour', 'avec', 'une', 'du', 'ce', 'cette', 'sont', 'dans', 'sur'];
  const frenchCount = words.filter(w => frenchWords.includes(w)).length;
  if (frenchCount >= 2) return 'fr';

  // Verificar se é alemão
  const germanWords = ['der', 'die', 'das', 'und', 'ist', 'ein', 'eine', 'für', 'mit', 'von', 'zu', 'auf', 'nicht', 'auch', 'es', 'an'];
  const germanCount = words.filter(w => germanWords.includes(w)).length;
  if (germanCount >= 2) return 'de';

  // Padrão: inglês
  return 'en';
}

/**
 * Obtém o cache de traduções do localStorage
 */
function getCache(): TranslationCache {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return {};
    
    const parsed = JSON.parse(cached) as TranslationCache;
    
    // Limpar entradas expiradas
    const now = Date.now();
    const cleaned: TranslationCache = {};
    let hasExpired = false;
    
    for (const [key, value] of Object.entries(parsed)) {
      if (now - value.timestamp < CACHE_TTL) {
        cleaned[key] = value;
      } else {
        hasExpired = true;
      }
    }
    
    // Salvar cache limpo se houver entradas expiradas
    if (hasExpired) {
      localStorage.setItem(CACHE_KEY, JSON.stringify(cleaned));
    }
    
    return cleaned;
  } catch {
    return {};
  }
}

/**
 * Salva traduções no cache
 */
function setCache(cache: TranslationCache): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // Silencioso em caso de erro de storage
  }
}

/**
 * Traduz um texto para português brasileiro
 * Detecta automaticamente o idioma de origem
 * @param text - Texto para traduzir
 * @param repoName - Nome do repositório (para cache)
 * @returns Texto traduzido ou original se falhar
 */
export async function translateToPortuguese(
  text: string,
  repoName: string
): Promise<string> {
  if (!text || text.trim().length === 0) {
    return text;
  }

  // Detectar idioma de origem
  const sourceLang = detectLanguage(text);

  // Se já é português ou português brasileiro, não traduzir
  if (SKIP_LANGUAGES.includes(sourceLang)) {
    return text;
  }

  // Verificar cache primeiro (incluindo idioma no cacheKey)
  const cache = getCache();
  const cacheKey = `${sourceLang}:${repoName}:${text.substring(0, 50)}`;
  
  if (cache[cacheKey]) {
    return cache[cacheKey].translated;
  }

  // Obter código do idioma para MyMemory
  const sourceCode = LANGUAGE_CODES[sourceLang] || 'en';
  const targetCode = 'pt-BR';

  try {
    // MyMemory API - tradução do idioma detectado para português brasileiro
    const encodedText = encodeURIComponent(text);
    let url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${sourceCode}|${targetCode}`;
    
    let response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    let data = await response.json() as {
      responseData: {
        translatedText: string;
      };
      responseStatus: number;
    };
    
    let translatedText = data.responseData?.translatedText;
    
    // Se a tradução não funcionou bem (texto muito curto ou igual ao original)
    // tenta traduzir primeiro para inglês, depois para português
    if (!translatedText || translatedText === text || translatedText.length < text.length * 0.3) {
      if (sourceLang === 'zh' || sourceLang === 'ja' || sourceLang === 'ko') {
        // Para idiomas asiáticos, traduzir em duas etapas: original -> inglês -> português
        const enUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceCode}|en`;
        const enResponse = await fetch(enUrl);
        const enData = await enResponse.json() as typeof data;
        
        if (enData.responseData?.translatedText) {
          const enText = enData.responseData.translatedText;
          const ptUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(enText)}&langpair=en|pt-BR`;
          const ptResponse = await fetch(ptUrl);
          const ptData = await ptResponse.json() as typeof data;
          translatedText = ptData.responseData?.translatedText || text;
        }
      }
    }
    
    if (translatedText && translatedText !== text) {
      // Salvar no cache
      cache[cacheKey] = {
        original: text,
        translated: translatedText,
        timestamp: Date.now()
      };
      setCache(cache);
      
      return translatedText;
    }
    
    // Se resposta não for sucesso, retorna original
    return text;
  } catch (error) {
    // Em desenvolvimento, log do erro
    if (import.meta.env.DEV) {
      console.warn(`Translation failed for ${repoName} (${sourceLang}):`, error);
    }
    
    // Fallback: retorna texto original
    return text;
  }
}

/**
 * Detecta o idioma e retorna informação sobre a tradução necessária
 */
export function getLanguageInfo(text: string): { 
  detectedLang: string; 
  needsTranslation: boolean;
  langLabel: string;
} {
  const detectedLang = detectLanguage(text);
  const needsTranslation = !SKIP_LANGUAGES.includes(detectedLang);
  
  const langLabels: Record<string, string> = {
    'en': 'Inglês',
    'ja': 'Japonês',
    'zh': 'Chinês',
    'ko': 'Coreano',
    'es': 'Espanhol',
    'fr': 'Francês',
    'de': 'Alemão',
    'ru': 'Russo',
    'pt': 'Português',
    'pt-BR': 'Português (BR)',
  };
  
  return {
    detectedLang,
    needsTranslation,
    langLabel: langLabels[detectedLang] || detectedLang.toUpperCase()
  };
}

/**
 * Traduz múltiplos textos em lote
 * @param items - Array de objetos com texto e nome do repo
 * @returns Array com textos traduzidos na mesma ordem
 */
export async function translateBatch(
  items: Array<{ text: string; repoName: string }>
): Promise<string[]> {
  const results: string[] = [];
  const queue = [...items];
  
  // Processar em lotes de MAX_CONCURRENT
  while (queue.length > 0) {
    const batch = queue.splice(0, MAX_CONCURRENT);
    const translations = await Promise.all(
      batch.map(item => translateToPortuguese(item.text, item.repoName))
    );
    results.push(...translations);
  }
  
  return results;
}

/**
 * Verifica se uma tradução está em cache
 */
export function hasCachedTranslation(repoName: string, text: string): boolean {
  const cache = getCache();
  const cacheKey = `${repoName}:${text.substring(0, 50)}`;
  return !!cache[cacheKey];
}