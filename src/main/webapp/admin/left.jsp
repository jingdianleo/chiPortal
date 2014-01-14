
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script type="text/javascript">
    $(document).ready(function () {
        $("#accordion").accordion({
            heightStyle:	"fill"
        });
        $("#menu").menu({});
        $('#accordion li').each(function(){
            var action = $(this).attr('action');
            if(action){
                $(this).bind('click',function(){
                    doAction(action);
                }).hover(function(){
                            $(this).css({'font-weight':'normal'});
                            $(this).addClass('ui-widget-header ui-corner-all hover');
                        },function(){
                            $(this).removeClass('ui-widget-header ui-corner-all hover');
                        });
            }
        });
    });
</script>

<div id="accordion">

    <h3><a href="javascript:void(0)">基础维护</a></h3>
    <ul id="menu">
        <li action="initDish.do"><a href="javascript:void(0)">菜品管理</a></li>
        <li><a href="javascript:void(0)">权限维护</a></li>
        <li><a href="javascript:void(0)">角色管理</a></li>
        <li style="width: 150px">
            <a href="#">Delphi</a>
            <ul>
                <li class="ui-state-disabled"><a href="#">Ada</a></li>
                <li><a href="#">Saarland</a></li>
                <li><a href="#">Salzburg</a></li>
            </ul>
        </li>
        <li><a href="#">Saarland</a></li>

        <li class="ui-state-disabled"><a href="#">Amesville</a></li>
    </ul>

    <h3><a href="#">Section 2</a></h3>

    <div>
        <h5>Sed Non Urna</h5>

        <p>Donec et ante. Phasellus eu ligula. Vestibulum sit amet purus.
            Vivamus hendrerit, dolor at aliquet laoreet, mauris turpis porttitor velit,
            faucibus interdum tellus libero ac justo.</p>

        <p>Vivamus non quam. In suscipit faucibus urna.</p>
    </div>

</div>