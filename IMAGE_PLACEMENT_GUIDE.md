# NaatuMithra Image Placement Guide 📸

## Directory Structure

Create the following directory structure in your frontend:

```
src/frontend/public/images/
├── food/                    # Food dish images
│   ├── benne_dosa.png
│   ├── vada_pav.png
│   ├── chole_bhature.png
│   ├── idli_sambar.png
│   ├── puchka.png
│   ├── biryani.png
│   ├── misal_pav.png
│   ├── dhokla.png
│   ├── dal_baati_churma.png
│   ├── appam_stew.png
│   ├── tunday_kabab.png
│   ├── banarasi_paan.png
│   ├── amritsari_kulcha.png
│   ├── poha_jalebi.png
│   ├── tirunelveli_halwa.png
│   ├── annapoorna_sambar.png
│   ├── puliyodharai.png
│   ├── jigarthanda.png
│   ├── pazhampori.png
│   └── paneer_tikka.png
│
└── (existing heritage images)
    ├── bangalore.png
    ├── mumbai.png
    ├── delhi.png
    ├── chennai.png
    ├── kolkata.png
    ├── hyderabad.png
    ├── pune.png
    ├── ahmedabad.png
    ├── jaipur.png
    ├── kochi.png
    ├── lucknow.png
    ├── varanasi.png
    ├── chandigarh.png
    ├── amritsar.png
    ├── indore.png
    ├── tirunelveli.png
    ├── coimbatore.png
    ├── trichy.png
    ├── madurai.png
    ├── trivandrum.png
    ├── surat.png          # NEW - Add these 10
    ├── nagpur.png         # NEW
    ├── vizag.png          # NEW
    ├── patna.png          # NEW
    ├── bhopal.png         # NEW
    ├── thane.png          # NEW
    ├── ludhiana.png       # NEW
    ├── agra.png           # NEW
    ├── nashik.png         # NEW
    └── faridabad.png      # NEW
```

## Step-by-Step Instructions

### 1. Create the Food Images Directory

```bash
# From your project root
cd src/frontend/public/images
mkdir food
```

### 2. Generate Food Images

Use the prompts from `IMAGE_GENERATION_PROMPTS.md` to generate the 20 food images:

**Using DALL-E / Midjourney / Stable Diffusion:**
1. Copy each food prompt from the IMAGE_GENERATION_PROMPTS.md
2. Generate the image
3. Download and save with the exact filename shown above
4. Recommended dimensions: **1024x1024** (square format for food cards)

### 3. Generate Missing Heritage Images

Generate the 10 missing heritage site images:
- surat.png
- nagpur.png
- vizag.png
- patna.png
- bhopal.png
- thane.png
- ludhiana.png
- agra.png
- nashik.png
- faridabad.png

**Recommended dimensions: 1024x1280** (4:5 portrait for heritage cards)

### 4. Place Images in Correct Directories

```bash
# Food images go here:
src/frontend/public/images/food/

# Heritage images go here:
src/frontend/public/images/
```

### 5. Optimize Images for Web

After placing all images, optimize them:

```bash
# Install optimization tool (if needed)
npm install -g sharp-cli

# Optimize all food images
sharp -i "src/frontend/public/images/food/*.png" -o "src/frontend/public/images/food/" --format webp --quality 85

# Optimize heritage images
sharp -i "src/frontend/public/images/*.png" -o "src/frontend/public/images/" --format webp --quality 85
```

**Alternative**: Use online tools like TinyPNG or Squoosh.app

## Image Specifications

### Food Images
- **Format**: PNG or WebP
- **Dimensions**: 1024x1024 (1:1 square)
- **File Size**: < 200KB (optimized)
- **Style**: Appetizing, vibrant colors, food photography style
- **Angle**: 45-degree or overhead shot

