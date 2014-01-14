var Account = {
    getSelRow:function(){
        return $('#grid').jqGrid('getGridParam','selrow');
    }

};

$(function(){

    $("#search").searchBar({
        caption : 'test',
        condition :[
            {label:'姓名',id:'name',name:'loginName',type:'text'},
            {label:'注册日期起',id:'registS',name:'registDateS',type:'date'},
            {label:'注册日期止',id:'registE',name:'registDateE',type:'date'},
            {label:'状态',id:'stats',name:'taskStats',type:'select',options:[{key:1,value:'未发布'},{key:2,value:'待审核'}]}
        ],
        buttonVal:'搜索',
        url:'account_list.action'
    });

    $("#grid").jqGrid({
//        caption:"账号管理",
        ajaxGridOptions : {type:"POST"},
        url:'account_list.action',
        datatype: "json",
        jsonReader: {
            root: "resultMap.date",   // json中代表实际模型数据的入口
            page: "resultMap.page",   // json中代表当前页码的数据
            total: "resultMap.total", // json中代表页码总数的数据
            records: "resultMap.record",// json中代表数据行总数的数据
            repeatitems: false // 如果设为false，则jqGrid在解析json时，会根据name来搜索对应的数据元素（即可以json中元素可以不按顺序）；而所使用的name是来自于colModel中的name设定。
        },
        rownumbers: true,
        //colNames:['登录名','注册时间','更新时间'],
        colModel:[
            {name:'id', label:'id', width:10, hidden:true, sortable:false,resizable:false},
            {label:'登录名',name:'loginName',index:'loginName', width:40, sortable:false},
            {label:'注册时间',name:'registerDate',index:'registerDate', width:60, sortable:false},
            {label:'更新时间',name:'updateDate',index:'updateDate', width:60, sortable:false}
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
            var row = Account.getSelRow();
            var loginName = $('#grid').jqGrid('getCell',row,'loginName');
            $('#edit_loginName').val(loginName);
            $('#edit_dialog').dialog('open');
        },
        delfunc:function(){
            var row = Account.getSelRow();
            var id = $('#grid').jqGrid('getCell',row,'id');
            var loginName = $('#grid').jqGrid('getCell',row,'loginName');
            if(!confirm('是否确认删除 '+loginName+' 用户?')){
                return false;
            }

            $.ajax({
                url : 'account_delete.action',
                data : {
                    'account.id':id
                },
                dataType : 'json',
                type : 'POST',
                success : function(result) {
                    if(result.resultMap.state == "success"){
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
            $('#loginName').val('张三');
        }
    });

    //submit add account
    $('#add_submit_btn').click(function(){
        var loginName = $.trim($('#loginName').val());
        if(loginName.length<1){
            alert('用户名过短，请重新输入.');
            return ;
        }

        $.ajax({
            url : 'account_save.action',
            data : {
                'account.loginName':loginName
            },
            dataType : 'json',
            type : 'POST',
            beforeSend : function(jqXHR, settings) {
                $('#add_loading_state').show();
            },
            success : function(result) {
                $('#add_dialog').dialog('close');
                $('#add_loading_state').hide();
                if(result.resultMap.state == "success"){
                    $("#grid").trigger("reloadGrid");
                }else{
                    alert('新增账户失败!');
                }
            }
        });
    });
    //cancel add core
    $('#add_cancel_btn').click(function(){
        $('#add_dialog').dialog('close');
    });

    //rename
    $('#edit_dialog').dialog({
        width:360,
        height:130,
        autoOpen:false,
        resizable: false,
        modal: true,
        close:function(){
            $('#edit_loginName').val('');
        }
    });

    $('#edit_submit_btn').click(function(){
        var loginName = $.trim($('#edit_loginName').val());
        if(loginName.length<1){
            alert('用户名过短，请重新输入.');
            return ;
        }
        var row = Account.getSelRow();
        var id = $('#grid').jqGrid('getCell',row,'id');
            $.ajax({
            url : 'account_update.action',
            data : {
                'account.id':id,
                'account.loginName':loginName
            },
            dataType : 'json',
            type : 'POST',
            beforeSend : function(jqXHR, settings) {
                $('#edit_loading_state').show();
            },
            success : function(result) {
                $('#edit_dialog').dialog('close');
                $('#edit_loading_state').hide();
                if(result.resultMap.state == "success"){
                    $("#grid").trigger("reloadGrid");
                }else{
                    alert('账户修改失败!');
                }
            }
        });
    });
    $('#add_cancel_btn').click(function(){
        $('#edit_dialog').dialog('close');
    });
});