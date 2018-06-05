package com.wipro.configuration;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.sql.DataSource;

import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.XMLConfiguration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class ConfigReader {
	
	    static XMLConfiguration config;
	    private static DataSource dataSource;
	    private static final Logger logger = LoggerFactory.getLogger(ConfigReader.class);
	    private static HashMap<String,String> dictionaryWordMap = new HashMap<String,String>();
	    private static List<String> skipPatterns = new ArrayList<String>();
	    private static String UserProject;
	    
		public void setDataSource(DataSource dataSource) {
			this.dataSource = dataSource;
		}
  
		public static String  getParameter(String key){
			
			if  ( config == null ){
				
				try{
					
					URL url  = Thread.currentThread().getContextClassLoader().getResource("/FAQS_config.xml");
					
					if( url == null ) {
						
						url  = Thread.currentThread().getContextClassLoader().getResource("FAQS_config.xml");
					}
				    config = new XMLConfiguration(url );
				}
				catch( ConfigurationException cex )
				{
				    // something went wrong, e.g. the file was not found
					logger.error(cex.getMessage(),cex);
				}
		   }
			
		// logger.log(Level.INFO,"Parameter Key="+key+"="+config.getString(key));	
	        return  config.getString(key);
	   
		}	
		
		public static String []  getParameters(String key){
			
			if  ( config == null ){
				
				try{
					
					URL url  = Thread.currentThread().getContextClassLoader().getResource("/FAQS_config.xml");
					
					if( url == null ) {
						
						url  = Thread.currentThread().getContextClassLoader().getResource("FAQS_config.xml");
					}
				    config = new XMLConfiguration(url );
				}
				catch( ConfigurationException cex )
				{
				    // something went wrong, e.g. the file was not found
					logger.error(cex.getMessage(),cex);
				}
		   }
			
		// logger.log(Level.INFO,"Parameter Key="+key+"="+config.getString(key));	
	        return  config.getStringArray(key);
	   
		}
		
		public static HashMap<String,String> getUsersMap()
		{
			HashMap<String,String> users = new HashMap<String,String>();
			String sql = "select username, password from users";
			Connection conn = null;
			try {
				conn = dataSource.getConnection();
				PreparedStatement ps = conn.prepareStatement(sql);
				ResultSet rs = ps.executeQuery();
				while (rs.next()) {
					users.put(rs.getString("username"), rs.getString("password"));
				}
				rs.close();
				ps.close();
				return users;
			} catch (SQLException e) {
				e.printStackTrace();
				throw new RuntimeException(e);
			} finally {
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						logger.error( e.getMessage(), e);
					}
				}
			}
		}
		
		public static void loadDictionaryMap() throws IOException 
		{
			InputStream stream = null;
			try
		   {
			BufferedReader br ;
			 stream =Thread.currentThread().getContextClassLoader().getResourceAsStream("/words.txt");
			br =new BufferedReader(new InputStreamReader(stream));
			String line =  null;
		    while((line=br.readLine())!=null){
		        String str = line;
		        dictionaryWordMap.put(str, str);
		    }
		    
		    stream =Thread.currentThread().getContextClassLoader().getResourceAsStream("/commonWords.txt");
			br =new BufferedReader(new InputStreamReader(stream));
			while((line=br.readLine())!=null){
		        String str[] = line.split(",");
		        for(int i=0;i<str.length;i++){
		        	dictionaryWordMap.put(str[0], str[1]);
		        }
		    }
			}catch(Exception e)
			{
				logger.error(e.getMessage());
			}
			finally
			{
				stream.close();
			}

		}
		
		public static String  getClientDictionaryMapObj(ServletContext context) throws IOException{
			if(context.getAttribute("dictionary") == null)
			{
				loadDictionaryMap();
				StringBuffer jsonStr = new StringBuffer("{");
				for (Map.Entry<String, String> entry : dictionaryWordMap.entrySet()) {
				    String key = entry.getKey();
				    String value = entry.getValue();
				    if(key != null && !key.isEmpty() && value != null && !value.isEmpty() && !key.contains("'") && !value.contains("'"))
				    jsonStr.append("'"+key+"':'"+value+"',");
				}
				jsonStr.append("'finalstr':'finalstr'}");
				context.setAttribute("dictionary",jsonStr.toString());
				return jsonStr.toString();
			}
			
			return (String)context.getAttribute("dictionary");
				   
		}
		
		public static String  getSkipSpellPatternsObj(ServletContext context) throws IOException{
			if(context.getAttribute("skippatterns") == null)
			{
				InputStream stream = null;
				try
				{
				BufferedReader br ;
				stream =Thread.currentThread().getContextClassLoader().getResourceAsStream("/skipSpellPatterns.txt");
				br =new BufferedReader(new InputStreamReader(stream));
				String line =  null;
				while((line=br.readLine())!=null){
			        String str = line;
			        skipPatterns.add(str);
			    }
				StringBuffer jsonStr = new StringBuffer("");
				for(String pattern : skipPatterns)
				{
					jsonStr.append(pattern + ",");
				}
				jsonStr.append("finalstr");
				context.setAttribute("skippatterns",jsonStr.toString());
				return jsonStr.toString();
				}catch(Exception e)
				{
					logger.error(e.getMessage());
				}
				finally
				{
					stream.close();
				}
			}
			
			return (String)context.getAttribute("skippatterns");
				   
		}
		
	    public static String getUserProject() {
				return UserProject;
			}

			public static void setUserProject(String userProject) {
				UserProject = userProject;
			}


}

