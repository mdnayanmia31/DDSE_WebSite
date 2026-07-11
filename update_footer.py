import os
import glob
import re

fb_svg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>'
wa_svg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>'

social_html = f'<div class="social-links" style="margin-top:1.5rem;display:flex;gap:1.5rem;"><a href="#" target="_blank" title="Facebook Page" style="color:var(--text-light);transition:color 0.3s ease;" onmouseover="this.style.color=\'var(--gold)\'" onmouseout="this.style.color=\'var(--text-light)\'">{fb_svg}</a><a href="https://wa.me/8801754012596" target="_blank" title="WhatsApp Us" style="color:var(--text-light);transition:color 0.3s ease;" onmouseover="this.style.color=\'var(--gold)\'" onmouseout="this.style.color=\'var(--text-light)\'">{wa_svg}</a></div>'

for filepath in glob.glob('src/*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    def replace_func(match):
        inner = match.group(1)
        if 'social-links' in inner:
            return match.group(0)
        return f'<div class="footer-col"><h4>Contact</h4>{inner}{social_html}</div>'
        
    new_content = re.sub(r'<div class="footer-col"><h4>Contact</h4>(.*?)</div>', replace_func, content, flags=re.DOTALL)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

print("Updated footers")
