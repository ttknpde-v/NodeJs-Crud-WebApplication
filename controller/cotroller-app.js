
    const ServiceModulesInstance = require('../service/service-modules');
    const ServiceModulesClass = new ServiceModulesInstance();

    let express = ServiceModulesClass.retrieveExpress;
    let path = ServiceModulesClass.retrievePath;
    let connect = ServiceModulesClass.getConnectDatabase;
    let port = 5000; let app = express();

    const ejsPath = path.join(__dirname,'../ui/views'); /* setting path for view file ejs */
    const staticEjsPath = path.join(__dirname,'../ui'); /* setting path for static as css , js , font , img , ... (because it's static file) */

    app.listen(port , function () { console.log(`listening on port ${port}`); }); /* setting port server to run the project */
    app.set('view engine', 'ejs'); /* define default engine */
    app.use(express.static(staticEjsPath)); /* define static folder  */
    app.use(express.json()); /* accept data in json format */
    app.use(express.urlencoded({extended: true})); /* decode the data (send through(adj. ผ่านพ้น) html) form */


    app.get('/' , function (req , res) {
        res.render(ejsPath+'/home-app');
    });

    app.get('/views' , function (req , res) {
        let result = connect.query('select * from contact;',function (errors , result) {
            if (!errors) {
                res.render(ejsPath+'/views-app' , { list: result } );
            }
            else {
                console.log(errors.message);
            }
        });
        return result;
    });

    app.get('/api/edite/(:id)' , function (req, res) {
       let id = req.params.id;
       let result = connect.query('select * from contact where id = ?;', [id] ,function (errors , result) {
          if (result.length > 0) { /* if not found id of cause result returns 0  */
              res.render(ejsPath+'/edite-app' , {
                  id: result[0].id,
                  name: result[0].name,
                  email: result[0].email,
                  phone: result[0].phone,
                  city: result[0].city,
                  position: result[0].position
              });
          }
          else {
              res.redirect('/');
          }
       });
       return result;
    });

    app.get('/api/delete/(:id)' , function (req , res) {
        let id = req.params.id;
        let result = connect.query('delete from contact where id = ?;',[id] , function (errors) {
           if (!errors) {
               res.redirect('/views');
           }
           else {
               res.redirect('/');
           }
        });
        return result;
    });

    app.post('/api/create' , function (req , res) {
        let {name , phone , email , city , position} = req.body;
        let result = connect.query('insert into contact(`name`,  `email`, `phone` , `city` , `position`) ' +
            'values(?,?,?,?,?) ;' , [name , email, phone , city , position] , function (errors) {
           if (!errors) {
               res.redirect('/views');
           }
           else {
               res.redirect('/');
           }
        });
        return result;
    });

    app.post('/api/update' , function (req , res) {
        let {name , phone , email , city , position , id} = req.body;
        console.log(name , phone , email , city , position , id);
        let result = connect.query('update contact set `name` = ? , `phone` = ? , `email` = ? , `city` = ? , `position` = ? ' +
            'where id = ? ;' , [name , phone , email , city , position , id] , function (errors) {
            if (!errors) {
                res.redirect('/views');
            }
            else {
                res.redirect('/');
            }
        });
        return result;
    });

