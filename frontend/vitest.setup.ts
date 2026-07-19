import "@testing-library/jest-dom/vitest";

// jsdom doesn't implement window.matchMedia. Components that read OS
// preferences (e.g. ThemeProvider checking prefers-color-scheme) need
// this polyfilled for any test that renders them.
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }) as unknown as MediaQueryList;
}
