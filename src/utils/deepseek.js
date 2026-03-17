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
    const memoryStrings = memories.map((m, i) => {
      const isObj = typeof m === 'object' && m !== null;
      const text = isObj ? m.text : m;
      const time = isObj ? ` (记录时间: ${m.time})` : '';
      return `${i + 1}. ${text}${time}`;
    });
    systemPrompt += `\n\n【你一定要记住的主人信息（记忆库）】：\n${memoryStrings.join('\n')}`;
  }

  // Add auto-memory trigger instruction
  systemPrompt += `\n\n【重要记忆指令】：
只有当主人（用户）在对话中**明确且肯定**地提到了关于他/她自己的新信息（如姓名、喜好、生日等）时，才在回答最后使用 [MEMORY: 信息内容]。
禁止事项：
1. 绝对禁止记录带有问号“？”的内容。
2. 禁止记录你的猜测、疑问或反问。
3. 只有主人给出的确凿事实（陈述句）才值得记录。
4. 记录内容要精炼（如：主人喜欢喝咖啡）。`;

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
