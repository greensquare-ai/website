export const tokens = Object.freeze({
  formats: {
    instagram_4x5: { width: 1080, height: 1350, safe: 84 },
    linkedin_square: { width: 1200, height: 1200, safe: 84 }
  },
  colourModes: {
    paper: { ground: '#FFFFFF', text: '#12140F', neutral: '#B8B5AA', accent: '#24553B' },
    forest: { ground: '#133F26', text: '#FFFFFF', neutral: '#C9D8CD', accent: '#5EA983' },
    ink: { ground: '#12140F', text: '#FFFFFF', neutral: '#C9D8CD', accent: '#5EA983' },
    sage: { ground: '#D8DDD8', text: '#12140F', neutral: '#12140F', accent: '#24553B' }
  },
  typography: {
    display: "'Space Grotesk', Arial, sans-serif",
    body: "'IBM Plex Sans', Arial, sans-serif",
    eyebrow: 26,
    headline: 78,
    headlineLeading: 0.98,
    bodySize: 34,
    bodyLeading: 1.28,
    meta: 22
  },
  stroke: { social: 2 },
  spacing: { xs: 16, sm: 24, md: 40, lg: 64, xl: 84 },
  rules: {
    maxColoursPerComposition: 3,
    patternInstancesPerFrame: 1,
    headlineMaxLines: 6,
    minimumHeadlineSize: 56,
    minimumBodySize: 26
  }
});
