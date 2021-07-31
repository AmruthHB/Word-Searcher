# Word-Searcher

#### Running Instructions
- Clone the repository
- Install dependencies in requirements.txt
- Run app.py in root of the repository

#### Current Issues
- *Unfortunately, downloading locally requires a cloud vision api key,which needs to be added to the modules folder as a json
-

#### Improvements
 ##### String Search
  - Currently, a naive string search is used to find substrings in a 2d array. This can be sped up.
  - Potential solutions could involve sacrificing space for faster results: storing diagonal, horizontal vertical arrays, and performing substring searches
 
 #### OCR 
  - Most critical part. 
  - Current iteration uses opecv preprocessing and Google OCR which takes 1 min 20s +  to process a 14x14 grid.
  - Other solutions that were attempted to detect letters were tesseract and a simple LeNet model with a training set 900 letters collected from various word-searches with different fonts. Initial iterations were scrapped due to poor performance.
 
 ![](image.png)
 
