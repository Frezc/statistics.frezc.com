var Vue = require('vue')

Vue.directive('popup', {
    bind: function () {
       $(this.el).popup()
    }
})

new Vue({
    el: '#mainContainer',

    data: {
        loading: true,
        rank: [],
        rank_show: []
    },

    compiled: function () {
        $.ajax({
            url: 'http://api.frezc.com/anime_rank?limit=1200',
            context: this,
            success: function (data) {
                for(var i=0; i<data.length; i++){
                    data[i].rank = i+1
                }
                this.rank = data
                this.rank_show = data.splice(0, 100)
                this.loading = false
            }
        })
    },
    methods: {
        test: function (event) {
            this.loading = !this.loading
            $('#anime_rank').transition('scale');
        },
        
        showAll: function (event) {
            console.log('click!')
        }
    }
})