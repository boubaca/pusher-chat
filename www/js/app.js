const pusher = new Pusher('dd7c14594aa89aa2be4c', {
        cluster: 'us2',
        encrypted: true,
      });
      const channel = pusher.subscribe('chat');
      channel.bind('message', data => {
          console.log(data)
        var type = data.name == states.name ? 'sent':'received'
        var name = type == 'sent'? states.name : data.name;
        states.msgs.push({name:name, text:data.text, type:type});
      });

    // init states
    var states = {
        name: '',
        msgs: []
    };

    (function(){
    function init(){

    Vue.use(Framework7Vue)

    Vue.component('page-chat', {
      template: '#page-chat',
      data: function(){
        return states;
      },
      // handle onSend
      methods: {
        onSend: function(text, clear){
             console.log("clicked") 
            var message = {
                name: this.name,
                text: text 
            }
            axios.post('http://localhost:6000/message', message);
          if( typeof clear == 'function' ) clear()
          }
        }
      });
      // Init App
    new Vue({
      el: '#app',
      data: function(){
        return states;
      },
      // handle enterChat button
      methods: {
        enterChat: function(){
          if(this.name.trim().length === 0 ){
            alert(" Enter your name ...")
            return false;
          }
          this.msgs.length = 0;
          this.$f7.mainView.router.load({url:'/chat/'});
        }
      },
      framework7: {
        root: '#app',
        /* Uncomment to enable Material theme: */
        // material: true,
        routes: [
          {
            path: '/chat/',
            component: 'page-chat'
          }
        ],
      }
    });
    }  
    // Handle device ready event

    document.addEventListener('deviceready', init, false)
    })();