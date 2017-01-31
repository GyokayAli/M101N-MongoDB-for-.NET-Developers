//Import students collection
//mongoimport --drop -d school -c students students.json

//Find lowest homework score for each student
var cursor = db.students.aggregate([
    { "$unwind": "$scores" },
    {
        "$match": {
            "scores.type": "homework"
        }
    },
    {
        "$group": {
            "_id": "$_id",
            "minscore": { "$min": "$scores.score" }
        }
    }
]);

//Delete lowest homework score for each student
cursor.forEach(function (doc) {
    db.students.update({ "_id": doc._id }, {
        "$pull": {
            "scores": {
                "score": doc.minscore,
                "type": "homework"
            }
        }
    });
});

//Provide the identity (in the form of their _id) of the student with the highest average in the class
db.students.aggregate([
    { '$unwind': '$scores' },
    {
        '$group':
        {
            '_id': '$_id',
            'average': { $avg: '$scores.score' }
        }
    },
    { '$sort': { 'average': -1 } },
    { '$limit': 1 }])