
const bodyParse = require('body-parser');
const express = require('express');
var _und = require('underscore');
const fse = require('./movies.json')
const app = express()

const port = 3000
app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());


// simple get method
app.get('/', (req, res) => {
    res.end('Hello World!');
});
//REST API Get Method
app.get("/list", (req, res) => {
    res.json(fse);
});
//REST API Post Method
app.post('/postdata', function (req, res) {
    fse.push(req.body);
    res.json(fse);
})
//REST API PUT Method
app.put('/update/:id', function (req, res) {
    if (req.params.id) {
        _und.each(fse, function (ele, index) {
            if (req.params.id == ele.id) {
                ele.title = req.body.title;
            }
        }); res.json(fse);
    } else {
        console.log('hshshs');
    }
})


//  //REST API DELETE Method
app.delete('/deldata/:id', function (req, res) {
    getindextodelete = -1;
    if (req.params.id) {

        _und.each(fse, function (elem, index) {
            if (elem.id == req.params.id) {
                getindextodelete = index;


            }

        })
        if (getindextodelete > -1) {
            fse.splice(getindextodelete, 1);
        }

        res.json(fse);
    }
    else {
        console.log('Please pass body elements with id');
    }
});
//listen port
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});


// How To Access The Api Deployed On HTTPS       use url link instead of http://localhost:3000/list
// //Get
// await fetch('http://localhost:3000/list')
// //Post
// fetch('http://localhost:3000/postdata', {
// method: 'POST',
// body: JSON.stringify({
// id: 5,
// title: "Tabish "
// }),
// headers: {
// "Content-type": "application/json; charset=UTF-8"
// }
// })
// //Update
// fetch('http://localhost:3000/update/', {
// method: 'PUT',
// body: JSON.stringify({ id:7,
// title: "Aqib Ali Butt",
// completed: false
// }),
// headers: {
// "Content-type": "application/json; charset=UTF-8"
// }
// })
// //Delete
// await fetch("http://localhost:3000/deldata/3", {
// method: 'DELETE'
// })