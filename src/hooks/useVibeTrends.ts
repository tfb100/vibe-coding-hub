import { useState, useEffect } from 'react';
import type { DiscoveryItem } from '../types/stack';
import { stackData } from '../data/stackData';
import { translateToPortuguese, getLanguageInfo } from '../services/translationService';

// Lazy-load Octokit to reduce initial bundle size
let octokitInstance: InstanceType<typeof import('@octokit/rest').Octokit> | null = null;
async function getOctokit() {
  if (!octokitInstance) {
    const { Octokit } = await import('@octokit/rest');
    octokitInstance = new Octokit();
  }
  return octokitInstance;
}

export interface VibeTrend {
  repo: string;
  stars: number;
}

// DiscoveryItem já está definido em types/stack.ts com campos de tradução

const CACHE_KEY = 'vibe_hub_trends_cache_v3';
const CACHE_TTL = 1000 * 60 * 60 * 2; // 2 horas
const DISCOVERY_LIMIT = 12; // Expandido de 6 para 12 repositórios

export function useVibeTrends() {
  const [trends, setTrends] = useState<Record<string, number>>({});
  const [discovery, setDiscovery] = useState<DiscoveryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    // Defer API calls until browser is idle
    const idleCallback = typeof requestIdleCallback !== 'undefined' 
      ? requestIdleCallback 
      : (cb: () => void) => setTimeout(cb, 200);

    const idleId = idleCallback(() => {
      if (cancelled) return;
      fetchTrends();
    });

    async function fetchTrends() {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, discovery: cachedDiscovery, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL) {
          setTrends(data);
          setDiscovery(cachedDiscovery);
          setLoading(false);
          return;
        }
      }

      const reposToFetch: string[] = [];
      stackData.forEach(section => {
        section.items.forEach(item => {
          if (item.repo) reposToFetch.push(item.repo);
        });
      });

      const newTrends: Record<string, number> = {};
      
      try {
        const octokit = await getOctokit();

        // 1. Atualizar Stars da Stack Atual (batched with concurrency limit)
        // Limita a 10 repos para evitar rate limit da API pública do GitHub (60 req/h)
        const BATCH_SIZE = 5;
        const reposLimited = reposToFetch.slice(0, 10);
        for (let i = 0; i < reposLimited.length; i += BATCH_SIZE) {
          if (cancelled) return;
          const batch = reposLimited.slice(i, i + BATCH_SIZE);
          await Promise.all(batch.map(async (repo) => {
            try {
              const [owner, name] = repo.split('/');
              const { data, headers } = await octokit.repos.get({ owner, repo: name });
              newTrends[repo] = data.stargazers_count;
              // Respeita o rate limit: se restam menos de 10 requests, para
              const remaining = parseInt(headers['x-ratelimit-remaining'] ?? '60', 10);
              if (remaining < 10) {
                cancelled = true;
              }
            } catch (err) {
              // Silencia 403/429 (rate limit) sem poluir o console
              const status = (err as { status?: number }).status;
              if (status !== 403 && status !== 429) {
                console.error(`Error fetching meta for ${repo}:`, err);
              }
            }
          }));
        }

        if (cancelled) {
          setTrends(newTrends);
          setLoading(false);
          return;
        }

        // 2. Discover "Rising Tech" (Repositórios quentes criados no último mês)
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        const dateStr = lastMonth.toISOString().split('T')[0];

        const { data: searchData } = await octokit.search.repos({
          q: `stars:>500 created:>${dateStr} language:TypeScript language:JavaScript`,
          sort: 'stars',
          order: 'desc',
          per_page: DISCOVERY_LIMIT
        });

        // 3. Traduzir descrições para PT-BR (detecta idioma automaticamente)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const discoveryItems: DiscoveryItem[] = await Promise.all(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          searchData.items.map(async (repo: any) => {
            const originalDesc = repo.description || 'Tecnologia emergente detectada pela Vibe Engine.';
            const { detectedLang, langLabel } = getLanguageInfo(originalDesc);
            const translatedDesc = await translateToPortuguese(originalDesc, repo.full_name);
            
            return {
              name: repo.name,
              desc: originalDesc,
              translatedDesc,
              translationLang: langLabel,
              originalLang: detectedLang,
              example: 'Trending repo',
              isNew: true,
              link: repo.html_url,
              repo: repo.full_name,
              stars: repo.stargazers_count
            };
          })
        );

        if (cancelled) return;
        setTrends(newTrends);
        setDiscovery(discoveryItems);

        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data: newTrends,
          discovery: discoveryItems,
          timestamp: Date.now()
        }));
      } catch (err) {
        console.error('Failed to fetch vibe trends:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    return () => {
      cancelled = true;
      if (typeof cancelIdleCallback !== 'undefined') cancelIdleCallback(idleId as number);
      else clearTimeout(idleId as ReturnType<typeof setTimeout>);
    };
  }, []);

  return { trends, discovery, loading };
}
