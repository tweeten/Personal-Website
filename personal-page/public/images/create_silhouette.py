from PIL import Image, ImageFilter, ImageOps
import numpy as np

def create_silhouette(input_image_path, output_light_path, output_dark_path):
    """
    Create silhouette versions of the Stockman house for light and dark modes.
    
    Args:
        input_image_path: Path to the original Stockman house image
        output_light_path: Path to save the light mode silhouette
        output_dark_path: Path to save the dark mode silhouette
    """
    
    # Load the image
    img = Image.open(input_image_path).convert('RGB')
    
    # Convert to grayscale for edge detection
    gray = img.convert('L')
    
    # Apply edge detection to find the house outline
    edges = gray.filter(ImageFilter.FIND_EDGES)
    
    # Enhance the edges
    edges = edges.filter(ImageFilter.EDGE_ENHANCE_MORE)
    
    # Threshold to create a binary mask of the house
    threshold = 30
    binary = edges.point(lambda x: 255 if x > threshold else 0)
    
    # Create a mask for the house area
    # We'll use morphological operations to fill in the house
    from PIL import ImageMorph
    
    # Create a larger kernel to fill gaps
    kernel = np.ones((3, 3), np.uint8)
    
    # Convert PIL image to numpy array for morphological operations
    binary_array = np.array(binary)
    
    # Use scipy for morphological operations if available
    try:
        from scipy import ndimage
        
        # Close gaps in the house outline
        closed = ndimage.binary_closing(binary_array, structure=kernel)
        
        # Fill holes inside the house
        filled = ndimage.binary_fill_holes(closed)
        
        # Create a smooth outline
        outline = ndimage.binary_erosion(filled, structure=kernel)
        outline = filled ^ outline
        
    except ImportError:
        # Fallback if scipy is not available
        print("scipy not available, using basic operations")
        filled = binary_array
        outline = binary_array
    
    # Convert back to PIL Image
    house_mask = Image.fromarray(filled.astype(np.uint8) * 255)
    house_outline = Image.fromarray(outline.astype(np.uint8) * 255)
    
    # Create light mode silhouette (black house on light background)
    light_bg = Image.new('RGB', img.size, (247, 243, 235))  # Light beige background
    light_silhouette = light_bg.copy()
    
    # Paste the house outline in black
    black_house = Image.new('RGB', img.size, (0, 0, 0))
    light_silhouette.paste(black_house, mask=house_outline)
    
    # Create dark mode silhouette (white house on dark background)
    dark_bg = Image.new('RGB', img.size, (30, 30, 30))  # Dark background
    dark_silhouette = dark_bg.copy()
    
    # Paste the house outline in white
    white_house = Image.new('RGB', img.size, (255, 255, 255))
    dark_silhouette.paste(white_house, mask=house_outline)
    
    # Save the results
    light_silhouette.save(output_light_path)
    dark_silhouette.save(output_dark_path)
    
    print(f"Light mode silhouette saved as: {output_light_path}")
    print(f"Dark mode silhouette saved as: {output_dark_path}")

def create_house_only_silhouette(input_image_path, output_light_path, output_dark_path):
    """
    Create silhouette with ONLY the house structure, removing trees and foreground.
    """
    
    # Load the image
    img = Image.open(input_image_path).convert('RGB')
    
    # Convert to grayscale for edge detection
    gray = img.convert('L')
    
    # Apply edge detection to find all edges
    edges = gray.filter(ImageFilter.FIND_EDGES)
    edges = edges.filter(ImageFilter.EDGE_ENHANCE_MORE)
    
    # Create a more sophisticated mask focusing on the house
    # We'll use multiple techniques to isolate just the house
    
    # Method 1: Color-based segmentation for house materials
    hsv = img.convert('HSV')
    h, s, v = hsv.split()
    
    h_data = np.array(h)
    s_data = np.array(s)
    v_data = np.array(v)
    
    # House typically has specific color characteristics
    # Roof and walls usually have lower saturation and specific hue ranges
    house_color_mask = (
        (s_data < 80) &  # Low saturation for house materials
        (v_data > 40) & (v_data < 180) &  # Medium value range
        ((h_data > 10) & (h_data < 50)) |  # Warm tones for house
        ((h_data > 100) & (h_data < 140))  # Cool tones for some house parts
    )
    
    # Method 2: Geometric shape detection
    # House has more rectangular/geometric shapes than trees
    
    # Apply different filters to detect geometric vs organic shapes
    blur = gray.filter(ImageFilter.GaussianBlur(radius=2))
    sharp = gray.filter(ImageFilter.UnsharpMask(radius=2, percent=150))
    
    # Combine edge detection with color mask
    edge_array = np.array(edges)
    edge_threshold = 30
    edge_mask = edge_array > edge_threshold
    
    # Combine masks - focus on areas that are both geometric and have house colors
    combined_mask = house_color_mask & edge_mask
    
    # Apply morphological operations to clean up and isolate house
    try:
        from scipy import ndimage
        
        # Use larger kernel to connect house parts and remove small tree elements
        kernel = np.ones((7, 7), np.uint8)
        
        # Close gaps in house structure
        closed = ndimage.binary_closing(combined_mask, structure=kernel)
        
        # Fill holes inside house
        filled = ndimage.binary_fill_holes(closed)
        
        # Remove small isolated regions (likely trees/bushes)
        labeled, num_features = ndimage.label(filled)
        sizes = ndimage.sum(filled, labeled, range(1, num_features + 1))
        
        # Keep only large connected regions (house structure)
        min_size = 500  # Adjust this threshold based on your image
        mask = sizes >= min_size
        house_only = mask[labeled]
        
        # Create smooth outline
        outline = ndimage.binary_erosion(house_only, structure=kernel)
        outline = house_only ^ outline
        
        house_mask = Image.fromarray(house_only.astype(np.uint8) * 255)
        house_outline = Image.fromarray(outline.astype(np.uint8) * 255)
        
    except ImportError:
        # Fallback if scipy is not available
        print("scipy not available, using basic operations")
        house_mask = Image.fromarray(combined_mask.astype(np.uint8) * 255)
        house_outline = house_mask
    
    # Create light mode (black house on light background)
    light_bg = Image.new('RGB', img.size, (247, 243, 235))  # Light beige
    light_silhouette = light_bg.copy()
    black_house = Image.new('RGB', img.size, (0, 0, 0))
    light_silhouette.paste(black_house, mask=house_outline)
    
    # Create dark mode (white house on dark background)
    dark_bg = Image.new('RGB', img.size, (30, 30, 30))  # Dark background
    dark_silhouette = dark_bg.copy()
    white_house = Image.new('RGB', img.size, (255, 255, 255))
    dark_silhouette.paste(white_house, mask=house_outline)
    
    # Save results
    light_silhouette.save(output_light_path)
    dark_silhouette.save(output_dark_path)
    
    print(f"House-only light mode silhouette saved as: {output_light_path}")
    print(f"House-only dark mode silhouette saved as: {output_dark_path}")

