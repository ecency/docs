(() => {
  const desktopQuery = '(min-width: 50em)';

  const isDesktopSidebar = () => matchMedia(desktopQuery).matches;

  const isActiveLinkVisible = (sidebar, activeLink) => {
    const sidebarRect = sidebar.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    return linkRect.top >= sidebarRect.top && linkRect.bottom <= sidebarRect.bottom;
  };

  const centerLinkInSidebar = () => {
    const sidebar = document.getElementById('starlight__sidebar');
    if (!sidebar || !isDesktopSidebar()) return true;

    const activeLink = sidebar.querySelector("a[aria-current='page']");
    if (!activeLink) return false;

    if (isActiveLinkVisible(sidebar, activeLink)) return true;

    const sidebarRect = sidebar.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    const linkOffset = linkRect.top - sidebarRect.top + sidebar.scrollTop;
    const targetTop = Math.max(linkOffset - sidebar.clientHeight / 2 + linkRect.height / 2, 0);

    sidebar.scrollTo({ top: targetTop, behavior: 'auto' });
    return true;
  };

  const scheduleScroll = () => {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      requestAnimationFrame(() => {
        if (!centerLinkInSidebar()) {
          const sidebar = document.getElementById('starlight__sidebar') || document.body;
          const observer = new MutationObserver(() => {
            if (centerLinkInSidebar()) observer.disconnect();
          });
          observer.observe(sidebar, { childList: true, subtree: true });
        }
      });
    } else {
      window.addEventListener('DOMContentLoaded', scheduleScroll, { once: true });
    }
  };

  scheduleScroll();
})();
