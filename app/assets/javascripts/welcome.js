(function($){  
	var methods = {
		// Initialise plugin.
		init: function() {
		    $('#search-form').submit(function(event) {
		        methods.search();
                event.preventDefault();
		    });
		},

		search: function() {
            $('#results').html('');
            $('.loading-spinner').show();
			$.ajax({
				url:'search',
				type:'GET',
                data:{'un':$('#un').val()},
				success:function(data){
					$('.loading-spinner').hide();
                    if (data.length == 0) {
                        $('#results').html(infoDiv('NO RESULTS'));
                    } else if (data.length == 1) {
                        methods.load(data[0]);
                    } else {
                        methods.show(data);
                    }
				},
				error:function(jqXHR){
				    $('.loading-spinner').hide();
                    $('#results').html(errorDiv('UNAVAILABLE'));
				}
			});
		},
        
        load: function(p) {
			window.location = rootUrl + 'overview/' + p.system + '/' + p.name;
		},
        
        show: function(ps) {
			var results = '';
            for (i in ps) {
                results += '<a href="' + rootUrl + 'overview/' + ps[i].system + '/' + ps[i].name + '" class="list-group-item"><img class="img-circle" alt="' + ps[i].system + '" title="' + ps[i].system + '" src="' + ps[i].systemIcon + '"/> ' + ps[i].name + '</a>';
            }
            $('#results').html(results);
		}
	};
	
	$(document).ready(function(){
		methods.init();
	});
	
})(jQuery);