package com.chiportal.util;

import java.util.List;

public class Page<T> {
    private List<T> dataList;
    private long totalCount; //总记录数
    private long pageCount; //总页数
    private int pageCurrent; //当前页
    private int previouspage;//上一页
    private int nextpage; //下一页

    public long getPageCount() {
        return pageCount;
    }
    public void setPageCount(long pageCount) {
        this.pageCount = pageCount;
    }
    public int getPageCurrent() {
        return pageCurrent;
    }
    public void setPageCurrent(int pageCurrent) {
        this.pageCurrent = pageCurrent;
    }
    public int getPreviouspage() {
        return previouspage;
    }
    public void setPreviouspage(int previouspage) {
        this.previouspage = previouspage;
    }
    public int getNextpage() {
        return nextpage;
    }
    public void setNextpage(int nextpage) {
        this.nextpage = nextpage;
    }
    public void setDataList(List<T> dataList) {
        this.dataList = dataList;
    }
    public List<T> getDataList() {
        return dataList;
    }
    public void setTotalCount(long totalCount) {
        this.totalCount = totalCount;
    }
    public long getTotalCount() {
        return totalCount;
    }
}
