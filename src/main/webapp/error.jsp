<%--
  Created by IntelliJ IDEA.
  User: qilei
  Date: 14-1-10
  Time: 上午11:44
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=GBK">
    <title>错误页面</title>
</head>
<body>
<h1>出错了</h1>
<%
    Exception e = (Exception)request.getAttribute("exception");
    out.print(e.getMessage());
%>
</body>
</html>