import glob
import re

for filepath in glob.glob('src/*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace nav-logo
    nav_pattern = r'<div class="nav-logo-icon">D</div>'
    nav_replacement = '<img src="assets/images/logo.png" alt="DDSE Logo" class="nav-logo-img">'
    content = re.sub(nav_pattern, nav_replacement, content)
    
    # Replace footer-logo
    footer_pattern = r'<div class="footer-logo-icon">D</div>'
    footer_replacement = '<img src="assets/images/logo.png" alt="DDSE Logo" class="footer-logo-img">'
    content = re.sub(footer_pattern, footer_replacement, content)
    
    # Also replace loader logo
    loader_pattern = r'<div class="loader-logo">DD<span>SE</span></div>'
    loader_replacement = '<img src="assets/images/logo.png" alt="DDSE Logo" class="loader-logo-img">'
    content = re.sub(loader_pattern, loader_replacement, content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Updated logos in all html files.")