### Heritage Images
- **Format**: PNG or WebP
- **Dimensions**: 1024x1280 (4:5 portrait)
- **File Size**: < 300KB (optimized)
- **Style**: Photorealistic, architectural photography
- **Angle**: Varies by monument (see prompts)

## Quick Reference: File Mapping

### Food Images (FoodMood.jsx)
| Dish Name | Filename | City |
|-----------|----------|------|
| Benne Dosa | `benne_dosa.png` | Bengaluru |
| Vada Pav | `vada_pav.png` | Mumbai |
| Chole Bhature | `chole_bhature.png` | Delhi |
| Idli Sambar | `idli_sambar.png` | Chennai |
| Puchka | `puchka.png` | Kolkata |
| Hyderabadi Biryani | `biryani.png` | Hyderabad |
| Puneri Misal | `misal_pav.png` | Pune |
| Dhokla | `dhokla.png` | Ahmedabad |
| Dal Baati Churma | `dal_baati_churma.png` | Jaipur |
| Appam with Stew | `appam_stew.png` | Kochi |
| Tunday Kabab | `tunday_kabab.png` | Lucknow |
| Banarasi Paan | `banarasi_paan.png` | Varanasi |
| Amritsari Kulcha | `amritsari_kulcha.png` | Amritsar |
| Poha Jalebi | `poha_jalebi.png` | Indore |
| Tirunelveli Halwa | `tirunelveli_halwa.png` | Tirunelveli |
| Annapoorna Sambar | `annapoorna_sambar.png` | Coimbatore |
| Srirangam Puliyodharai | `puliyodharai.png` | Trichy |
| Jigarthanda | `jigarthanda.png` | Madurai |
| Pazhampori | `pazhampori.png` | Trivandrum |
| Paneer Tikka | `paneer_tikka.png` | Chandigarh |

### Heritage Images (HeritageCards.jsx)
| Site Name | Filename | City |
|-----------|----------|------|
| Dumas Beach | `surat.png` | Surat |
| Deekshabhoomi | `nagpur.png` | Nagpur |
| INS Kursura | `vizag.png` | Visakhapatnam |
| Golghar | `patna.png` | Patna |
| Sanchi Stupa | `bhopal.png` | Bhopal |
| Upvan Lake | `thane.png` | Thane |
| Clock Tower | `ludhiana.png` | Ludhiana |
| Taj Mahal | `agra.png` | Agra |
| Panchavati | `nashik.png` | Nashik |
| Surajkund | `faridabad.png` | Faridabad |

## Verification Checklist

After placing all images:

- [ ] All 20 food images are in `src/frontend/public/images/food/`
- [ ] All 30 heritage images are in `src/frontend/public/images/`
- [ ] All images are optimized (< 200-300KB each)
- [ ] All filenames match exactly (case-sensitive)
- [ ] Images are in PNG or WebP format
- [ ] Test the app locally to ensure all images load correctly

## Testing

```bash
# Start the frontend dev server
cd src/frontend
npm run dev

# Navigate to:
# - Food Mood page: Check all 20 food cards display images
# - Heritage Cards page: Check all 30 heritage cards display images
```

## Troubleshooting

**Images not loading?**
1. Check filename spelling (case-sensitive)
2. Verify images are in the correct directory
3. Clear browser cache (Ctrl+Shift+R)
4. Check browser console for 404 errors

**Images too large?**
1. Use TinyPNG.com or Squoosh.app
2. Target < 200KB for food, < 300KB for heritage
3. Convert to WebP format for better compression

---

## Summary

✅ **What's Updated:**
- FoodMood.jsx now uses `/images/food/*.png` instead of placeholders
- HeritageCards.jsx already has all 30 cities with proper image paths

✅ **What You Need to Do:**
1. Create `/images/food/` directory
2. Generate 20 food images using the prompts
3. Generate 10 missing heritage images
4. Place images in correct directories
5. Optimize for web
6. Test locally

All image generation prompts are in `IMAGE_GENERATION_PROMPTS.md`!
