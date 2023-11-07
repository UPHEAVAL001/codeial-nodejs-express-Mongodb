module.exports.home = function(req,res){
    //return res.end('<h1>Express is up for Codeial!</h1>')
    console.log(req.cookies);
    res.cookie('user_id', 'a38641');

    return res.render('home', {
        'title': 'HOMEPAGE',
    });
}

//module.exports.actionName = function(){}