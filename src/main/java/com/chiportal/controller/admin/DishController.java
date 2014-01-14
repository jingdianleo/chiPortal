package com.chiportal.controller.admin;

import com.chiportal.comm.BaseController;
import com.chiportal.entity.Dish;
import com.chiportal.util.Page;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;

/**
 * User: qilei
 * Date: 14-1-10
 * 功能：
 */
@Controller
public class DishController extends BaseController {
    private static Logger logger = Logger.getLogger(DishController.class);

    @RequestMapping(value = "/admin/initDish", method = RequestMethod.GET)
    public String initDish(){
        logger.info("init dish");
        return "admin/dish";
    }

    @RequestMapping(value = "/admin/listDish")
    @ResponseBody
    public HashMap list(@RequestParam(value="page", required=false) Integer page){
        logger.info("查询菜品");

        if (page==null || page<=0){
            page = 1;
        }

        Page pageInfo = baseService.pageQuery(Dish.class, page);
        HashMap resultMap = new HashMap();
        resultMap.put("date", pageInfo.getDataList());
        resultMap.put("page",pageInfo.getPageCurrent());
        resultMap.put("total",pageInfo.getPageCount());
        resultMap.put("record",pageInfo.getTotalCount());
        resultMap.put("status","success");

        return resultMap;
    }
    @RequestMapping(value = "/admin/addDish")
    @ResponseBody
    public HashMap add (@ModelAttribute("dish") Dish dish){
        logger.info("come in add");
        dish.setCreatTime(new Date());
        baseService.saveObject(dish);
        HashMap resultMap = new HashMap();
        resultMap.put("status","success");
        return resultMap;
    }

    @RequestMapping(value = "/admin/deleteDish")
    @ResponseBody
    public HashMap delete (@RequestParam(value="dishId", required=false) Long dishId){
        logger.info("come in delete");
        baseService.deleteObject(Dish.class,dishId);
        HashMap resultMap = new HashMap();
        resultMap.put("status","success");
        return resultMap;
    }
}
