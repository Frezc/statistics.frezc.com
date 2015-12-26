// var Vue = require('vue')
// require('../css/anime_rank.css')

Vue.directive('popup', {
    bind: function () {
        $(this.el).popup()
    }
})

var AnimeRank = Vue.extend({
    el: '#mainContainer',

    data: {
        loading: true,
        hasMore: false,
        rank: [],
        rank_filter: [],
        rank_show: [],
        keyword: '',

        detail: {
            loading: true,
            show_index: -1,
            data: {}
        }
    },

    compiled: function () {
        $.ajax({
            url: 'http://api.frezc.com/anime_rank?limit=1200',
            context: this,
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    data[i].rank = i + 1
                }
                this.rank = data
                this.rank_filter = this.rank
                this.rank_show = data.slice(0, 50)
                this.loading = false
                this.hasMore = false
            }
        });
        
        self = this;
        $(window).scroll(function () {
            if ($(window).scrollTop() == $(document).height() - $(window).height()) {
                self.loadMore();
            }
        });
    },

    methods: {
        loadMore: function () {
            if (!this.loading) {
                var offset = this.rank_show.length;
                var add = this.rank_filter.slice(offset, offset+50);
                for(var i=0; i<add.length; i++){
                    this.rank_show.push(add[i]);
                }
            }
        },

        showAll: function (event) {
            this.rank_show = this.rank

            this.hasMore = false
        },

        search: function (val, oldVal) {
            this.rank_filter = this.rank.filter(function (anime) {
                return anime.name_cn.match(new RegExp(val, 'i'))
            })
            this.rank_show = this.rank_filter.slice(0, 50)
        },

        showDetail: function (anime) {
            this.showDetailModal();
            if (anime.rank != this.detail.show_index + 1) {
                this.detail.loading = true;
                $('#detailImage').attr('src', "build/placeholder.png");
                $.ajax({
                    url: 'http://api.frezc.com/relate_info/' + anime.relate_id,
                    context: this,
                    success: function (data) {
                        this.detail.show_index = anime.rank;
                        this.detail.data = data;
                        this.detail.loading = false;
                        /*
                        $('#detailImage').load(data.image, function (response, status, xhr) {
                            console.log(response)
                            console.log(status)
                            console.log(xhr)
                            // if (status == "success")
                            //     this.attr('src', )
                            // if (status == "error")
                            //     this.addClass('disabled');
                        });*/
                    }
                });
            }
        },

        asyncLoadImage: function (url, callback) {
            var img = new Image(); //创建一个Image对象，实现图片的预下载 
            img.src = url;

            if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数 
                callback.call(img);
                return; // 直接返回，不用再处理onload事件 
            }

            img.onload = function () { //图片下载完毕时异步调用callback函数。 
                callback.call(img);//将回调函数的this替换为Image对象 
            };
        },

        showDetailModal: function () {
            $('#detail')
                .modal('setting', 'transition', 'horizontal flip')
                .modal('show');
        }
    },
    watch: {
        'keyword': 'search'
    }
})