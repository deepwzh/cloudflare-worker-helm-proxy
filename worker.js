export default {
    async fetch(request, env, ctx) {
      const url = new URL(request.url);
  
      if (url.pathname.startsWith('/proxy/')) {
        // Extract the original URL from the request
        const originalUrl = url.pathname.replace('/proxy/', '');
  
        if (originalUrl.endsWith('index.yaml')) {
          try {
            // Fetch the original index.yaml
            const response = await fetch(originalUrl);
  
            if (!response.ok) {
              return new Response('Failed to fetch the original index.yaml', { status: 500 });
            }
  
            const originalYaml = await response.text();
            const currentDomain = `${url.protocol}//${url.host}/proxy/`;
            const modifiedYaml = addPrefixToUrls(originalYaml, currentDomain);
  
            return new Response(modifiedYaml, {
              headers: { 'Content-Type': 'application/x-yaml' },
            });
          } catch (error) {
            return new Response('Error occurred while processing the request', { status: 500 });
          }
        } else {
          // Normal proxy for all other requests
          try {
            const response = await fetch(originalUrl);
            return new Response(response.body, response);
          } catch (error) {
            return new Response('Error occurred while processing the proxy request', { status: 500 });
          }
        }
      }
  
      return new Response('Not Found', { status: 404 });
    },
  };
  
  function addPrefixToUrls(yamlContent, prefix) {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    return yamlContent.replace(urlPattern, (url) => {
      return prefix + url;
    });
  }