import { Octokit } from '@octokit/rest';

const CACHE_PREFIX = 'vibe_hub_ai_summary_v1_';
const octokit = new Octokit();

export async function getRepoSmartSummary(repoFullName: string): Promise<string | null> {
  if (!repoFullName) return null;

  // Verifica o Cache
  const cached = localStorage.getItem(`${CACHE_PREFIX}${repoFullName}`);
  if (cached) {
    return cached;
  }

  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  if (!apiKey) {
    return null; // Fallback se não houver chave
  }

  try {
    const [owner, repo] = repoFullName.split('/');
    
    // 1. Buscar o README do GitHub em formato de texto (raw)
    const response = await octokit.request('GET /repos/{owner}/{repo}/readme', {
      owner,
      repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        accept: 'application/vnd.github.v3.raw',
      }
    });
    
    const readmeContent = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);

    // 2. Chamar o OpenRouter para sumarizar o README
    const prompt = `Você é um desenvolvedor sênior ajudando outro desenvolvedor a entender um repositório no GitHub. 
O repositório é: ${repoFullName}.

Aqui está o conteúdo do README.md do repositório (truncado para caber no limite):
"""
${readmeContent.substring(0, 15000)}
"""

Por favor, faça um resumo completo e direto ao ponto em Português do Brasil explicando:
1. O que é este projeto e qual o principal problema que ele resolve?
2. Quais são as principais tecnologias ou casos de uso?

Formate a resposta de maneira amigável usando Markdown (negrito, listas se necessário), sem introduções longas como "Claro, aqui está o resumo". Vá direto ao conteúdo com um tom entusiasmado e profissional. Seja conciso (máximo de 3 parágrafos). Se o README não tiver informações úteis suficientes, deduza o máximo possível pelo nome ou diga que o repositório carece de documentação detalhada.`;

    const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin,
        "X-Title": "Vibe Coding Hub"
      },
      body: JSON.stringify({
        model: "nex-agi/nex-n2-pro:free",
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    if (!openRouterResponse.ok) {
      throw new Error(`OpenRouter API error: ${openRouterResponse.status}`);
    }

    const data = await openRouterResponse.json();
    const summary = data.choices?.[0]?.message?.content;

    if (summary) {
      localStorage.setItem(`${CACHE_PREFIX}${repoFullName}`, summary);
      return summary;
    }
    
    return null;
  } catch (error) {
    console.error(`Erro ao gerar resumo da IA para ${repoFullName}:`, error);
    return null;
  }
}
