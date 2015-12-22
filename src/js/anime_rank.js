//var Vue = require('vue')

Vue.directive('popup', {
    bind: function () {
        $(this.el).popup()
    }
})

new Vue({
    el: '#mainContainer',

    data: {
        loading: true,
        hasMore: false,
        rank: [],
        rank_show: [],
        keyword: '',
        
        detail: {
            loading: false,
            title: 'Loading...',
            data: {}
        }
    },

    compiled: function () {
        $.ajax({
            url: 'http://api.frezc.com/anime_rank?limit=100',
            context: this,
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    data[i].rank = i + 1
                }
                this.rank = data
                this.rank_show = data
                this.loading = false
                this.hasMore = false
            }
        })
    },
    methods: {
        test: function (event) {
            this.loading = !this.loading
            $('#anime_rank').transition('scale');
        },
        
        testImage: function (event) {
            event.target.src = 'build/127563_nl66u.jpg'
        },

        showAll: function (event) {
            this.rank_show = this.rank
            
            this.hasMore = false
        },
        
        search: function(val, oldVal) {
            this.rank_show = this.rank.filter(function (anime) {
                return anime.name_cn.match(val)
            })
        },
        
        showDetail: function(rank){
            $('#detail')
            .modal('setting', 'transition', 'horizontal flip')
            .modal('show')
        }
    },
    watch: {
        'keyword': 'search'
    }
})