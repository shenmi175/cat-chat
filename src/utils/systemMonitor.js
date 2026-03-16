export async function getSystemState() {
  if (window.electronAPI) {
    try {
      const state = await window.electronAPI.getSystemState();
      return state;
    } catch (e) {
      console.error('Error fetching system state:', e);
      return null;
    }
  }
  return null;
}
