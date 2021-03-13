# -*- coding: utf-8 -*-
"""
Created on Fri Feb 19 19:21:52 2021

@author: amrut
"""




from image_to_grid import ImageToGrid
from flask import Flask
from flask_restful import reqparse, abort, Api, Resource,request
import json
import sys
app = Flask(__name__)
api = Api(app)

#https://towardsdatascience.com/deploying-a-machine-learning-model-as-a-rest-api-4a03b865c166
parser = reqparse.RequestParser()
parser.add_argument('query')

class dummy_test(Resource):
    def post(self):
        #args = parser.parse_args()
        user_query = request.get_json('application/json')
        print(user_query['gHeight'], file=sys.stderr)
        transformer = ImageToGrid(user_query['img'],user_query['gHeight'],
                                  user_query['gWidth'],user_query['search'])
        transformer.form_word_grid()
        word_grid = transformer.grid
        
        print(word_grid, file=sys.stderr)

        #print(user_query)
       
        return user_query

api.add_resource(dummy_test, '/')

if __name__ == '__main__':
    app.run(debug=False)
        