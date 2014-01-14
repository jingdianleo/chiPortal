//自定义图片列格式
function imgFormatter(cellvalue, options, rowdata){
    if(cellvalue!=null && cellvalue!=""){
        return '<img style="width: 50px;height: 50px" src="'+cellvalue+'" alt="' + cellvalue + '" />';
    }else{
        return '';
    }
}
//上传文件
function ajaxFileUpload(){
    $.ajaxFileUpload(
        {
            url:'/upload.do',            //需要链接到服务器地址
            secureuri:false,
            fileElementId:'file',                        //文件选择框的id属性
            dataType: 'json',                                     //服务器返回的格式，可以是json, xml
            success: function (data, status)            //相当于java中try语句块的用法
            {
                $('#result').html('添加成功');
                var obj = eval("("+data+")")
                $('#imgPath').val(obj.filePath);
            },
            error: function (data, status, e)            //相当于java中catch语句块的用法
            {
                $('#result').html('添加失败');
            }
        }

    );
}

var Dish = {
    getSelRow:function(){
        return $('#grid').jqGrid('getGridParam','selrow');
    }
};

$(function(){
    $('button').button();

    $("#grid").jqGrid({
        caption:"菜品管理",
        ajaxGridOptions : {type:"POST"},
        url:'listDish.do',
        datatype: "json",
        jsonReader: {
            root:"date",   // json中代表实际模型数据的入口
            page:"page",   // json中代表当前页码的数据
            total:"total", // json中代表页码总数的数据
            records:"record",// json中代表数据行总数的数据
            repeatitems: false // 如果设为false，则jqGrid在解析json时，会根据name来搜索对应的数据元素（即可以json中元素可以不按顺序）；而所使用的name是来自于colModel中的name设定。
        },
        rownumbers: true,
        colModel:[
            {name:'id', label:'id', width:10, hidden:true, sortable:false,resizable:false},
            {label:'菜品名称',name:'name',index:'name', width:40, sortable:false},
            {label:'描述',name:'description',index:'description', width:60, sortable:false},
            {label:'图片',name:'img',index:'img', width:60, sortable:false,formatter: imgFormatter },
            {label:'创建时间',name:'creatTime',index:'creatTime', width:60, sortable:false},
            {label:'状态',name:'status',index:'status', width:60, sortable:false}
        ],

        viewrecords: true,
        autowidth: true,
        hidegrid:false,
        height:450,
        rowNum:20,
        pager: '#grid_pager'
    });

    $("#grid").jqGrid("navGrid", "#grid_pager",{
        add:true,
        addtitle:'新增',
        edit:true,
        edittitle:'修改',
        del:true,
        deltitle:'删除',
        view:false,
        search:false,
//        alertcap :"提醒",
//        alerttext : "请选择需要操作的数据行!",
        addfunc:function(){
            $('#add_dialog').dialog("open");
        },
        editfunc:function(){
            var row = Dish.getSelRow();
            var id = $('#grid').jqGrid('getCell',row,'id');
            var name = $('#grid').jqGrid('getCell',row,'name');
            var description = $('#grid').jqGrid('getCell',row,'description');
            var status = $('#grid').jqGrid('getCell',row,'status');
            debugger

            $('#edit_name').val(name);
            $('#edit_description').val(description);
            if (status==1){
                $("#edit_radio2").attr("checked", true);
            }else{
                $("#edit_radio1").attr("checked", true);
            }
            $('#edit_dialog').dialog();
        },
        delfunc:function(){
            var row = Dish.getSelRow();
            var id = $('#grid').jqGrid('getCell',row,'id');
            var name = $('#grid').jqGrid('getCell',row,'name');
            if(!confirm('是否确认删除 '+name+' 菜品?')){
                return false;
            }

            $.ajax({
                url : '/admin/deleteDish.do',
                data : {
                    'dishId':id
                },
                dataType : 'json',
                type : 'POST',
                success : function(result) {
                    if(result.status == "success"){
                        $("#grid").trigger("reloadGrid");
                    }else{
                        alert('删除账户失败!');
                    }
                }
            });

        }
    },{},{},{},{},{});

    //add dialog
    $('#add_dialog').dialog({
        width:360,
        height:310,
        autoOpen:false,
        resizable: false,
        modal: true,
        close:function(){
            //设定默认值
            $('#name').val('');
        }
    });

    //submit add dish
    $('#add_submit_btn').click(function(){
        var name = $.trim($('#name').val());
        if(name.length<1){
            alert('菜品名称过短，请重新输入.');
            return ;
        }
        var description = $.trim($('#description').val());
        var image = $.trim($('#imgPath').val());
        var status = $.trim($("input[name='status']:checked").val());
        $.ajax({
            url : '/admin/addDish.do',
            data : {
                'name':name,
                'description':description,
                'status':status,
                'img':image
            },
            dataType : 'json',
            type : 'POST',
            beforeSend : function(jqXHR, settings) {
                $('#add_loading_state').show();
            },
            success : function(result) {
                $('#add_dialog').dialog('close');
                $('#add_loading_state').hide();
                if(result.status == "success"){
                    $("#grid").trigger("reloadGrid");
                }else{
                    alert('新增菜品失败!');
                }
            }
        });
    });
    //cancel add core
    $('#add_cancel_btn').click(function(){
        $('#add_dialog').dialog('close');
    });
});