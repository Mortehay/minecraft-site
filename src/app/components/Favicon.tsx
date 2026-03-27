import { useEffect } from 'react';

export function Favicon() {
  useEffect(() => {
    // Create SVG favicon with Minecraft pickaxe on emerald green background
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <rect width="32" height="32" fill="#10b981"/>
        <g fill="#0a0a0f">
          <!-- Pickaxe handle -->
          <rect x="14" y="18" width="2" height="8"/>
          <rect x="15" y="20" width="2" height="6"/>
          
          <!-- Pickaxe head -->
          <rect x="10" y="8" width="10" height="2"/>
          <rect x="8" y="10" width="4" height="2"/>
          <rect x="18" y="10" width="4" height="2"/>
          <rect x="10" y="12" width="10" height="2"/>
          <rect x="12" y="14" width="6" height="2"/>
          <rect x="14" y="16" width="2" height="2"/>
          
          <!-- Handle grip -->
          <rect x="13" y="17" width="4" height="1"/>
          <rect x="13" y="19" width="4" height="1"/>
          <rect x="13" y="21" width="4" height="1"/>
        </g>
        
        <!-- Highlights -->
        <g fill="#34d399">
          <rect x="11" y="9" width="2" height="1"/>
          <rect x="19" y="9" width="2" height="1"/>
        </g>
      </svg>
    `;
    
    const favicon = `data:image/svg+xml,${encodeURIComponent(svg)}`;
    
    // Remove existing favicons
    const existingFavicons = document.querySelectorAll("link[rel*='icon']");
    existingFavicons.forEach(icon => icon.remove());
    
    // Add new favicon
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    link.href = favicon;
    document.head.appendChild(link);
    
    // Also update the page title
    document.title = 'Epic MC - Minecraft Server';
  }, []);

  return null;
}
