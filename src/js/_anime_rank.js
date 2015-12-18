(function () {
	'use strict';

	Vue.directive('popup', {
		bind: function () {
			$(this.el).popup()
		}
	})

	new Vue({
		el: '#mainContainer',

		data: {
			loading: true,
			rank: []
		},

		compiled: function () {
			$.ajax({
				url: 'http://api.frezc.com/anime_rank',
				context: this,
				success: function (data) {
					this.rank = data
					this.loading = false
				}
			})
		},
		methods: {
			test: function (event) {
				this.loading = !this.loading
				$('#anime_rank').transition('scale');
			}
		}
	})
})();



