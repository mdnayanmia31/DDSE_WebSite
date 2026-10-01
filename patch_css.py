import re

with open('/home/nayan-linux/Developer/DDSE_Site/src/css/components.css', 'r') as f:
    content = f.read()

# Remove .route-slider styles
content = re.sub(r'\.route-slider\s*{[^}]*}', '', content)
content = re.sub(r'\.route-slider::-webkit-scrollbar\s*{[^}]*}', '', content)
content = re.sub(r'\.route-slider::-webkit-scrollbar-thumb\s*{[^}]*}', '', content)
content = re.sub(r'\.route-slider::-webkit-scrollbar-track\s*{[^}]*}', '', content)

with open('/home/nayan-linux/Developer/DDSE_Site/src/css/components.css', 'w') as f:
    f.write(content)
