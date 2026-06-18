function yearPlugin() {
  return {
    name: "year",
    transformIndexHtml(html) {
      return html.replace("%%copyyear%%", new Date().getFullYear().toString());
    },
  };
}

export default {
  root: "src",
  publicDir: "public",
  plugins: [
    yearPlugin(),
  ],
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
};
