<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>菜品管理</title>
    <jsp:include page="/admin/head.jsp" flush="true"/>
    <script type="text/javascript" src="../js/script/dish.js"></script>
    <script type="text/javascript" src="../js/ajaxfileupload.js"></script>
</head>
<body>

<table id="grid"></table>
<div id="grid_pager"></div>


<div id="add_dialog" title="新增菜品" style="display: none;">
    <table class="x-table-edit">
        <tr>
            <th>菜品名称</th>
            <td>
                <input type="text" id="name" value="" class="x-textinput ui-widget-content ui-corner-all" maxlength="20"/>
            </td>
        </tr>
        <tr>
            <th>状态</th>
            <td>
                <label for="radio1"><input type="radio" value="0" name="status" id="radio1">停用</label>
                <label for="radio2"><input type="radio" value="1" name="status" id="radio2" checked>启用</label>
            </td>
        </tr>
        <tr>
            <th>描述</th>
            <td>
                <textarea id="description" rows="5" cols="30"  class="x-textinput ui-widget-content ui-corner-all"></textarea>
            </td>
        </tr>
        <tr>
            <th>图片</th>
            <td>
                <input type="file" id="file" name="file">
                <input type="button" value="上传文件" onclick="ajaxFileUpload()">
                <div id="result"></div>
                <input type="hidden" id="imgPath">
            </td>
        </tr>
        <tr>
            <td colspan="2" align="center">
                <div id="add_loading_state" class="x-ui-icon x-ui-icon-loading" style="display:none;float:right;margin-right:10px;margin-top:5px"></div>
                <button id="add_submit_btn">新增</button>
                <button id="add_cancel_btn">取消</button>
            </td>
        </tr>
    </table>
</div>

<div id="edit_dialog" title="修改菜品" style="display: none;">
    <table class="x-table-edit">
        <tr>
            <th>菜品名称</th>
            <td>
                <input type="text" id="edit_name" value="" class="x-textinput ui-widget-content ui-corner-all" maxlength="20"/>
            </td>
        </tr>
        <tr>
            <th>状态</th>
            <td>
                <label for="edit_radio1"><input type="radio" value="0" name="edit_status" id="edit_radio1">停用</label>
                <label for="edit_radio2"><input type="radio" value="1" name="edit_status" id="edit_radio2">启用</label>
            </td>
        </tr>
        <tr>
            <th>描述</th>
            <td>
                <textarea id="edit_description" rows="5" cols="30"  class="x-textinput ui-widget-content ui-corner-all"></textarea>
            </td>
        </tr>
        <tr>
            <td colspan="2" align="center">
                <div id="edit_loading_state" class="x-ui-icon x-ui-icon-loading" style="display:none;float:right;margin-right:10px;margin-top:5px"></div>
                <button id="edit_submit_btn">修改</button>
                <button id="edit_cancel_btn">取消</button>
            </td>
        </tr>
    </table>
</div>
</body>
</html>