package com.chiportal.controller;

import com.chiportal.comm.BaseController;
import com.chiportal.entity.Dish;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;

/**
 * User: qilei
 * Date: 14-1-10
 * 功能：
 */
@Controller
public class MenuController extends BaseController {
//    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String listMenu(ModelMap model) {
        model.addAttribute("menu", new Dish());
        model.addAttribute("menus", baseService.listAll(Dish.class));
        return "menus";
    }

}
