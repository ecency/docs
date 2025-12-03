(() => {
  const storageKey = 'sl-sidebar-state';

  const shouldRestoreFromStorage = (sidebar) => {
    const persistTarget = sidebar.querySelector('sl-sidebar-state-persist');
    const hash = persistTarget?.dataset.hash;

    try {
      const storedState = JSON.parse(sessionStorage.getItem(storageKey) || 'null');
      return Boolean(hash && storedState?.hash === hash && typeof storedState.scroll === 'number');
    } catch {
      return false;
    }
  };

  const scrollCurrentSidebarLinkIntoView = () => {
    const sidebar = document.getElementById('starlight__sidebar');
    if (!sidebar || shouldRestoreFromStorage(sidebar)) return;

    const activeLink = sidebar.querySelector("a[aria-current='page']");
    if (!activeLink) return;

    const sidebarRect = sidebar.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    const linkOffset = linkRect.top - sidebarRect.top + sidebar.scrollTop;
    const targetTop = Math.max(linkOffset - sidebar.clientHeight / 2 + linkRect.height / 2, 0);

    sidebar.scrollTo({ top: targetTop, behavior: 'auto' });
  };

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    scrollCurrentSidebarLinkIntoView();
  } else {
    window.addEventListener('DOMContentLoaded', scrollCurrentSidebarLinkIntoView, { once: true });
  }
})();
