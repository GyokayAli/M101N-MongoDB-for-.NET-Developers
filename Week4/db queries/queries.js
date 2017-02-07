//Suppose you have a 2D geospatial index defined on the key location in the collection places. 
//Write a query that will find the closest three places (the closest three documents) to the location 74, 140.
db.places.find({location:{$near:[74, 140]}}).limit(3)

//What is the query that will query a collection named "stores" to return the stores that 
//are within 1,000,000 meters of the location latitude=39, longitude=-130?
//Assume the stores collection has a 2dsphere index on "loc" and please use the "$near" operator.
db.stores.find({"loc":{"$near": {"$geometry": {type: "Point", coordinates: [-130, 39]}, $maxDistance: 1000000}}})

//to import sysprofile dump
mongoimport --drop -d m101 -c sysprofile sysprofile.json

//performance homework using indexes
db.posts.createIndex({"CreatedAtUtc":1})
db.posts.createIndex({"Tags" : 1, "CreatedAtUtc":1})