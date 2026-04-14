import { useState, useEffect } from 'react';
import { Octokit } from '@octokit/rest';
import type { StackItem } from '../types/stack';
import { stackData } from '../data/stackData';

// Inicialização sem token (limite de 60 req/hora público)
// Para produção escalável, o ideal seria uma variável de ambiente VITE_GITHUB_TOKEN
const octokit = new Octokit();

export interface VibeTrend {
  repo: string;
  stars: number;
}

export interface DiscoveryItem extends StackItem {
  stars: number;
}

const CACHE_KEY = 'vibe_hub_trends_cache_v2';
const CACHE_TTL = 1000 * 60 * 60 * 2; // 2 horas

export function useVibeTrends() {
  const [trends, setTrends] = useState<Record<string, number>>({});
  const [discovery, setDiscovery] = useState<DiscoveryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        // 1. Atualizar Stars da Stack Atual
        await Promise.all(
          reposToFetch.slice(0, 15).map(async (repo) => {
            try {
              const [owner, name] = repo.split('/');
              const { data } = await octokit.repos.get({ owner, repo: name });
              newTrends[repo] = data.stargazers_count;
            } catch (err) {
              console.error(`Error fetching meta for ${repo}:`, err);
            }
          })
        );

        // 2. Discover "Rising Tech" (Repositórios quentes criados no último mês)
        // Simulando busca por tecnologias de 2026 (ajustando data para o contexto do usuário)
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        const dateStr = lastMonth.toISOString().split('T')[0];

        const { data: searchData } = await octokit.search.repos({
          q: `stars:>500 created:>${dateStr} language:TypeScript language:JavaScript`,
          sort: 'stars',
          order: 'desc',
          per_page: 6
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const discoveryItems: DiscoveryItem[] = searchData.items.map((repo: any) => ({
          name: repo.name,
          desc: repo.description || 'Tecnologia emergente detectada pela Vibe Engine.',
          example: 'Trending repo',
          isNew: true,
          link: repo.html_url,
          repo: repo.full_name,
          stars: repo.stargazers_count
        }));

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
        setLoading(false);
      }
    }

    fetchTrends();
  }, []);

  return { trends, discovery, loading };
}
