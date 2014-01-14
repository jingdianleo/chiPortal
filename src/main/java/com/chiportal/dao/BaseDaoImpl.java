package com.chiportal.dao;

import com.chiportal.util.Page;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.hibernate.*;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.dao.DataAccessException;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.io.Serializable;
import java.sql.SQLException;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;

/**
 * User: qilei
 * Date: 13-11-25
 * 功能：
 */
@Component("BaseDao")
public class BaseDaoImpl extends HibernateDaoSupport implements BaseDao {
    private static Logger logger = LogManager.getLogger(BaseDaoImpl.class);

    @Resource(name = "sessionFactory")
    public void setSF(SessionFactory sessionFactory) {
        super.setSessionFactory(sessionFactory);
    }

    private synchronized Integer generatePK(String className) throws Exception {
        String hql = "select max(c.id) from " + className + " as c";
        List max = null;
        try {
            max = this.listQuery(hql);
        } catch (Exception e) {
            logger.error("BaseDaoImpl:" + e);
        }
        return (Integer) max.get(0) != null ? (Integer) max.get(0) + 1 : new Integer(1);
    }

    private Integer getPk() throws Exception {
        String hql = "select max(s.id) from SequenceBlock as s";
        List max = null;
        try {
            max = this.listQuery(hql);
        } catch (Exception e) {
            logger.error("BaseDaoImpl:" + e);
        }
        return (Integer) max.get(0) != null ? (Integer) max.get(0) + 1 : new Integer(1);
    }

    /*
        public Serializable saveObject(Object obj) throws Exception{
            java.io.Serializable ser = null;
            try {

                Class[] cl = new Class[1];
                cl[0] = Integer.class;

                Object[] paramValue = new Object[1];
                Integer id = generatePK(obj.getClass().getName());
                paramValue[0] = id;

                Method method = obj.getClass().getMethod("setId", cl);
                method.invoke(obj, paramValue);

                ser = this.getHibernateTemplate().save(obj);
            } catch (DataAccessException e) {
                throw new Exception(e.getMessage());
            }catch (Exception e) {
                logger.error("save object error:" + obj.getClass().getName(), e);
            }
            return ser;
        }
    */
    public Serializable saveObject(Object obj) throws Exception {
        Serializable ser = null;
        try {
            ser = this.getHibernateTemplate().save(obj);
        } catch (DataAccessException e) {
            throw new Exception(e.getMessage());
        } catch (Exception e) {
            logger.error("save object error:" + obj.getClass().getName(), e);
        }
        return ser;
    }

    public boolean updateObject(Object obj) throws Exception {
        boolean is = false;
        try {
            this.getHibernateTemplate().update(obj);
            is = true;
        } catch (DataAccessException e) {
            // TODO Auto-generated catch block
            throw new Exception(e.getMessage());
        }
        return is;
    }

    public Object mergeObject(Object obj) throws Exception {
        Object one = null;
        try {
            one = this.getHibernateTemplate().merge(obj);
        } catch (DataAccessException e) {
            throw new Exception(e.getMessage());
        }
        return one;
    }

    public boolean updateObject(String hql) throws Exception {
        Session session = this.getSession();
        Query query = session.createQuery(hql);
        if (query != null) {
            query.executeUpdate();
            session.getTransaction().commit();
            return true;
        }
        return false;
    }

    public boolean deleteObject(Class<Object> cls, Long[] ids) throws Exception {
        boolean is = false;
        try {
            for (int i = 0; i < ids.length; i++) {
                super.getHibernateTemplate().delete(findObject(cls, ids[i]));
            }
            is = true;
        } catch (Exception e) {
            logger.error("delete object error:" + cls.getName(), e);
        }
        return is;
    }

