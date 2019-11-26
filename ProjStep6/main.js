var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 1957);

app.get('/',function(req,res){
   res.render('index');
});

app.get('/home',function(req,res){
   res.render('index');
});

app.get('/divisions',function(req,res){
   var context = {};
   // CREATE
   if(req.query['Add']){
      mysql.pool.query('INSERT INTO division (name) VALUES (?)', [req.query.name], function(err, result){
         if(err){
            next(err);
            return;
         }
      });
   }

   // DELETE
   if(req.query['Add']){
      mysql.pool.query('DELETE FROM division WHERE divisionID=?', [req.query.divisionID], function(err, result){
         if(err){
            next(err);
            return;
         }
      });
   }

   //READ
   context.divisions = rows;
   mysql.pool.query('SELECT * FROM division', function(err, rows, fields){
      if(err){
         next(err);
         return;
      }
      res.render('divisions', context);
   });

   // res.render('divisions');
});

app.get('/teams',function(req,res){
   var context = {};
   // CREATE
   if(req.query['Add']){
      mysql.pool.query('INSERT INTO team (name, location, mascot, jerseycolor, divisionID) VALUES (?,?,?,?,?)', [req.query.name, req.query.location, req.query.mascot, req.query.jerseycolor, req.query.divisionID], function(err, result){
         if(err){
            next(err);
            return;
         }
   // res.render('teams');
});

}
      // DELETE
      if(req.query['Add']){
         mysql.pool.query('DELETE FROM team WHERE teamID=?',[req.query.playerID], function(err, result){
            if(err){
               next(err);
               return;
            }
         });
      }

   // READ
   my.sql.pool.query('SELECT * FROM team', function(err, rows, fields){
      if(err){
         next(err);
         return;
      }

   context.teams = rows;
   mysql.pool.query('SELECT * FROM division', function(err, rows, fields){
      if (err){
         next(err);
         return;
      }
      context.division = rows;
      res.render('teams', context);


   });
   });

}

app.get('/players',function(req,res){
   var context = {};
   
   //insert
   if(req.query['Add']){
      mysql.pool.query('INSERT INTO player (firstName,lastName,height,weight,position,teamID) VALUES (?,?,?,?,?,?)', [req.query.firstName, req.query.lastName, req.query.height, req.query.weight, req.query.position, req.query.team], function(err, result){
         if(err){
            next(err);
            return;
         }
      });
   }
 
   //delete 
   if(req.query['Delete']){
      mysql.pool.query('DELETE FROM player WHERE playerID=?', [req.query.playerID], function(err, result){
         if(err){
            next(err);
            return;
         }
      });
   }   
/* 
   //edit
   if(req.query['Edit']){
      //update
   } 
*/

   //showing everything
   mysql.pool.query('SELECT * FROM player', function(err, rows, fields){
      if(err){
         next(err);
         return;
      }

      context.players = rows;
      //for filling dropdown
      mysql.pool.query('SELECT * FROM team', function(err, rows, fields){
         if(err){
            next(err);
            return;
         }
         context.teams = rows;
         res.render('players', context);
      });
      
  //    res.render('players', context);
   });

});

app.get('/coaches',function(req,res){
   var context = {};
   
   //insert
   if(req.query['Add']){
      mysql.pool.query('INSERT INTO coach (firstName,lastName,role,tenure,teamID) VALUES (?,?,?,?,?)', [req.query.firstName, req.query.lastName, req.query.role, req.query.tenure, req.query.team], function(err, result){
         if(err){
            next(err);
            return;
         }
      });
   }
 
   //delete 
   if(req.query['Delete']){
      mysql.pool.query('DELETE FROM coach WHERE coachID=?', [req.query.coachID], function(err, result){
         if(err){
            next(err);
            return;
         }
      });
   }   
/* 
   //edit
   if(req.query['Edit']){
      //update
   } 
*/

   //showing everything
   mysql.pool.query('SELECT * FROM coach', function(err, rows, fields){
      if(err){
         next(err);
         return;
      }

      context.coaches = rows;
      //for filling dropdown
      mysql.pool.query('SELECT * FROM team', function(err, rows, fields){
         if(err){
            next(err);
            return;
         }
         context.teams = rows;
         res.render('coaches', context);
      });
      
  //    res.render('players', context);
   });

});

app.get('/rivalries',function(req,res){
   var context = {};
   
   //insert
   if(req.query['Add']){
      mysql.pool.query('INSERT INTO team_team (team1ID,team2ID) VALUES (?,?)', [req.query.team1, req.query.team2], function(err, result){
         if(err){
            next(err);
            return;
         }
      });
   }
 
   //delete 
   if(req.query['Delete']){
      mysql.pool.query('DELETE FROM team_team WHERE team1ID=? AND team2ID=?', [req.query.team1, req.query.team2], function(err, result){
         if(err){
            next(err);
            return;
         }
      });
   }   
/* 
   //edit
   if(req.query['Edit']){
      //update
   } 
*/

   //showing everything
   mysql.pool.query('SELECT * FROM team_team', function(err, rows, fields){
      if(err){
         next(err);
         return;
      }

      context.rivals = rows;
      //for filling dropdown
      mysql.pool.query('SELECT * FROM team', function(err, rows, fields){
         if(err){
            next(err);
            return;
         }
         context.teams = rows;
         res.render('rivalries', context);
      });
      
   });
});

app.use(function(req,res){
   res.status(404);
   res.render('404');
});

app.use(function(err, req, res, next){
   console.error(err.stack);
   res.type('plain/text');
   res.status(500);
   res.render('500');
});

app.listen(app.get('port'), function(){
   console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
