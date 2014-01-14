package com.chiportal.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.ServletContextAware;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import java.io.File;

/**
 * User: qilei
 * Date: 14-1-13
 * 功能：
 */
@Controller
public class FileUploadController implements ServletContextAware {
    private ServletContext servletContext;
    //实现接口中的setServletContext方法
    public void setServletContext(ServletContext servletContext) {
        this.servletContext = servletContext;
    }
//    @RequestMapping(value = "/upload", method = RequestMethod.GET)
//    @ResponseBody
//    public String handleFormUploadGET(@RequestParam("file") CommonsMultipartFile mFile){
//        return handleFormUpload(mFile);
//    }

    @RequestMapping(value = "/upload", method = RequestMethod.POST) //将文件上传请求映射到该方法
    @ResponseBody
    public void handleFormUpload(@RequestParam("file") CommonsMultipartFile mFile,HttpServletResponse response) {
//        HashMap result = new HashMap();
        try {
            if (!mFile.isEmpty()) {
                String path = this.servletContext.getRealPath("/upload/");  //获取本地存储路径
                File file = new File(path + "\\" +mFile.getFileItem().getName()); //新建一个文件
                try {
                    mFile.getFileItem().write(file); //将上传的文件写入新建的文件中
                } catch (Exception e) {
                    e.printStackTrace();
                }
    //            result.put("filePath", "/upload/" + mFile.getFileItem().getName());
            }
            String filePath = "/upload/" + mFile.getFileItem().getName();
            response.setContentType("text/html;charset=utf-8");
            response.getWriter().write("{'filePath':'"+filePath+"'}");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
