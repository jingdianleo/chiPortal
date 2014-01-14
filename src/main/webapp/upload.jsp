<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<SCRIPT src="js/plugin/ui/js/jquery-ui-1.10.3.custom.js" type=text/javascript></SCRIPT>
<script type="text/javascript" src="js/ajaxfileupload.js"></script>
<script type="javascript">
    //上传文件
    function ajaxFileUpload(){
        debugger
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
</script>
<input type="file" id="file" name="file">
<input type="button" value="上传文件" onclick="ajaxFileUpload()">
<div id="result"></div>
<input type="hidden" id="imgPath">