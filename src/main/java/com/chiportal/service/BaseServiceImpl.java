package com.chiportal.service;

import com.chiportal.dao.BaseDao;
import com.chiportal.util.Page;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.io.Serializable;
import java.util.HashMap;
import java.util.List;

/**
 * User: qilei
 * Date: 13-11-25
 * 功能：
 */
@Component("baseService")
public class BaseServiceImpl implements BaseService {
    private static Logger logger = LogManager.getLogger(BaseServiceImpl.class);
    public static final int PAGESIZE = 10;
    private BaseDao dao;

    public BaseDao getDao() {
        return dao;
    }
    @Resource
    public void setDao(BaseDao dao) {
        this.dao = dao;
    }

    @Override
    public boolean deleteObject(Class cls, String[] ids) {
        try {
            Long[] idLs = new Long[ids.length];
            for(int i = 0 ; i<ids.length ; i++){
                idLs[i] = Long.parseLong(ids[i]);
            }
            return this.getDao().deleteObject(cls, idLs);
        } catch (Exception e) {
            logger.error(e);
        }
        return false;
    }

    @Override
    public boolean deleteObject(Class cls, Long[] ids) {
        try {
            return this.getDao().deleteObject(cls, ids);
        } catch (Exception e) {
            logger.error(e);
        }
        return false;
    }
    @Override
    public boolean deleteObject(Object object){
        try {
            return this.getDao().deleteObject(object);
        } catch (Exception e) {
            logger.error(e);
        }
        return false;
    }
    @Override
    public boolean deleteObject(Class cls, Long id){
        try {
            return this.getDao().deleteObject(findObject(cls, id));
        } catch (Exception e) {
            logger.error(e);
        }
        return false;
    }

    @Override
    public Object findObject(Class cls, Long id) {
        Object object = null;
        try {
            object = this.getDao().findObject(cls, id);
        } catch (Exception ex) {
            logger.error("get object error:" + cls.getName(), ex);
        }
        return object;
    }
    @Override
    public List<?> listQueryEq(Class cls , String propertyName, Object value , int max){
        return this.getDao().listQueryEq(cls, propertyName, value , max);
    }
    @Override
    public List<?> listQueryEq(Class cls ,HashMap<String , Object> propertyMap , int max){
        return this.getDao().listQueryEq(cls, propertyMap,max);
    }
    @Override
    public List<?> listQueryNe(Class cls , String propertyName, Object value , int max){
        return this.getDao().listQueryNe(cls, propertyName, value , max);
    }
    @Override
    public List<?> listQueryEqAndNe(Class cls , String eqName, Object eqValue , String neName, Object neValue ,int max){
        return this.getDao().listQueryEqAndNe(cls, eqName, eqValue, neName, neValue, max);
    }
    @Override
    public List<?> listQuery(Class cls , int max){
        return this.getDao().listQuery(cls,max);
    }
    @Override
    public List<?> listQuery(Class cls, String propertyName, Object value) {
        return this.getDao().listQuery(cls, propertyName, value);
    }
    @Override
    public long getTotalRows(Class cls) {
        return this.getDao().getTotalRows(cls);
    }

    @Override
    public Serializable saveObject(Object object){
        try {
            return this.getDao().saveObject(object);
        } catch (Exception e) {
            logger.error(e);
        }
        return null;

    }

    @Override
    public boolean updateObject(Object object) {
        boolean bool = false;
        try {
            bool = this.getDao().updateObject(object);
        } catch (Exception e) {
            logger.error(e);
        }
        return bool;
    }

    @Override
    public List<?> listAll(Class cls) {
        try {
            return this.getDao().listAll(cls);
        } catch (Exception e) {
            logger.error(e);
        }
        return null;
    }
    @Override
    public List<?> listQuery(Class cls ,HashMap<String , Object> attrMap , HashMap<String , Object> queryMap , int max) {
        return this.getDao().listQuery(cls, attrMap, queryMap, max);
    }
    @Override
    public long getRowCount(Class cls , String propertyName, Object value){
        return this.getDao().getRowCount(cls, propertyName, value);
    }
    @Override
    public long getRowCount(Class cls ,HashMap<String , Object> propertyMap){
        return this.getDao().getRowCount(cls, propertyMap);
    }

    @Override
    public Page pageQuery(Class cls , int pageStart, int pageRecord , String orderby , String order){
        return this.getDao().pageQuery(cls, pageStart, pageRecord, orderby, order);
    }

    public Page pageQuery(Class cls , int pageCurrent, int pageRecord){
        return this.getDao().pageQuery(cls, pageCurrent, pageRecord);
    }
    public Page pageQuery(Class cls , int pageCurrent){
        return this.getDao().pageQuery(cls, pageCurrent, PAGESIZE);
    }
    public Page pageQuery(Class cls , HashMap<String , Object> eqMap , HashMap<String , Object> likeMap , int pageStart, int pageRecord , String orderby , String order){
        return this.getDao().pageQuery( cls,  eqMap, likeMap , pageStart, pageRecord, orderby, order);
    }
}
