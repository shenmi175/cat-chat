export async function generateReply(userPrompt, isProactive = false) {
  try {
    return await window.electronAPI.generateReply(userPrompt, isProactive);
  } catch (error) {
    console.error('DeepSeek IPC Error:', error);
    return '呜呜呜...我脑子坏掉啦，连不上服务器...';
  }
}
