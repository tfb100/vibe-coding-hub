import { useState, useEffect } from 'react';
import type { DiscoveryItem } from '../types/stack';
import { translateToPortuguese, getLanguageInfo } from '../services/translationService';

let octokitInstance: InstanceType<typeof import('@octokit/rest').Octokit> | null = null;
async function getOctokit() {
  if (!octokitInstance) {
    const { Octokit } = await import('@octokit/rest');
    octokitInstance = new Octokit();
  }
  return octokitInstance;
}

const CACHE_KEY = 'vibe_hub_github_trends_v8';
const CACHE_TTL = 1000 * 60 * 60; // 1 hora
const DISCOVERY_LIMIT = 24;

export function useGithubTrends() {
  const [trending, setTrending] = useState<DiscoveryItem[]>([]);
  const [established, setEstablished] = useState<DiscoveryItem[]>([]);
  const [hotReleases, setHotReleases] = useState<DiscoveryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const idleCallback = typeof requestIdleCallback !== 'undefined' 
      ? requestIdleCallback 
      : (cb: () => void) => setTimeout(cb, 200);

    const idleId = idleCallback(() => {
      if (cancelled) return;
      fetchGithubTrends();
    });

    async function fetchGithubTrends() {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { trending: cachedTrending, established: cachedEstablished, hotReleases: cachedHotReleases, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL) {
          setTrending(cachedTrending || []);
          setEstablished(cachedEstablished || []);
          setHotReleases(cachedHotReleases || []);
          setLoading(false);
          return;
        }
      }

      try {
        const octokit = await getOctokit();

        // Datas
        const now = new Date();
        
        const lastWeek = new Date(now);
        lastWeek.setDate(lastWeek.getDate() - 7);
        const lastWeekStr = lastWeek.toISOString().split('T')[0];

        const lastMonth = new Date(now);
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        const lastMonthStr = lastMonth.toISOString().split('T')[0];

        const last6Months = new Date(now);
        last6Months.setMonth(last6Months.getMonth() - 6);
        const last6MonthsStr = last6Months.toISOString().split('T')[0];

        // 1. Fetch Hot Releases (Lançamentos Bombando)
        let hotReleasesData = { items: [] as any[] };
        try {
          const res = await octokit.search.repos({
            q: `stars:>500 created:>${lastMonthStr} language:TypeScript language:JavaScript`,
            sort: 'stars',
            order: 'desc',
            per_page: DISCOVERY_LIMIT
          });
          hotReleasesData = res.data;
        } catch (e) {
          console.warn('Failed to fetch hot releases', e);
        }

        if (cancelled) return;

        // 2. Fetch Established (Consolidados)
        let establishedData = { items: [] as any[] };
        try {
          const res = await octokit.search.repos({
            q: `stars:>10000 pushed:>${last6MonthsStr} language:TypeScript language:JavaScript`,
            sort: 'stars',
            order: 'desc',
            per_page: DISCOVERY_LIMIT
          });
          establishedData = res.data;
        } catch (e) {
          console.warn('Failed to fetch established trends', e);
        }

        if (cancelled) return;

        // 3. Fetch Trending (Em Alta no Dia a Dia)
        let trendingData = { items: [] as any[] };
        try {
          const res = await octokit.search.repos({
            q: `stars:1000..10000 pushed:>${lastMonthStr} language:TypeScript language:JavaScript`,
            sort: 'stars',
            order: 'desc',
            per_page: DISCOVERY_LIMIT
          });
          trendingData = res.data;
        } catch (e) {
          console.warn('Failed to fetch trending repos', e);
        }

        if (cancelled) return;

        // Função auxiliar para formatar e traduzir os itens
        const processItems = async (items: any[]) => {
          return await Promise.all(
            items.map(async (repo: any) => {
              const originalDesc = repo.description || 'Tecnologia emergente detectada.';
              const { detectedLang } = getLanguageInfo(originalDesc);
              const translatedDesc = await translateToPortuguese(originalDesc, repo.full_name);
              
              return {
                name: repo.name,
                desc: originalDesc,
                translatedDesc,
                originalLang: detectedLang,
                translationLang: 'pt-br',
                isNew: true,
                repo: repo.full_name,
                link: repo.html_url,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                example: repo.language || 'Code'
              };
            })
          );
        };

        const sortItems = (items: any[]) => {
          return items.sort((a, b) => b.stars - a.stars || b.forks - a.forks);
        };

        const hotReleasesItems = sortItems(await processItems(hotReleasesData.items));
        const establishedItems = sortItems(await processItems(establishedData.items));
        const trendingItems = sortItems(await processItems(trendingData.items));

        if (cancelled) return;
        
        setHotReleases(hotReleasesItems);
        setEstablished(establishedItems);
        setTrending(trendingItems);

        localStorage.setItem(CACHE_KEY, JSON.stringify({
          hotReleases: hotReleasesItems,
          established: establishedItems,
          trending: trendingItems,
          timestamp: Date.now()
        }));

      } catch (err) {
        console.error('Failed to fetch github trends:', err);
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

  return { trending, established, hotReleases, loading };
}
