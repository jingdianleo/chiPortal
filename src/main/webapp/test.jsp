<%--
  Created by IntelliJ IDEA.
  User: qilei
  Date: 14-1-13
  Time: 下午2:15
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title></title>
    <script type="text/javascript" src="js/jquery-1.9.1.js"></script>
    <script type="text/javascript" src="js/ajaxfileupload.js"></script>
    <script type="text/javascript">
        function ajaxFileUpload(){
            $.ajaxFileUpload(
                    {
                        url:'/upload.do',            //需要链接到服务器地址
                        secureuri:false,
                        fileElementId:'file',                        //文件选择框的id属性
                        dataType: 'json',                                     //服务器返回的格式，可以是json, xml
//                        type : 'POST',
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
    </script>
</head>
<body>
<input type="file" id="file" name="file">
<input type="button" value="上传文件" onclick="ajaxFileUpload()">
<div id="result"></div>
<input type="text" id="imgPath">
</body>
</html>
<pre style="word-wrap: break-word; white-space: pre-wrap;">{"filePath":"/upload/4fcea958065ba.jpg"}</pre>
