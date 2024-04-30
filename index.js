var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
app.post("/register",function(req,res){
console.log("POST request to /register" +"Std name: " +req.body.std_name);
});


app.post("/register", function(req, res) {
    var student_info = { Name: req.body.std_name, GPA: req.body.std_gpa }; //std info
    var q = "insert into Student set ?";
    con.query(q, student_info, function(error, results) {
    if (error) throw error;
    res.redirect("/db"); //redirect to root page
    });
});

app.post("/update", function(req, res) {
    var q = "update Student set GPA=? where ID=?";
    con.query(q, [3.43,999],function(err, results, fields) {
        if (err) throw err;
        console.log(results);
    });
});

app.post("/delete", function(req, res) {
    var q = "delete from Student where ID=?";
    con.query(q, [12301], function(err, results, fields) {
        if (err) throw err;
        console.log("Deleted " + results.affectedRows + " row(s)"); // Success!
    });
});

app.post("/search", function(req, res) {
    var q = "select * from Student where ID=?";
    con.query(q, [id], function(err, results, fields) {
        if (err) throw err;
        else {
        if (results.length == 0) //search failed
        console.log("No student found with ID: " + id);
        else { //print searched student info
            results.forEach(function(element) {
            console.log(element.name + " " + element.ID + " " + element.tot_credit + " " + element.GPA);
            });
        }
    }
    });
});

app.get("/display", function(req, res) {
    var q = "select * from Student";
    con.query(q, function(error, results) {
        if (error) throw error;
        res.render("DisplayAll", { data:
    results });
    });
});
  