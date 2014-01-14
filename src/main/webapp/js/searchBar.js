(function($) {

    $.fn.searchBar = function(options) {
        var opts = $.extend( {}, $.fn.searchBar.defaults, options || {});
        var _this = $(this);
        _this.addClass("searchBar");
        opts = init(opts,_this);
//        debugger
        $(".dateClass").datepicker({
            numberOfMonths: 2,
            showButtonPanel: true,
            regional:"zh"
        });
        $('button').button();
//        alert(options.url);
        $("#query").click(function(){
            var data='{';
            debugger
            for(var i = 0; i < options.condition.length; i++){
                var pName = $("#"+options.condition[i].id+'_'+options.condition[i].type).attr("name");
                var pValue = $("#"+options.condition[i].id+'_'+options.condition[i].type).val();
                if (pValue!=''){
                    data+=pName+':'+pValue;
                }
            }
            data+='}';
//            alert(data);

            $.ajax({
                url : options.url,
                data : data,
                dataType : 'json',
                type : 'POST',
                success : function(result) {
                    alert(" bbbb");
                }
            });
        });
        //对象方法
        return{}

    };
    $.fn.searchBar.defaults = {
        caption :'',//标题
        /**
         * lable 条件
         * id 控件id
         * name 向后台传递参数名称
         * type 类型（text文本 date日期 select下拉列表）
         *
         * example:
         * {label:'登录名',name:'loginName',id:'loginName_id',type:'text'}
         */
        condition :[],//查询条件
        /**
         *
         */
        url : '' //操作
    };
    function init(opts,obj){
        var html = '';
//        //form
//        html+='<form id="queryFrm" action="'+opts.url+'" method="post">';
        //标题
        if (opts.caption != ''){
            html+='<div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix"><span class="ui-jqgrid-title">'
                +opts.caption+'</span></div>'
        }
        //查询条件
        var searchHtml = '';
        if (opts.condition.length>0){
            searchHtml+='<div class="condition"><ul>';
            for(var i = 0; i < opts.condition.length; i++){
                searchHtml+=initCondition(opts.condition[i]);
            }
            searchHtml+='</ul></div>';
        }
        html+=searchHtml;
        //查询按钮
        html+=initButton(opts.buttonVal);
//        html+='</form>';
        obj.html(html);

    }

    function initCondition(obj){
        var type = obj.type;
        var result = '';
        result+='<li><span>';
        result+=obj.label;
        result+='</span>';
        if (type == 'text'){
            result+='<input type="text" id="'+obj.id+'_text" name="'+obj.name +'">';
        }else if (type=='date'){
            result+='<input type="text" id="'+obj.id+'_date" class="dateClass" name="'+obj.name +'">';
            initDatepicker(obj);
        }else if (type=='select'){
            result+='<select id="'+obj.id+'_select" name="'+obj.name+'">';
            var options = obj.options;
            for(var i = 0; i < options.length; i++){
                result+='<option value="'+options[i].key+'">'+options[i].value+'</option>';
            }
            result+='</select>';
        }

        result+='</li>';
        return result;
    }
    function initButton(txt){
        var result = '<div class="buttons">';
        result+='<button id="query">'+txt+'</button>';
        result+='</div>';

        return result;
    }

    function initDatepicker(obj){
        if (obj.type!='date'){
            return;
        }
        $("#regist_date").datepicker({
            numberOfMonths: 2,
            showButtonPanel: true,
            regional:"zh"
        });
    }
})(jQuery);