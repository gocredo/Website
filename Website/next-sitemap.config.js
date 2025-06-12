/** @type {import('next-sitemap').IConfig} */
   module.exports = {
     siteUrl: 'https://gocredo.in',
     generateRobotsTxt: true,
     exclude: [
       '/admin/*',
       '/signin/*',
       '/signup/*',
       '/api/*',
       '/dashboard',
     ],
     robotsTxtOptions: {
       policies: [
         { userAgent: '*', allow: '/' },
         { userAgent: '*', disallow: ['/admin/*', '/signin/*', '/signup/*', '/api/*', '/dashboard'] },
       ],
     },
     async additionalPaths() {
       // Placeholder for dynamic routes (e.g., blog posts)
       // Replace with your data source (e.g., CMS, database, or file system)
       const blogPosts = [
         { slug: 'seo-tips-2025' },
         { slug: 'digital-marketing-jaipur' },
       ]; // Update with actual blog post data
       return blogPosts.map(post => ({
         loc: `/blog/${post.slug}`,
         lastmod: new Date().toISOString(),
         changefreq: 'weekly',
         priority: 0.7,
       }));
     },
   };