# -*- coding: utf-8 -*-
"""
Created on Fri Feb 19 19:21:52 2021

@author: amrut
"""


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
    def get(self):
        #args = parser.parse_args()
        user_query = request.get_json()
        p = user_query.get('query')
        #args = request.args
        #user_query = args['query']
        
        print(p, file=sys.stderr)
        #print(user_query)
        q = "dinosaur"
        return q

api.add_resource(dummy_test, '/')

if __name__ == '__main__':
    app.run(debug=False)
        