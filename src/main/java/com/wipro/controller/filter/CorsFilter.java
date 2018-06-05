package com.wipro.controller.filter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * 
 * @author SU357848
 */
public class CorsFilter implements Filter {
    public static final String ACCESS_CONTROL_ALLOW_ORIGIN_NAME = "Access-Control-Allow-Origin";
    public static final String DEFAULT_ACCESS_CONTROL_ALLOW_ORIGIN_VALUE = "*";

    public static final String ACCESS_CONTROL_ALLOW_METHDOS_NAME = "Access-Control-Allow-Methods";
    public static final String DEFAULT_ACCESS_CONTROL_ALLOW_METHDOS_VALUE = "POST, GET";

    public static final String ACCESS_CONTROL_MAX_AGE_NAME = "Access-Control-Max-Age";
    public static final String DEFAULT_ACCESS_CONTROL_MAX_AGE_VALUE = "3600";
    
    public static final String CACHE_CONTROL = "Cache-Control";
    public static final String CACHE_CONTROL_VALUE= "private";

    public static final String ACCESS_CONTROL_ALLOW_HEADERS_NAME = "Access-Control-Allow-Headers";
    public static final String DEFAULT_ACCESS_CONTROL_ALLOW_HEADERS_VALUE = "X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept,application/json; charset=UTF-8";

    private String accessControlAllowOrigin = DEFAULT_ACCESS_CONTROL_ALLOW_ORIGIN_VALUE;
    private String accessControlAllowMethods = DEFAULT_ACCESS_CONTROL_ALLOW_METHDOS_VALUE;
    private String accessControlAllowMaxAge = DEFAULT_ACCESS_CONTROL_MAX_AGE_VALUE;
    private String accessControlAllowHeaders = DEFAULT_ACCESS_CONTROL_ALLOW_HEADERS_VALUE;
    private String cacheControlValue = CACHE_CONTROL_VALUE;

    /**
     * @return the method return a map that associated the name of paramiters in the web.xml to the class variable name for the header binding*/
    private Map<String,String> initConfig(){
        Map<String, String> result = new HashMap<>();

        result.put(ACCESS_CONTROL_ALLOW_ORIGIN_NAME,"accessControlAllowOrigin");
        result.put(ACCESS_CONTROL_ALLOW_METHDOS_NAME,"accessControlAllowMethods");
        result.put(ACCESS_CONTROL_MAX_AGE_NAME,"accessControlAllowMaxAge");
        result.put(ACCESS_CONTROL_ALLOW_HEADERS_NAME,"accessControlAllowHeaders");
        result.put(CACHE_CONTROL,"cacheControlValue");

        return result;
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        String initParameterValue;
        Map<String, String> stringStringMap = initConfig();

        for (Map.Entry<String, String> stringStringEntry : stringStringMap.entrySet()) {
            initParameterValue = filterConfig.getInitParameter(stringStringEntry.getKey());

            // if the init paramiter value isn't null then set the value in the correct http header
            if(initParameterValue!=null){
                try {
                    getClass().getDeclaredField(stringStringEntry.getValue()).set(this, initParameterValue);
                } catch (IllegalAccessException | NoSuchFieldException ignored) { }
            }
        }
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) servletResponse;

		/*try {
			Field f = servletRequest.getClass().getDeclaredField("request");
			f.setAccessible(true); // grant access to (protected) field
	        Request realRequest = (Request)f.get(servletRequest);
	        Principal userPrincipal = realRequest.getUserPrincipal();
	        String user = userPrincipal.toString();
	        servletRequest.setAttribute("loggedInUser", user);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}*/
        
        response.setHeader(ACCESS_CONTROL_ALLOW_ORIGIN_NAME, accessControlAllowOrigin);
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpSession session = request.getSession(false);
        String project = servletRequest.getParameter("userproject");
        if(project != null)
        session.setAttribute("project", project);
        response.setHeader(ACCESS_CONTROL_ALLOW_METHDOS_NAME, accessControlAllowMethods);
        response.setHeader(ACCESS_CONTROL_MAX_AGE_NAME, accessControlAllowMaxAge);
        response.setHeader(ACCESS_CONTROL_ALLOW_HEADERS_NAME, accessControlAllowHeaders);
        response.setHeader(CACHE_CONTROL, cacheControlValue);

        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {
    }

}
