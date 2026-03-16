import axios from 'axios';

// Runtime config cache – populated by loadRuntimeConfig()
let _config = null;

async function getRuntimeConfig() {
  if (_config) return _config;
  try {
    _config = await window.electronAPI.getConfig();
  } catch {
    // Fallback for non-Electron / test environments
    _config = {
      apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY || '',
      model: 'deepseek-chat',
      systemPrompt: '',
    };
  }
  // Stay up-to-date when settings window saves a new config
  window.electronAPI?.onConfigUpdated?.((cfg) => { _config = cfg; });
  return _config;
}

export async function generateReply(userPrompt, isProactive = false) {
  const cfg = await getRuntimeConfig();
  const apiKey = cfg.apiKey || '';
  const model  = cfg.model || 'deepseek-chat';
  const systemPrompt = cfg.systemPrompt || '';

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
