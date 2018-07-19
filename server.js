const Pusher = require('pusher');
        const express = require('express');
        const bodyParser = require('body-parser');
        const cors = require('cors');
        const app = express();
        app.use(cors());
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());

        var pusher = new Pusher({
            appId: '563155',
            key: 'dd7c14594aa89aa2be4c',
            secret: '20baa6d5883c505ec2f9',
            cluster: 'us2',
            encrypted: true
          });
        app.set('PORT', process.env.PORT || 6000);
        app.post('/message', (req, res) => {
          const message = req.body;
          pusher.trigger('chat', 'message', message);
          res.send(message)

        });
        app.listen(app.get('PORT'), () => 
          console.log('Listening at ' + app.get('PORT')))
		  