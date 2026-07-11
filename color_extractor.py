from PIL import Image
from collections import Counter

img = Image.open('src/assets/images/logo.png').convert('RGBA')
pixels = img.getdata()
colors = []

for r, g, b, a in pixels:
    if a > 10:  # ignore transparent pixels
        # simple rounding to group similar colors
        colors.append((r//20*20, g//20*20, b//20*20))

counts = Counter(colors)
print("Dominant colors (R, G, B):")
for color, count in counts.most_common(10):
    hex_color = "#{:02x}{:02x}{:02x}".format(color[0], color[1], color[2])
    print(f"{hex_color} - count: {count}")
