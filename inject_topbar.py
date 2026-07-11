import glob
import re

topbar_html = """  <header>
    <div class="topbar">
      <div class="container flex-between">
        <div class="topbar-left" style="display:flex;gap:15px">
          <span>📞 01754-012596</span>
          <span>✉️ ddsebd52454@gmail.com</span>
        </div>
        <div class="topbar-right">
          <span>📍 Barisal & Dhaka, Bangladesh</span>
        </div>
      </div>
    </div>"""

for filepath in glob.glob('src/*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '<div class="topbar">' not in content:
        content = content.replace('<header>', topbar_html)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

print("Topbar injected.")
