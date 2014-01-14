package com.chiportal.dao;

import com.chiportal.util.Page;

import java.io.Serializable;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

/**
 * User: qilei
 * Date: 13-11-25
 * 功能：dao基础操作
 */
public interface BaseDao {

    public Serializable saveObject(Object obj) throws Exception;

    public boolean updateObject(Object obj) throws Exception;

    public boolean updateObject(String hql) throws Exception;

    public Object mergeObject(Object obj) throws Exception;

    public boolean deleteObject(Class<Object> cls, Long[] ids) throws Exception;

    public boolean deleteObject(Object object) throws Exception;

    public void deleteAll(Collection<?> entities) throws Exception;

    public List<?> listQuery(Class cls, int max);

    public List<?> listQueryEq(Class cls, String propertyName, Object value, int max);

    public List<?> listQueryEq(Class cls, HashMap<String, Object> propertyMap, int max);

    public List<?> listQueryNe(Class cls, String propertyName, Object value, int max);

    public List<?> listQueryEqAndNe(Class cls, String eqName, Object eqValue, String neName, Object neValue, int max);

    public List<?> listQuery(Class cls, HashMap<String, Object> attrMap, HashMap<String, Object> queryMap, int max);

    public List<?> listQuery(String hql) throws Exception;

    public List<?> listQuery(String hql, Object paramValue) throws Exception;

    public List<?> listQuery(String hql, Object[] paramValues) throws Exception;

    public List<?> listQuery(String hql, int first, int max) throws Exception;

    public List<?> listQuery(String hql, Object[] paramValues, int first, int max) throws Exception;

    public List<?> listQuery(Class cls, String propertyName, Object value);

    public List<?> listAll(Class c) throws Exception;

    public Object findObject(Class c, Serializable serializable) throws Exception;

    public Page pageQuery(Class cls, int start, int pageRecord, String orderby, String order);

    public Page pageQuery(Class cls, int pageCurrent, int pageSize);

    public Page pageQuery(Class cls, HashMap<String, Object> eqMap, HashMap<String, Object> likeMap, int start, int pageRecord, String orderby, String order);

    public Page pageQuery(String hql, int pageStart, int pageRecord) throws Exception;

    public Page pageQuery(String hql, Object paramValue, int pageStart, int pageRecord) throws Exception;

    public Page pageQuery(String hql, Object[] paramsValeus, int pageStart, int pageRecord) throws Exception;

    public Long getTotalRows(Class cls);

    public Long getRowCount(Class cls, String propertyName, Object value);

    public Long getRowCount(Class cls, HashMap<String, Object> propertyMap);
}

