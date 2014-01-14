<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>账号管理</title>
    <jsp:include page="/admin/head.jsp" flush="true"/>
    <script type="text/javascript" src="../js/script/account.js"></script>
</head>
<body>

<div id="search"></div>
<table id="grid"></table>
<div id="grid_pager"></div>

<div id="add_dialog" title="新增账号" style="display: none;">
    <table class="x-table-edit">
        <tr>
            <th>登录名</th>
            <td>
                <input type="text" id="loginName" value="" class="x-textinput ui-widget-content ui-corner-all" maxlength="20"/>
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

<div id="edit_dialog" title="Rename Core" style="display:none">
    <table class="x-table-edit">
        <tr>
            <th>登录名</th>
            <td>
                <input type="text" id="edit_loginName" value="" class="x-textinput ui-widget-content ui-corner-all" maxlength="20"/>
            </td>
        </tr>

        <tr>
            <td colspan="2" align="center">
                <div id="edit_loading_state" class="x-ui-icon x-ui-icon-loading" style="display:none;float:right;margin-right:10px;margin-top:5px"></div>
                <button id="edit_submit_btn">提交</button>
                <button id="edit_cancel_btn">取消</button>
            </td>
        </tr>
    </table>
</div>
</body>
</html>