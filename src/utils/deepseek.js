import axios from 'axios';

async function getRuntimeConfig() {
  try {
    return await window.electronAPI.getConfig();
  } catch {
    // Fallback for non-Electron / test environments
    return {
      apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY || '',
      model: 'deepseek-chat',
      systemPrompt: '',
    };
  }
}

export async function generateReply(userPrompt, isProactive = false) {
  const cfg = await getRuntimeConfig();
  const apiKey = (cfg.apiKey || '').trim();
  const model  = cfg.model || 'deepseek-chat';
  const rawSystemPrompt = cfg.systemPrompt || '';
  const memories = cfg.memories || [];

  // Combine system prompt with memories
  let systemPrompt = rawSystemPrompt;
  if (memories.length > 0) {
    systemPrompt += `\n\n【你一定要记住的主人信息（记忆库）】：\n${memories.map((m, i) => `${i+1}. ${m}`).join('\n')}`;
  }

  if (!apiKey) {
    return isProactive
      ? '哇！主人连 API Key 都没配就想让我说话，真是太有个性了喵！'
      : '请先右键→打开设置，填入 API Key 喵~';
  }

  try {
    const response = await axios.post(
      'https://api.deepseek.com/chat/completions',
      {
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.8,
        max_tokens: 80,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('DeepSeek API Error:', error);
    return '呜呜呜...本喵脑子坏掉啦，连不上服务器喵...';
  }
}
