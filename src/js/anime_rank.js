var Vue = require('vue')
var AnimeRank = require('../components/anime-rank.vue')
require('../css/anime_rank.css')

Vue.component('anime-rank', AnimeRank)

Vue.directive('popup', {
    bind: function () {
        $(this.el).popup()
    }
})

var app = new Vue({
    el: '#mainContainer',

    data: {
        keyword: '',
        currentView: 'anime-rank'
    },

    methods: {
        changePage: function (view) {
            if (this.currentView != view) {
                $('#view_rank')
                    .transition('fade')
                ;
                $('#view_comments')
                    .transition('fade')
                ;
                this.currentView = view;
            }
        }
    }
})