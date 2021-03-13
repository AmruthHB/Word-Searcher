# -*- coding: utf-8 -*-
"""
Created on Fri Feb 19 19:17:49 2021

@author: amrut
"""

from ml_pipeline import ImageDataTransform
import pytesseract
import base64
import cv2
import io
import numpy as np
#import cv2
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract'

class ImageToGrid:
    
    def __init__(self,image,height,width,words):
        self.image = None
        self.image_b64 = image
        self.height = height
        self.width = width
        self.words = words
        self.grid = None
    
    
    def form_word_grid(self):
        self.decode_image()
        self.init_grid_holder()
        self.process_grid()
        
    def decode_image(self):
        #string_buffer = io.StringIO()
        #string_buffer.write(base64.b64decode(self.image_b64))
        #real_im = cv2.imread(string_buffer)
        #self.image =  cv2.cvtColor(np.array(real_im), cv2.COLOR_RGB2BGR)
        encoded_data = self.image_b64.split(',')[1]
        nparr = np.fromstring(base64.b64decode(encoded_data), np.uint8)
        self.image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
   
        
    def detect_letter(self,image):
        smooth = cv2.GaussianBlur(image,(3,3),0) 
        kernel = np.ones((2,2), np.uint8) 
        better_edge = cv2.dilate(image, kernel, iterations=1) 
        letter = pytesseract.image_to_string(image,
                 lang = 'eng',config ="--psm 10 --oem 3")
        let_result = letter[0]
        return let_result.lower()
        
    def init_grid_holder(self):
        self.grid = [[' ' for i in range(self.width)] 
                        for j in range(self.height)]
        
    def process_grid(self):
        transformer = ImageDataTransform(self.image)
        proc_grid = transformer.preprocess(transformer.img)
        h,w = proc_grid.shape
        cell_height = h//self.height
        cell_width = w//self.width
        #h_shear = round(0.1*cell_height)
        #w_shear = round(0.1 * cell_width)
        height_dims = [i*cell_height for i in range(self.height+1)]
        width_dims = [i*cell_width for i in range(self.width+1)]
        print(height_dims)
        print(width_dims)
        for i in range(len(height_dims)-1):
            for j in range(len(width_dims)-1):
                hs,he = height_dims[i],height_dims[i+1] 
                ws,we = width_dims[j],width_dims[j+1]
                self.grid[i][j] = self.detect_letter(proc_grid[hs:he,
                                                               ws:we])
        print(self.grid)
                

          
        
        
        
        
        