    public boolean deleteObject(Object object) throws Exception {
        boolean is = false;
        try {
            super.getHibernateTemplate().delete(object);
            is = true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
        return is;
    }

    public void deleteAll(Collection<?> entities) throws Exception {
        try {
            this.getHibernateTemplate().deleteAll(entities);
        } catch (DataAccessException e) {
            throw new Exception(e.getMessage());
        }
    }

    public List<?> listQuery(String hql) throws Exception {
        List list = null;
        try {
            this.getHibernateTemplate().setCacheQueries(true);
            list = this.getHibernateTemplate().find(hql);
        } catch (DataAccessException e) {
            throw new Exception(e.getMessage());
        }
        return list;
    }


    public List<?> listQuery(String hql, Object[] paramValues) throws Exception {
        List list = null;
        try {
            this.getHibernateTemplate().setCacheQueries(true);
            list = getHibernateTemplate().find(hql, paramValues);
        } catch (DataAccessException e) {
            throw new Exception(e.getMessage());
        }
        return list;
    }

    public List<?> listQuery(String hql, Object paramValues) throws Exception {
        List list = null;
        try {
            this.getHibernateTemplate().setCacheQueries(true);
            list = getHibernateTemplate().find(hql, paramValues);
        } catch (DataAccessException e) {
            throw new Exception(e.getMessage());
        }
        return list;
    }

    /**
     * @param first
     * @param max   if first!=0 execute setFirstResult
     *              and if max!=0 execute setMaxResult
     */
    public List<?> listQuery(String hql, int first, int max) throws Exception {
        return listQuery(hql, null, first, max);
    }

    public List<?> listQuery(String hql, Object[] paramsValeus, int first, int max) throws Exception {
        // TODO Auto-generated method stub
        List list = null;
        try {
            this.getHibernateTemplate().setCacheQueries(true);
            Query query = this.getSession().createQuery(hql);
            if (paramsValeus != null && paramsValeus.length > 0) {
                for (int i = 0; i < paramsValeus.length; i++) {
                    query.setParameter(i, paramsValeus[i]);
                }
            }
            if (first != 0) {
                query.setFirstResult(first);
            }
            if (max != 0) {
                query.setMaxResults(max);
            }
            list = query.list();
        } catch (DataAccessException e) {
            throw new Exception(e.getMessage());
        }
        return list;
    }

    public List<?> listQuery(Class cls, HashMap<String, Object> attrMap, HashMap<String, Object> queryMap, int max) {
        Criteria criteria = this.getSession().createCriteria(cls).setMaxResults(max).addOrder(Order.desc("id"));

        Iterator<Entry<String, Object>> attrIt = attrMap.entrySet().iterator();
        Entry<String, Object> attrEntry = null;
        while (attrIt.hasNext()) {
            attrEntry = attrIt.next();
            criteria.add(Restrictions.eq(attrEntry.getKey(), attrEntry.getValue()));
        }

        Iterator<Entry<String, Object>> queryIt = queryMap.entrySet().iterator();
        Entry<String, Object> queryEntry = null;
        while (queryIt.hasNext()) {
            queryEntry = queryIt.next();
            criteria.add(Restrictions.ilike(queryEntry.getKey(), new String("%" + queryEntry.getValue() + "%")));
        }

        return criteria.list();
    }

    public List<?> listQueryNe(Class cls, String propertyName, Object value, int max) {
        return this.getSession().createCriteria(cls).add(Restrictions.ne(propertyName, value)).setMaxResults(max).addOrder(Order.desc("id")).list();
    }

    public List<?> listQueryEq(Class cls, String propertyName, Object value, int max) {
        return this.getSession().createCriteria(cls).add(Restrictions.eq(propertyName, value)).setMaxResults(max).addOrder(Order.desc("id")).list();
    }

    public List<?> listQueryEq(Class cls, HashMap<String, Object> propertyMap, int max) {
        Criteria criteria = this.getSession().createCriteria(cls).setMaxResults(max).addOrder(Order.desc("id"));
        Iterator<Entry<String, Object>> it = propertyMap.entrySet().iterator();
        Entry<String, Object> entry = null;
        while (it.hasNext()) {
            entry = it.next();
            criteria.add(Restrictions.eq(entry.getKey(), entry.getValue()));
        }
        return criteria.list();
    }

    public List<?> listQueryEqAndNe(Class cls, String eqName, Object eqValue, String neName, Object neValue, int max) {
        return this.getSession().createCriteria(cls).add(Restrictions.eq(eqName, eqValue)).add(Restrictions.ne(neName, neValue)).setMaxResults(max).addOrder(Order.desc("id")).list();
    }

    public List<?> listQuery(Class cls, int max) {
        return this.getSession().createCriteria(cls).setMaxResults(max).addOrder(Order.desc("id")).list();
    }

    public List<?> listQuery(Class cls, String propertyName, Object value) {
        return this.getSession().createCriteria(cls).add(Restrictions.eq(propertyName, value)).list();
    }

    public Object findObject(Class c, Serializable serializable) throws Exception {
        // TODO Auto-generated method stub
        Object obj = null;
        try {
            this.getHibernateTemplate().setCacheQueries(true);
            obj = this.getHibernateTemplate().get(c, serializable);
        } catch (DataAccessException e) {
            throw new Exception(e.getMessage());
        }
        return obj;
    }

    public Page<?> pageQuery(Class cls, int pageStart, int pageRecord, String orderby, String order) {
        return this.pageQuery(cls, null, null, pageStart, pageRecord, orderby, order);
    }

    public Page<?> pageQuery(Class cls,  int pageCurrent, int pageSize) {
        int pageStart = (pageCurrent-1)*pageSize;
        return this.pageQuery(cls, null, null, pageStart, pageSize, "id", "desc");
    }

    public Page<?> pageQuery(Class cls, HashMap<String, Object> eqMap, HashMap<String, Object> likeMap, int pageStart, int pageRecord, String orderby, String order) {
        Criteria criteria = this.getSession().createCriteria(cls).setFirstResult(pageStart).setMaxResults(pageRecord);

        if ("desc".equals(order)) {
            criteria.addOrder(Order.desc(orderby));
        } else if ("asc".equals(order)) {
            criteria.addOrder(Order.asc(orderby));
        }

        if (eqMap != null) {
            Iterator<Entry<String, Object>> it = eqMap.entrySet().iterator();
            Entry<String, Object> entry = null;
            while (it.hasNext()) {
                entry = it.next();
                criteria.add(Restrictions.eq(entry.getKey(), entry.getValue()));
            }
        }

        if (likeMap != null) {
            Iterator<Entry<String, Object>> it = likeMap.entrySet().iterator();
            Entry<String, Object> entry = null;
            while (it.hasNext()) {
                entry = it.next();
                criteria.add(Restrictions.ilike(entry.getKey(), new String("%" + entry.getValue() + "%")));
            }
        }

        Page<?> page = new Page();
        page.setDataList(criteria.list());
        Long totalCount = this.getTotalRows(cls);
        page.setPageCount(calculatePageCount(pageRecord, totalCount)); //总页数
        page.setTotalCount(totalCount);

        return page;
    }

    @SuppressWarnings("unchecked")
    public Page pageQuery(String hql, int pageStart, int pageRecord) throws Exception {
        return pageQuery(hql, (Object[]) null, pageStart, pageRecord);
    }

    public Page pageQuery(String hql, Object paramValue, int pageStart, int pageRecord) throws Exception {
        return pageQuery(hql, new Object[]{paramValue}, pageStart, pageRecord);
    }

    /**
     * @param hql          HQL查询语句
     * @param paramsValeus 查询条件参数
     * @param pageStart    当前页起始
     * @param pageRecord   分页数量
     */
    @SuppressWarnings("unchecked")
    public Page pageQuery(final String hql, final Object[] paramsValeus, final int pageStart, final int pageRecord) throws Exception {
        this.getHibernateTemplate().setCacheQueries(true);
        try {
            return (Page) this.getHibernateTemplate().execute(
                    new HibernateCallback<Object>() {
                        public Object doInHibernate(Session session) throws HibernateException, SQLException {
                            Page page = new Page();
                            Query query = session.createQuery(hql);
                            if (paramsValeus != null) {
                                for (int i = 0; i < paramsValeus.length; i++) {
                                    query.setParameter(i, paramsValeus[i]);
                                }
                            }
                            List list = null;
                            try {
                                list = query.list();
                            } catch (Exception e) {
                                logger.error("BaseDaoImpl:" + e);
                            }
                            int totalCount = list.size();
                            query.setFirstResult(pageStart); //
                            query.setMaxResults(pageRecord); //(每页显示条数变量);
                            page.setTotalCount(totalCount); //总记录数
                            page.setPageCount(calculatePageCount(pageRecord, totalCount)); //总页数

                            //page.setPageCurrent(curPage);  //当前页
                            page.setDataList(query.list());
                            session.flush();
                            session.clear();
                            return page;
                        }
                    });
        } catch (DataAccessException e) {
            throw new Exception(e.getMessage());
        }
    }

    /**
     * 根据记录数和每页显示的条数计算总页数
     *
     * @param pageSize     每页显示的记录数
     * @param recoredCount 查询返回的记录总数
     * @return 总页数
     */
    private long calculatePageCount(long pageSize, long recoredCount) {
        long pageCount = 0;
        long _count = recoredCount % pageSize;
        if (_count > 0) {
            if (recoredCount < pageSize) {
                pageCount = 1;
            } else {
                pageCount = recoredCount / pageSize + 1;
            }
        } else {
            pageCount = recoredCount / pageSize;
        }
        return pageCount;
    }

    public Long getTotalRows(Class cls) {
        Criteria criteria = this.getSession().createCriteria(cls);
        criteria.setProjection(Projections.rowCount());
        return (Long) criteria.uniqueResult();
    }

    public Long getRowCount(Class cls, String propertyName, Object value) {
        Criteria criteria = this.getSession().createCriteria(cls).add(Restrictions.eq(propertyName, value));
        criteria.setProjection(Projections.rowCount());
        return (Long) criteria.uniqueResult();
    }

    public Long getRowCount(Class cls, HashMap<String, Object> propertyMap) {
        Criteria criteria = this.getSession().createCriteria(cls);
        Iterator<Entry<String, Object>> it = propertyMap.entrySet().iterator();
        Entry<String, Object> entry = null;
        while (it.hasNext()) {
            entry = it.next();
            criteria.add(Restrictions.eq(entry.getKey(), entry.getValue()));
        }
        criteria.setProjection(Projections.rowCount());
        return (Long) criteria.uniqueResult();
    }

    public List listAll(Class c) throws Exception {
        try {
            return this.getHibernateTemplate().loadAll(c);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
