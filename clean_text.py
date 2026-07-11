import glob
import re

for filepath in glob.glob('src/*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove em-dashes in headings/paragraphs
    content = content.replace(" — ", " ")
    content = content.replace("— ", " ")
    content = content.replace(" —", " ")
    
    # Remove AI-generated sounding Bengali spans/small tags from stats and headings
    content = re.sub(r'<small class="bangla-text".*?</small>', '', content)
    content = re.sub(r'<span class="bangla-text".*?</span>', '', content)
    content = re.sub(r'<p class="hero-bangla bangla-text".*?</p>', '', content)
    content = re.sub(r'<p class="bangla-text".*?</p>', '', content)
    
    # Restore the footer bangla text which is actually good
    # Wait, the footer bangla was <p class="footer-bangla bangla-text">ডাইমেনশন ডিজিটাল সার্ভে অ্যান্ড ইঞ্জিনিয়ারিং</p>
    # The regex might have caught it. Let's fix that.
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Text cleaned.")
