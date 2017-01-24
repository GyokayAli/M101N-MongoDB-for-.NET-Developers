//Find all exam scores greater than or equal to 65, and sort those scores from lowest to highest:
db.grades.find({'score':{$gte:65}}).sort({ 'score': 1 })

//Find the student who holds the 101st best grade across all grades:
db.grades.find().sort( { 'score' : -1 } ).skip( 100 ).limit( 1 )

//Sort the students by student_id , and score, while also displaying the type to then see what the top five docs are:
db.grades.find( { }, { 'student_id' : 1, 'type' : 1, 'score' : 1, '_id' : 0 } ).sort( { 'student_id' : 1, 'score' : 1, } ).limit( 5 )

//Provide the identity of the student with the highest average in the class with following query that uses the aggregation framework. 
//The answer will appear in the _id field of the resulting document:
db.grades.aggregate( { '$group' : { '_id' : '$student_id', 'average' : { $avg : '$score' } } }, { '$sort' : { 'average' : -1 } }, { '$limit' : 1 } )

//Find title of a movie from the year 2013 that is rated PG-13 and won no awards:
db.movieDetails.find({'year': 2013, 'rated': 'PG-13', 'awards.wins': 0}).pretty()
db.movieDetails.find( { $and: [ { 'year': 2013, 'rated': 'PG-13', 'awards.wins': 0} ] } )

//Using the video.movieDetails collection, how many movies list "Sweden" second in the the list of countries.
db.movieDetails.find({'countries.1': 'Sweden'}).count()

//Using the students.grades collection remove the grade of type "homework" with the lowest score for each student from the dataset in the handout. 
//Since each document is one grade, it should remove one document per student.
var cursor = db.grades.aggregate([{ '$group' : { '_id' : '$student_id', 'minimum' : { $min : '$score' } } }, {$sort: {'_id': 1}}])
minScores = cursor.map(function (doc) { return doc.minimum; });
db.grades.remove({"score": { "$in": minScores }});