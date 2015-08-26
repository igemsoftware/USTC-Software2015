from PIL import Image
from PIL import ImageFilter
from PIL import ImageOps
from PIL import ImageMath
import numpy as np

def lut(threshold):
    """Generate the lookup table for binarize.
    
    Inputs:
    int: threshold

    Outputs:
    list: [0, 0, ..., 255, 255, ..., 255]"""

    return [255 if i<=threshold else 0 for i in range(256)]

def denoise(pix):

    """Kernel filter.

    Inputs:
    list: pix map

    Outputs:
    list: pix_new map"""
    
    pix_new=pix.copy()
    height=len(pix)
    width=len(pix[0])
    for i in range(1,height-1):
        for j in range(1,width-1):
            if pix[i,j]==0:
                ans=\
                int(pix[i-1,j-1])+\
                int(pix[i-1,j])+\
                int(pix[i-1,j+1])+\
                int(pix[i,j-1])+\
                int(pix[i,j+1])+\
                int(pix[i+1,j-1])+\
                int(pix[i+1,j])+\
                int(pix[i+1,j+1])
                if ans>=3*255:
                    #print "Modefied!(%s,%s)ans=%s"%(i,j,ans)
                    pix_new[i,j]=np.uint8(255)
    return pix_new

def strip_processing(path, blur_radius=7, iter_steps=1, binarize_threshold=10):

    """Strip precessing function.

    Inputs:
    string: path of the image
    blur_radius: radius of gaussian blur
    iter_steps: execution times of denoise
    binarize_threshold: used as function lut's input

    Outputs:
    Image: the processed image."""
    
    gray=ImageOps.invert(ImageOps.grayscale(Image.open("stripes.jpg")))
    gray_blur=gray.filter(ImageFilter.GaussianBlur(blur_radius))
    high_freq=ImageMath.eval("25*(a-b)",a=gray,b=gray_blur).convert("L")

    binarized=ImageOps.invert(high_freq.point(lut(binarize_threshold))).convert("1")
    binarized_data=binarized.load()
    #binarized.show()

    height=binarized.height
    width=binarized.width

    pix=np.array([[np.uint8(binarized_data[j,i]) for j in range(width)] for i in range(height)])

    for i in range(iter_steps):
        pix=denoise(pix)

    answer=Image.fromarray(pix)
    #answer.show()
    #answer.save("test.bmp")
    return answer
#use a image as a test        
#strip_processing("stripes.jpg").show()
