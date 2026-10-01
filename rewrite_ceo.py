import re

with open('/home/nayan-linux/Developer/DDSE_Site/src/ceo.html', 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = '<div class="route-year-panels" id="route-year-panels">'
end_marker = '      </div>\n    </section>\n\n    \n    <section class="section-alt">'

idx_start = content.find(start_marker)
idx_end = content.find(end_marker, idx_start)

if idx_start == -1 or idx_end == -1:
    print("Markers not found! start:", idx_start, "end:", idx_end)
    exit(1)

new_panels = """<div class="route-year-panels" id="route-year-panels">
          <div class="route-year-panel active" data-year="2022">
            <div class="route-country-grid">
              <div class="route-country-card">
                <div class="route-country-info">
                  <h4>India <span class="route-country-year">2022</span></h4>
                  <p>A first look at how a neighbouring, rapidly scaling infrastructure market approaches large-scale topographic and cadastral survey.</p>
                </div>
                <div class="tour-slider" data-autoplay="5000">
                  <div class="tour-slider-track">
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2022%20India/india_2022_01.png" alt="Md. Ibrahim Akond in India, 2022" loading="lazy"></div>
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2022%20India/india_2022_02.jpg" alt="Md. Ibrahim Akond in India, 2022" loading="lazy"></div>
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2022%20India/india_2022_03.jpg" alt="Md. Ibrahim Akond in India, 2022" loading="lazy"></div>
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2022%20India/india_2022_04.jpg" alt="Md. Ibrahim Akond in India, 2022" loading="lazy"></div>
                  </div>
                  <button class="tour-slider-prev" aria-label="Previous">&#10094;</button>
                  <button class="tour-slider-next" aria-label="Next">&#10095;</button>
                  <div class="tour-slider-dots"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="route-year-panel" data-year="2023">
            <div class="route-country-grid">
              <div class="route-country-card">
                <div class="route-country-info">
                  <h4>Singapore <span class="route-country-year">2023</span></h4>
                  <p>Singapore runs one of the world's most tightly integrated GNSS reference networks.</p>
                </div>
                <div class="tour-slider" data-autoplay="5000">
                  <div class="tour-slider-track">
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2023%20Singapore/singpore_2023_01.png" alt="Md. Ibrahim Akond in Singapore, 2023" loading="lazy"></div>
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2023%20Singapore/singpore_2023_02.png" alt="Md. Ibrahim Akond in Singapore, 2023" loading="lazy"></div>
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2023%20Singapore/singpore_2023_03.png" alt="Md. Ibrahim Akond in Singapore, 2023" loading="lazy"></div>
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2023%20Singapore/singpore_2023_04.png" alt="Md. Ibrahim Akond in Singapore, 2023" loading="lazy"></div>
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2023%20Singapore/singpore_2023_05.jpg" alt="Md. Ibrahim Akond in Singapore, 2023" loading="lazy"></div>
                  </div>
                  <button class="tour-slider-prev" aria-label="Previous">&#10094;</button>
                  <button class="tour-slider-next" aria-label="Next">&#10095;</button>
                  <div class="tour-slider-dots"></div>
                </div>
              </div>
              <div class="route-country-card">
                <div class="route-country-info">
                  <h4>Malaysia <span class="route-country-year">2023</span></h4>
                  <p>A close look at how Malaysian survey practice blends UAV mapping into everyday topographic work — since adopted into DDSE's own drone survey process.</p>
                </div>
                <div class="tour-slider" data-autoplay="5000">
                  <div class="tour-slider-track">
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2023%20Malaysia/malaysia_2023_01.jpg" alt="Md. Ibrahim Akond in Malaysia, 2023" loading="lazy"></div>
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2023%20Malaysia/malaysia_2023_02.png" alt="Md. Ibrahim Akond in Malaysia, 2023" loading="lazy"></div>
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2023%20Malaysia/malaysia_2023_03.png" alt="Md. Ibrahim Akond in Malaysia, 2023" loading="lazy"></div>
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2023%20Malaysia/malaysia_2023_04.png" alt="Md. Ibrahim Akond in Malaysia, 2023" loading="lazy"></div>
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2023%20Malaysia/malaysia_2023_05.jpg" alt="Md. Ibrahim Akond in Malaysia, 2023" loading="lazy"></div>
                  </div>
                  <button class="tour-slider-prev" aria-label="Previous">&#10094;</button>
                  <button class="tour-slider-next" aria-label="Next">&#10095;</button>
                  <div class="tour-slider-dots"></div>
                </div>
              </div>
              <div class="route-country-card">
                <div class="route-country-info">
                  <h4>Thailand <span class="route-country-year">2023</span></h4>
                  <p>Exposure to Thailand's approach to flood-prone terrain and hydrographic charting — directly relevant to DDSE's bathymetric survey work along Bangladesh's rivers.</p>
                </div>
                <div class="tour-slider" data-autoplay="5000">
                  <div class="tour-slider-track">
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2023%20Thailand/thailand_2023_01.jpg" alt="Md. Ibrahim Akond in Thailand, 2023" loading="lazy"></div>
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2023%20Thailand/thailand_2023_02.jpg" alt="Md. Ibrahim Akond in Thailand, 2023" loading="lazy"></div>
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2023%20Thailand/thailand_2023_03.jpg" alt="Md. Ibrahim Akond in Thailand, 2023" loading="lazy"></div>
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2023%20Thailand/thailand_2023_04.jpg" alt="Md. Ibrahim Akond in Thailand, 2023" loading="lazy"></div>
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2023%20Thailand/thailand_2023_05.jpg" alt="Md. Ibrahim Akond in Thailand, 2023" loading="lazy"></div>
                  </div>
                  <button class="tour-slider-prev" aria-label="Previous">&#10094;</button>
                  <button class="tour-slider-next" aria-label="Next">&#10095;</button>
                  <div class="tour-slider-dots"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="route-year-panel" data-year="2024">
            <div class="route-country-grid">
              <div class="route-country-card">
                <div class="route-country-info">
                  <h4>Cambodia <span class="route-country-year">2024</span></h4>
                  <p>Time studying land administration and boundary survey practice.</p>
                </div>
                <div class="tour-slider" data-autoplay="5000">
                  <div class="tour-slider-track">
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2024%20Cambodia/cambodia_2024_01.png" alt="Md. Ibrahim Akond in Cambodia, 2024" loading="lazy"></div>
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2024%20Cambodia/cambodia_2024_02.png" alt="Md. Ibrahim Akond in Cambodia, 2024" loading="lazy"></div>
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2024%20Cambodia/cambodia_2024_03.png" alt="Md. Ibrahim Akond in Cambodia, 2024" loading="lazy"></div>
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2024%20Cambodia/cambodia_2024_04.png" alt="Md. Ibrahim Akond in Cambodia, 2024" loading="lazy"></div>
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2024%20Cambodia/cambodia_2024_05.png" alt="Md. Ibrahim Akond in Cambodia, 2024" loading="lazy"></div>
                  </div>
                  <button class="tour-slider-prev" aria-label="Previous">&#10094;</button>
                  <button class="tour-slider-next" aria-label="Next">&#10095;</button>
                  <div class="tour-slider-dots"></div>
                </div>
              </div>
              <div class="route-country-card">
                <div class="route-country-info">
                  <h4>Vietnam <span class="route-country-year">2024</span></h4>
                  <p>A look at Vietnam's fast-moving highway and bridge programmes, and the survey standards keeping pace with that scale of construction.</p>
                </div>
                <div class="tour-slider" data-autoplay="5000">
                  <div class="tour-slider-track">
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2024%20Vietnam/vietnam_2024_01.png" alt="Md. Ibrahim Akond in Vietnam, 2024" loading="lazy"></div>
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2024%20Vietnam/vietnam_2024_02.png" alt="Md. Ibrahim Akond in Vietnam, 2024" loading="lazy"></div>
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2024%20Vietnam/vietnam_2024_03.png" alt="Md. Ibrahim Akond in Vietnam, 2024" loading="lazy"></div>
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2024%20Vietnam/vietnam_2024_04.png" alt="Md. Ibrahim Akond in Vietnam, 2024" loading="lazy"></div>
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2024%20Vietnam/vietnam_2024_05.png" alt="Md. Ibrahim Akond in Vietnam, 2024" loading="lazy"></div>
                  </div>
                  <button class="tour-slider-prev" aria-label="Previous">&#10094;</button>
                  <button class="tour-slider-next" aria-label="Next">&#10095;</button>
                  <div class="tour-slider-dots"></div>
                </div>
              </div>
              <div class="route-country-card">
                <div class="route-country-info">
                  <h4>Laos <span class="route-country-year">2024</span></h4>
                  <p>Field exposure to geotechnical practice in mountainous, less-surveyed terrain — informing how DDSE approaches soil investigation in difficult-access sites.</p>
                </div>
                <div class="tour-slider" data-autoplay="5000">
                  <div class="tour-slider-track">
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2024%20Laos/laos_2024_01.png" alt="Md. Ibrahim Akond in Laos, 2024" loading="lazy"></div>
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2024%20Laos/laos_2024_02.png" alt="Md. Ibrahim Akond in Laos, 2024" loading="lazy"></div>
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2024%20Laos/laos_2024_03.png" alt="Md. Ibrahim Akond in Laos, 2024" loading="lazy"></div>
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2024%20Laos/laos_2024_04.png" alt="Md. Ibrahim Akond in Laos, 2024" loading="lazy"></div>
                  </div>
                  <button class="tour-slider-prev" aria-label="Previous">&#10094;</button>
                  <button class="tour-slider-next" aria-label="Next">&#10095;</button>
                  <div class="tour-slider-dots"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="route-year-panel" data-year="2025">
            <div class="route-country-grid">
              <div class="route-country-card">
                <div class="route-country-info">
                  <h4>Egypt <span class="route-country-year">2025</span></h4>
                  <p>Nile floodplain measurement is one of the earliest recorded uses of applied surveying anywhere in the world.</p>
                </div>
                <div class="tour-slider" data-autoplay="5000">
                  <div class="tour-slider-track">
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2025%20Egypt/egypt_2025_01.jpg" alt="Md. Ibrahim Akond in Egypt, 2025" loading="lazy"></div>
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2025%20Egypt/egypt_2025_02.jpg" alt="Md. Ibrahim Akond in Egypt, 2025" loading="lazy"></div>
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2025%20Egypt/egypt_2025_03.jpg" alt="Md. Ibrahim Akond in Egypt, 2025" loading="lazy"></div>
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2025%20Egypt/egypt_2025_04.jpg" alt="Md. Ibrahim Akond in Egypt, 2025" loading="lazy"></div>
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2025%20Egypt/egypt_2025_05.jpg" alt="Md. Ibrahim Akond in Egypt, 2025" loading="lazy"></div>
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2025%20Egypt/egypt_2025_06.jpg" alt="Md. Ibrahim Akond in Egypt, 2025" loading="lazy"></div>
                    <div class="tour-slide"><img src="assets/images/ddse_gallery/CEO/International%20Tours/2025%20Egypt/egypt_2025_07.jpg" alt="Md. Ibrahim Akond in Egypt, 2025" loading="lazy"></div>
                  </div>
                  <button class="tour-slider-prev" aria-label="Previous">&#10094;</button>
                  <button class="tour-slider-next" aria-label="Next">&#10095;</button>
                  <div class="tour-slider-dots"></div>
                </div>
              </div>
            </div>
          </div>
"""

new_content = content[:idx_start] + new_panels + content[idx_end:]

with open('/home/nayan-linux/Developer/DDSE_Site/src/ceo.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

