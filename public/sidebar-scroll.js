(() => {
  const ACTIVE_SELECTOR = "[data-starlight-sidebar] a[aria-current='page']";

  const scrollActiveLink = (behavior = 'auto') => {
    const activeLink = document.querySelector(ACTIVE_SELECTOR);
    if (!activeLink || typeof activeLink.scrollIntoView !== 'function') return false;

    const sidebar = activeLink.closest('[data-starlight-sidebar]');
    if (!sidebar) return false;

    const sidebarRect = sidebar.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    const isVisible = linkRect.top >= sidebarRect.top && linkRect.bottom <= sidebarRect.bottom;

    if (!isVisible) {
      activeLink.scrollIntoView({ block: 'center', inline: 'nearest', behavior });
    }

    return true;
  };

  const runWhenReady = () => {
    if (scrollActiveLink('smooth')) return;

    const sidebar = document.querySelector('[data-starlight-sidebar]') || document.body;
    const observer = new MutationObserver(() => {
      if (scrollActiveLink('smooth')) observer.disconnect();
    });

    observer.observe(sidebar, { childList: true, subtree: true });
  };

  const schedule = () => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', runWhenReady, { once: true });
    } else {
      runWhenReady();
    }
  };

  schedule();
  window.addEventListener('astro:after-swap', schedule);
})();
