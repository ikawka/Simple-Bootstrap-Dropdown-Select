//Amiel Simbahon
//https://github.com/ikawka/Simple-Bootstrap-Dropdown-Select
//http://bulletproofscript.wordpress.com/

$(function(){
    $(".dropdown-select").each(function(i, o){
        var target = $(o);
        var hasSelected = false;
        var style = target.attr('data-style') || 'btn-default';
        target.css({"display":"none"});
        target.after(function(){
            var control = $('<div class="dropdown-select input-group-btn"></div>')
            .append('<button type="button" data-toggle="dropdown" href="javascript:;" role="button" class="btn '+style+' dropdown-toggle dropdown-select-btn"><span class="dropdown-select-selected pull-left">Dropdown trigger</span> <span class="caret"></span></button>')
            .append('<ul class="dropdown-menu" role="menu"></ul>');

            control.find('.dropdown-menu').append(function(){
                var options = [];
                var retval  = '';
                target.find('option').each(function(i, o){
                    var option = {};
                    option.val      = $(o).val();
                    option.text     = $(o).text();
                    option.selected = ($(o).is('[selected]')) ? true : false;
                    options.push(option);
                });
                $(options).each(function(i, o){
                    if(o.selected){
                        retval += '<li class="active"><a tabindex="0" href="javascript:;" data-value="'+o.val+'">'+o.text+'</a></li>';
                        control.find('.dropdown-select-selected').html(o.text);
                        hasSelected = true;
                    }else{
                        retval += '<li><a href="javascript:;" data-value="'+o.val+'">'+o.text+'</a></li>';
                    }
                });
                return retval;
            });
            //pick the first 1
            if(!hasSelected){
                var firstOption = control.find('.dropdown-menu li:first-child')
                firstOption.addClass("active");
                control.find('.dropdown-select-selected').html(firstOption.text());
            }

            control.find('.dropdown-menu li a').each(function(i, o){
                $(o).click(function(){
                    var text = $(this).text();
                    var val  = $(this).attr("data-value");
                    target.val(val);
                    target.change();
                    control.find('.dropdown-menu li').removeClass("active");
                    $(this).parent().addClass('active');
                    control.find('.dropdown-select-selected').html(text);
                });
            });

            control.find('.dropdown-select-btn').click(function(){

                var menu = control.find('.dropdown-menu');
                var oldVal = control.find('.dropdown-select-selected').text();

                //select item when menu is open
                menu.find('li').removeClass('active');
                menu.find('li').each(function(i, o){
                    if($(o).find('a').text() == oldVal){
                        $(o).addClass("active");
                    }
                });
                var link = control.find('.dropdown-menu li.active a');
                setTimeout(function () {
                    link.focus();
                }, 10);
            });

            control.find('.dropdown-menu').keydown(function(e){
                var that = this;
                var currKey = String.fromCharCode(e.keyCode).toLowerCase();

                $(this).find('li a').each(function(i, o){
                    if($(o).text().toLowerCase().substring(0, 1) == currKey){
                        $(that).find('li').removeClass('active');
                        $(o).parent().addClass('active');
                        $(o).focus();
                        return false;
                    }
                });

                //up
                if (e.keyCode == 38) {
                    var prev = $(this).find('li.active').prev();
                    var curr = $(this).find('li.active');
                    if(prev.is('li')){
                        curr.removeClass('active');
                        prev.addClass('active');
                    }
                }

                if (e.keyCode == 40) {
                    var next = $(this).find('li.active').next();
                    var curr = $(this).find('li.active');
                    if(next.is('li')){
                        curr.removeClass('active');
                        next.addClass('active');
                    }
                }
            });
            return $(control);
        });
    });
});
