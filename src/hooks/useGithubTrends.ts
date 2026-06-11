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

const CACHE_KEY = 'vibe_hub_github_trends_v5';
const CACHE_TTL = 1000 * 60 * 60; // 1 hora
const DISCOVERY_LIMIT = 24;

export function useGithubTrends() {
  const [daily, setDaily] = useState<DiscoveryItem[]>([]);
  const [weekly, setWeekly] = useState<DiscoveryItem[]>([]);
  const [newReleases, setNewReleases] = useState<DiscoveryItem[]>([]);
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
        const { daily: cachedDaily, weekly: cachedWeekly, newReleases: cachedNewReleases, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL) {
          setDaily(cachedDaily);
          setWeekly(cachedWeekly);
          setNewReleases(cachedNewReleases || []);
          setLoading(false);
          return;
        }
      }

      try {
        const octokit = await getOctokit();

        // Datas
        const now = new Date();
        
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        const lastWeek = new Date(now);
        lastWeek.setDate(lastWeek.getDate() - 7);
        const lastWeekStr = lastWeek.toISOString().split('T')[0];

        const lastMonth = new Date(now);
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        const lastMonthStr = lastMonth.toISOString().split('T')[0];

        // 1. Fetch Daily
        let dailyData = { items: [] as any[] };
        try {
          const res = await octokit.search.repos({
            q: `stars:>1000 pushed:>${yesterdayStr} language:TypeScript language:JavaScript`,
            sort: 'stars',
            order: 'desc',
            per_page: DISCOVERY_LIMIT
          });
          dailyData = res.data;
        } catch (e) {
          console.warn('Failed to fetch daily trends', e);
        }

        if (cancelled) return;

        // 2. Fetch Weekly
        let weeklyData = { items: [] as any[] };
        try {
          const res = await octokit.search.repos({
            q: `stars:>1000 pushed:>${lastWeekStr} language:TypeScript language:JavaScript`,
            sort: 'stars',
            order: 'desc',
            per_page: DISCOVERY_LIMIT
          });
          weeklyData = res.data;
        } catch (e) {
          console.warn('Failed to fetch weekly trends', e);
        }

        if (cancelled) return;

        // 3. Fetch New Releases (>1000 stars, created last month)
        let newReleasesData = { items: [] as any[] };
        try {
          const res = await octokit.search.repos({
            q: `stars:>1000 created:>${lastMonthStr} language:TypeScript language:JavaScript`,
            sort: 'stars',
            order: 'desc',
            per_page: DISCOVERY_LIMIT
          });
          newReleasesData = res.data;
        } catch (e) {
          console.warn('Failed to fetch new releases', e);
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

        const dailyItems = await processItems(dailyData.items);
        const weeklyItems = await processItems(weeklyData.items);
        const newReleasesItems = await processItems(newReleasesData.items);

        if (cancelled) return;
        
        setDaily(dailyItems);
        setWeekly(weeklyItems);
        setNewReleases(newReleasesItems);

        localStorage.setItem(CACHE_KEY, JSON.stringify({
          daily: dailyItems,
          weekly: weeklyItems,
          newReleases: newReleasesItems,
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

  return { daily, weekly, newReleases, loading };
}
