const nextConfig = {
    reactStrictMode: false,
    webpack: (config) => {
      // Resolve alias
      config.resolve.alias['p5'] = 'p5/lib/p5.js'; // Pointing to the unminified version of p5
  
      return config;
    },
  };
  
  export default nextConfig;