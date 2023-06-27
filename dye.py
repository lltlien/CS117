from PIL import Image
import numpy as np
from io import BytesIO
from HairDye import HairDye

def dye_hair(image_path, color):
    # Load the image
    pil_image = Image.open(image_path)
    if pil_image.format == "PNG":
        pil_image = pil_image.convert("RGB")
    numpy_image = np.array(pil_image)

    # Pass the color and image to the HairDye model
    hair_dye = HairDye()
    result_image = hair_dye.predict(numpy_image, color)

    # Convert the result image back to PIL Image
    result_pil_image = Image.fromarray(result_image)

    # Display the result image
    result_pil_image.show()

if __name__ == '__main__':
    image_path = 'image/test2.png'  # Replace with the path to your input image
    color = "#4286bd" # Replace with the desired hair color
    dye_hair(image_path, color)
