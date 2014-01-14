package com.chiportal.service;

import com.chiportal.util.Page;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;

/**
 * User: qilei
 * Date: 13-11-25
 * 功能：
 */

public interface BaseService {
    public Serializable saveObject(Object object);

    public boolean deleteObject(Class cls, String[] ids);

    public boolean deleteObject(Class cls, Long[] ids);

    public boolean deleteObject(Object object);

    public boolean deleteObject(Class cls, Long id);

    public boolean updateObject(Object object);

    public Object findObject(Class cls, Long id);

    public List<?> listQuery(Class cls, int max);
    public List<?> listQueryEq(Class cls, String propertyName, Object value, int max);
    public List<?> listQueryEq(Class cls, HashMap<String, Object> propertyMap, int max);
    public List<?> listQueryNe(Class cls, String propertyName, Object value, int max);
    public List<?> listQueryEqAndNe(Class cls, String eqName, Object eqValue, String neName, Object neValue, int max);
    public List<?> listQuery(Class cls, String propertyName, Object value);
    public List<?> listQuery(Class cls, HashMap<String, Object> attrMap, HashMap<String, Object> queryMap, int max);

    public List<?> listAll(Class cls);

    public long getTotalRows(Class cls);
    public long getRowCount(Class cls, String propertyName, Object value);
    public long getRowCount(Class cls, HashMap<String, Object> propertyMap);

    public Page pageQuery(Class cls, int pageStart, int pageRecord, String orderby, String order);
    public Page pageQuery(Class cls, int pageCurrent, int pageSize);
    public Page pageQuery(Class cls, int pageCurrent);
    public Page pageQuery(Class cls, HashMap<String, Object> eqMap, HashMap<String, Object> likeMap, int pageStart, int pageRecord, String orderby, String order);
}
