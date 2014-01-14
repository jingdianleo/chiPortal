package com.chiportal.comm;

import com.chiportal.service.BaseService;

import javax.annotation.Resource;

/**
 * User: qilei
 * Date: 14-1-10
 * 功能：基础控制器
 */
public class BaseController {
    protected BaseService baseService;

    public BaseService getBaseService() {
        return baseService;
    }
    @Resource
    public void setBaseService(BaseService baseService) {
        this.baseService = baseService;
    }
}