def create_advanced_silhouette(input_image_path, output_light_path, output_dark_path):
    """
    Advanced silhouette creation with better house detection.
    """
    
    # Load the image
    img = Image.open(input_image_path).convert('RGB')
    
    # Convert to HSV for better color-based segmentation
    hsv = img.convert('HSV')
    h, s, v = hsv.split()
    
    # Create a mask based on color characteristics of the house
    # The house likely has lower saturation and specific hue values
    house_mask = Image.new('L', img.size, 0)
    
    # Get pixel data
    h_data = np.array(h)
    s_data = np.array(s)
    v_data = np.array(v)
    
    # Create mask for house areas (adjust these thresholds based on your image)
    # House typically has lower saturation and medium value
    house_pixels = (s_data < 100) & (v_data > 50) & (v_data < 200)
    
    # Convert to PIL Image
    house_mask_array = house_pixels.astype(np.uint8) * 255
    house_mask = Image.fromarray(house_mask_array)
    
    # Apply morphological operations to clean up the mask
    try:
        from scipy import ndimage
        
        # Close gaps and fill holes
        kernel = np.ones((5, 5), np.uint8)
        cleaned = ndimage.binary_closing(house_mask_array, structure=kernel)
        cleaned = ndimage.binary_fill_holes(cleaned)
        
        # Create outline
        outline = ndimage.binary_erosion(cleaned, structure=kernel)
        outline = cleaned ^ outline
        
        house_mask = Image.fromarray(cleaned.astype(np.uint8) * 255)
        house_outline = Image.fromarray(outline.astype(np.uint8) * 255)
        
    except ImportError:
        house_outline = house_mask
    
    # Create light mode (black house on light background)
    light_bg = Image.new('RGB', img.size, (247, 243, 235))  # Light beige
    light_silhouette = light_bg.copy()
    black_house = Image.new('RGB', img.size, (0, 0, 0))
    light_silhouette.paste(black_house, mask=house_outline)
    
    # Create dark mode (white house on dark background)
    dark_bg = Image.new('RGB', img.size, (30, 30, 30))  # Dark background
    dark_silhouette = dark_bg.copy()
    white_house = Image.new('RGB', img.size, (255, 255, 255))
    dark_silhouette.paste(white_house, mask=house_outline)
    
    # Save results
    light_silhouette.save(output_light_path)
    dark_silhouette.save(output_dark_path)
    
    print(f"Advanced light mode silhouette saved as: {output_light_path}")
    print(f"Advanced dark mode silhouette saved as: {output_dark_path}")

if __name__ == "__main__":
    # Create silhouettes from the original Stockman image
    create_silhouette(
        'Stockman.jpg',
        'Stockman_silhouette_light.png',
        'Stockman_silhouette_dark.png'
    )
    
    # Also try the advanced method
    create_advanced_silhouette(
        'Stockman.jpg',
        'Stockman_silhouette_light_advanced.png',
        'Stockman_silhouette_dark_advanced.png'
    )
    
    # Create house-only silhouettes (no trees/foreground)
    create_house_only_silhouette(
        'Stockman.jpg',
        'Stockman_house_only_light.png',
        'Stockman_house_only_dark.png'
    ) 