import os
import re

src_dir = 'src'
og_tags = """
  <meta property="og:url" content="https://ddsebd.com/">
  <meta property="og:image" content="https://ddsebd.com/assets/images/logo.png">
"""

for filename in os.listdir(src_dir):
    if not filename.endswith('.html'):
        continue
        
    filepath = os.path.join(src_dir, filename)
    with open(filepath, 'r') as f:
        content = f.read()
        
    # Add OG tags if not present
    if 'og:image' not in content:
        # Insert after <meta property="og:type" content="website">
        # If og:type isn't there, insert before <link rel="icon"
        if '<meta property="og:type"' in content:
            content = re.sub(r'(<meta property="og:type" content="website">)', r'\1' + og_tags, content)
        elif '<link rel="icon"' in content:
            content = re.sub(r'(<link rel="icon")', og_tags.strip() + '\n  ' + r'\1', content)
            
    # Add lang="bn" to bangla-text
    content = re.sub(r'(<span[^>]*class="[^"]*bangla-text[^"]*"[^>]*)>', r'\1 lang="bn">', content)
    # Deduplicate lang="bn" if it was added twice
    content = content.replace(' lang="bn" lang="bn">', ' lang="bn">')
    
    # Remove active class from nav links (excluding cases where we might want it, but Claude said drop them all)
    content = re.sub(r'(<a[^>]*href="[^"]+\.html"[^>]*class="[^"]*)\bactive\b([^"]*"[^>]*>)', r'\1\2', content)
    # Cleanup empty class attributes if they exist
    content = content.replace('class=" "', '')
    content = content.replace('class=""', '')
    
    with open(filepath, 'w') as f:
        f.write(content)
        
print("Successfully updated all HTML files.")
