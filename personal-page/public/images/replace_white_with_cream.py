from PIL import Image

# Load your image (update the filename if needed)
img = Image.open('Stockman.jpg').convert('RGB')

# Cream color (hex #F7F3EB)
cream = (247, 243, 235)

# Replace white pixels with cream
newData = []
for item in img.getdata():
    # Detect white (tolerance can be adjusted)
    if item[0] > 240 and item[1] > 240 and item[2] > 240:
        newData.append(cream)
    else:
        newData.append(item)
img.putdata(newData)
img.save('Stockman_cream.jpg')
print("Saved as Stockman_cream.jpg") 