from PIL import Image

def remove_background(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    # Analyze corner pixel color
    corner_pixel = data[0]
    print("Corner pixel color:", corner_pixel)
    
    new_data = []
    for item in data:
        # Check if the pixel is near the light gray card backdrop color
        # Light gray background in the PNG: R > 230, G > 232, B > 235
        r, g, b, a = item
        
        # Calculate color distance to the light gray background (approx RGB 240, 243, 246)
        if r >= 225 and g >= 228 and b >= 232 and abs(r - g) < 15 and abs(g - b) < 15:
            # Make transparent
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print("Saved transparent PNG to:", output_path)

if __name__ == "__main__":
    remove_background("public/emlinked/home/FiscaleOptimalisatie_Box3.png", "public/emlinked/home/FiscaleOptimalisatie_Box3_Transparent.png")
