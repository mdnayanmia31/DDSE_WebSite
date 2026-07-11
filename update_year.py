import glob
import re

for filepath in glob.glob('src/*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to replace `<p>&copy; 2015–2026 DDSE. All rights reserved.</p>` 
    # with `<p>&copy; 2015–<span id="current-year">2026</span> Dimension Digital Survey & Engineering. All rights reserved.</p>`
    
    new_content = re.sub(
        r'<p>&copy; 2015–\d{4} DDSE\. All rights reserved\.</p>',
        '<p>&copy; 2015–<span id="current-year">2026</span> Dimension Digital Survey &amp; Engineering. All rights reserved.</p>',
        content
    )
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

print("Updated footer year in all html files.")
