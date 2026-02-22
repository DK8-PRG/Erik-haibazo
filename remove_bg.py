#!/usr/bin/env python3
"""
Skript pro odstranění pozadí z obrázků a vytvoření SVG
"""
import os
from pathlib import Path
from rembg import remove
from PIL import Image
import base64
import io

def remove_background(input_path, output_path):
    """Odstraní pozadí z obrázku"""
    print(f"Zpracovávám: {input_path}")
    
    # Načtení obrázku
    with open(input_path, 'rb') as input_file:
        input_data = input_file.read()
    
    # Odstranění pozadí
    output_data = remove(input_data)
    
    # Uložení jako PNG s průhledností
    with open(output_path, 'wb') as output_file:
        output_file.write(output_data)
    
    print(f"Uloženo do: {output_path}")
    return output_path

def create_svg_with_image(png_path, svg_path):
    """Vytvoří SVG soubor s vloženým PNG obrázkem"""
    # Načtení PNG obrázku
    img = Image.open(png_path)
    width, height = img.size
    
    # Konverze do base64
    buffered = io.BytesIO()
    img.save(buffered, format="PNG")
    img_base64 = base64.b64encode(buffered.getvalue()).decode()
    
    # Vytvoření SVG
    svg_content = f'''<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="{width}" height="{height}" 
     viewBox="0 0 {width} {height}"
     xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink">
  <image width="{width}" height="{height}" 
         xlink:href="data:image/png;base64,{img_base64}"/>
</svg>'''
    
    # Uložení SVG
    with open(svg_path, 'w', encoding='utf-8') as f:
        f.write(svg_content)
    
    print(f"SVG uloženo do: {svg_path}")

def main():
    # Cesty
    images_dir = Path("public/images")
    output_dir = Path("public/images/no-bg")
    output_dir.mkdir(exist_ok=True)
    
    # Seznam obrázků ke zpracování
    images = [
        "footer.jpeg",  # bambusové pozadí
        "erik-logo.jpeg"  # logo Erik Haibazo
    ]
    
    for image_name in images:
        input_path = images_dir / image_name
        
        if not input_path.exists():
            print(f"Soubor nenalezen: {input_path}")
            continue
        
        # Název bez přípony
        base_name = input_path.stem
        
        # Cesty pro výstup
        png_output = output_dir / f"{base_name}-no-bg.png"
        svg_output = output_dir / f"{base_name}.svg"
        
        # Odstranění pozadí
        remove_background(str(input_path), str(png_output))
        
        # Vytvoření SVG
        create_svg_with_image(str(png_output), str(svg_output))
        
        print(f"✓ Hotovo pro {image_name}\n")
    
    print("Všechny obrázky zpracovány!")
    print(f"Najdete je v: {output_dir}")

if __name__ == "__main__":
    main()
