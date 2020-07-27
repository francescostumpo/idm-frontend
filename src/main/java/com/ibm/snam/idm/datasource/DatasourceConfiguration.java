package com.ibm.snam.idm.datasource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
//@PropertySource("file:C:\\apache-tomcat-8.5.51\\conf\\dbConfiguration.properties")
public class DatasourceConfiguration {
	
	Logger logger = LoggerFactory.getLogger(DatasourceConfiguration.class);

	@Value("${DATASOURCE_URL}")
	private String datasourceUrl;

	@Value("${DATASOURCE_NAME}")
	private String datasourceUserName;

	@Value("${DATASOURCE_PASSWORD}")
	private String datasourcePassword;
	
	@Bean
	public DataSource getDataSource() throws InstantiationException, IllegalAccessException, ClassNotFoundException{
		logger.info("Connecting to Datasource....");
		DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
        dataSourceBuilder.url(datasourceUrl);
        dataSourceBuilder.username(datasourceUserName);
        dataSourceBuilder.password(datasourcePassword);
		logger.info("Connected to Datasource - url : " + datasourceUrl);
        return dataSourceBuilder.build();
	}
	
}
