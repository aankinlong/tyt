package com.bquan.service.read;

import java.util.List;
import java.util.Map;

import com.bquan.bean.WebDomainBean;
import com.bquan.entity.mysql.WebDomain;

/**
 * 列表设置属性 Service读数据接口
 * @author liuxiaokang
 * @createTime 2016-08-20
 */
public interface WebDomainReadService extends BaseReadService<WebDomain>{

	public List<WebDomainBean> convertData(List<WebDomain> webDomainList);
	
	public List<WebDomain> finddeptlist(Map<String,Object> map);
	
	public WebDomainBean convertToBean(WebDomain webDomain);
}


