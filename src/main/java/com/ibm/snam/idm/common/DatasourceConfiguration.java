package com.ibm.snam.idm.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class DatasourceConfiguration {

    Logger logger = LoggerFactory.getLogger(DatasourceConfiguration.class);

    @Value("${DATASOURCE_URL}")
    private String datasourceUrl;

    @Value("${DATASOURCE_NAME}")
    private String datasourceUserName;

    @Value("${DATASOURCE_PASSWORD")
    private String datasourcePassword;

    @Bean
    public DataSource getDataSource() throws InstantiationException, IllegalAccessException, ClassNotFoundException{
        logger.info("Connecting to Datasource....");
        DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
        //dataSourceBuilder.driverClassName("com.ibm.db2.jdbc.DB2Driver");

        if(datasourceUrl == null) {
            logger.info("init datasource - Env variables not found, trying default..");
            datasourceUrl = "jdbc:db2://dashdb-txn-flex-yp-fra02-550.services.eu-de.bluemix.net:50000/BLUDB";
            datasourceUserName = "bluadmin";
            datasourcePassword = "Passwordai4cm-dev";
            //datasourceUrl = "jdbc:db2://dashdb-txnha-flex-yp-fra02-146.services.eu-de.bluemix.net:50000/BLUDB";
            //datasourceUserName = "bluadmin";
            //datasourcePassword = "NjY2ZjFhOWYzNWU2";
        }
        dataSourceBuilder.url(datasourceUrl);
        dataSourceBuilder.username(datasourceUserName);
        dataSourceBuilder.password(datasourcePassword);
        logger.info("Connected to Datasource - url : " + datasourceUrl);
        return dataSourceBuilder.build();
    }

}
