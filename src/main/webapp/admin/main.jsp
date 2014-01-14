
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>后台管理</title>
    <jsp:include page="/admin/head.jsp" flush="true"/>
    <script type="text/javascript" src="../js/script/main.js"></script>
</head>
<body>
<%--<div class="ui-layout-north ui-widget-content" style="display: none;">--%>
    <%--North Pane--%>
<%--</div>--%>
<div class="ui-layout-center" style="display: none;">
    <div id="x-main" style="height: 100%">
    </div>
</div>

<div class="ui-layout-west" style="display: none;">
    <jsp:include page="left.jsp" flush="true"></jsp:include>
</div>

</body>
</html>