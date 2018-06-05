
package com.wipro.controller;

import java.io.BufferedReader;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.InetSocketAddress;
import java.net.Proxy;
import java.net.URL;
import java.util.HashMap;
import java.util.Properties;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sound.sampled.AudioFileFormat;
import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioFormat.Encoding;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.ws.rs.core.Response.Status;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.client.config.ClientConfig;
import com.sun.jersey.api.client.config.DefaultClientConfig;
import com.wipro.configuration.ConfigReader;
import com.wipro.model.ASRResponse;
import com.wipro.model.MessageBean;



@Controller
public class CMSController {

	private static final Logger logger = LoggerFactory.getLogger(CMSController.class);
	private static final String SpeechToTextService = "SpeechToTextService";
	private static final String TextToSpeechService = "TextToSpeechService";
	private static final String ServiceAppend = "&configFile=asrConfig.xml";
	
	@RequestMapping("favicon.ico")
     String favicon() {
         return "forward:/resources/images/favicon.ico";
     }
	 
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String greetUserWelcome(@ModelAttribute("messageBean")
		    MessageBean messageBean,BindingResult result, ModelMap model, 
		    HttpServletRequest request, HttpServletResponse response) {
		 try{
			 /*String user = (String) request.getAttribute("loggedInUser");
			 if (user.equals("admin")) {
				 return "admin";  
			 }
			 else if (user.equals("guest")){
				 return "main_test";
			 }*/
			 if (request.isUserInRole("ROLE_ADMIN")) {
					response.sendRedirect("admin");
			 }
		 }catch(Exception e){
			 logger.error(e.getMessage(),e);
		 }
        return "login";
	 }

	 
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String getLogin(@ModelAttribute("messageBean")
		    MessageBean messageBean,BindingResult result, ModelMap model, 
		    HttpServletRequest request,  HttpServletResponse response) {
		 	try{
			 if (request.isUserInRole("ROLE_ADMIN")) {
				 response.sendRedirect("admin"); 
			 }
			 else if (request.isUserInRole("ROLE_USER")){
				 response.sendRedirect("chat");
			 }
		 }catch(Exception e){
			 logger.error(e.getMessage(),e);
		 }
		 return "login";
    }

	 
	@RequestMapping(value = "/error", method =RequestMethod.GET)
	public String getErrorPage(@ModelAttribute("messageBean")
		    MessageBean messageBean,BindingResult result, ModelMap model, 
		    HttpServletRequest request,HttpServletResponse response) {		 
	     model.addAttribute("message", "Welcome User");
	     return "login";
	}
	
	@RequestMapping(value = "/main_test", method = RequestMethod.GET)
	public String callMain_test(Model model,HttpServletRequest request, HttpServletResponse response) {	
			try{
	    	   String username =request.getUserPrincipal().getName();
	           model.addAttribute("userId",username);
	       }catch(Exception e){
	    	   logger.error(e.getMessage(),e);
	       }
        return "main_test";
    }
	@RequestMapping(value = "/chat", method = RequestMethod.GET)
	public String callChat(Model model,HttpServletRequest request,   HttpServletResponse response) {	
	        return "main_test";
    }
	
	@RequestMapping(value = "/selfLearning", method = 
            RequestMethod.GET)
	public String callselfLearning(Model model,HttpServletRequest request, HttpServletResponse response) {	
	        return "selfLearning";
    }
	
	@RequestMapping(value = "/adminExpertLearning", method = 
            RequestMethod.GET)
	public String calladminExpertLearning(Model model,HttpServletRequest request, HttpServletResponse response) {	
	        return "adminExpertLearning";
    }
	
	@RequestMapping(value = "/assistedLearning", method = RequestMethod.GET)
	public String callAssistedLearning(Model model,HttpServletRequest request, HttpServletResponse response) {	
	        return "assistedLearning";
    }
	
	@RequestMapping(value = "/userProfilerAdmin", method = 
            RequestMethod.GET)
	public String callUserProfilerAdmin(Model model,HttpServletRequest request, HttpServletResponse response) {	
	        return "userProfilerAdmin";
    }
	
	@RequestMapping(value = "/feedBack", method = 
            RequestMethod.GET)
	public String callfeedBack(Model model,HttpServletRequest request, HttpServletResponse response) {	
	        return "feedBack";
    }
	
	@RequestMapping(value ="/admin", method = RequestMethod.GET)
    public String callAdmin( Model model,HttpServletRequest request, HttpServletResponse response){
       try{
    	   String username =request.getUserPrincipal().getName();
           model.addAttribute("userId",username);
       }catch(Exception e){
    	   logger.error(e.getMessage(),e);
       }
        return "admin";        
    }	
	
	@RequestMapping(value ="/addKB", method = RequestMethod.GET)
    public String calladdKB( Model model,HttpServletRequest request,HttpServletResponse response){
		 try{
	    	   String username =request.getUserPrincipal().getName();
	           model.addAttribute("userId",username);
	       }catch(Exception e){
	    	   logger.error(e.getMessage(),e);
	       }
      return "addKB";        
    }
	
	@RequestMapping(value ="/KBManager", method = RequestMethod.GET)
    public String callKBManager( Model model,HttpServletRequest request, HttpServletResponse response){
		 try{
	    	   String username =request.getUserPrincipal().getName();
	           model.addAttribute("userId",username);
	       }catch(Exception e){
	    	   logger.error(e.getMessage(),e);
	       }
      return "KBManager";        
    }
	
	@RequestMapping(value ="/KBManagerAddKB", method = RequestMethod.GET)
    public String callKBManagerAddKB( Model model,HttpServletRequest request, HttpServletResponse response){
		 try{
	    	   String username =request.getUserPrincipal().getName();
	           model.addAttribute("userId",username);
	       }catch(Exception e){
	    	   logger.error(e.getMessage(),e);
	       }
      return "KBManagerAddKB";        
    }

	@RequestMapping(value ="/KBSearch", method = RequestMethod.GET)
    public String callKBSearch( Model model,HttpServletRequest request, HttpServletResponse response){
		 try{
	    	   String username =request.getUserPrincipal().getName();
	           model.addAttribute("userId",username);
	       }catch(Exception e){
	    	   logger.error(e.getMessage(),e);
	       }
      return "KBSearch";        
    }

	@RequestMapping(value ="/KBSearchResults", method = RequestMethod.GET)
    public String callKBSearchResults( Model model,HttpServletRequest request, HttpServletResponse response){
		 try{
	    	   String username =request.getUserPrincipal().getName();
	           model.addAttribute("userId",username);
	       }catch(Exception e){
	    	   logger.error(e.getMessage(),e);
	       }
      return "KBSearchResults";        
    }

	@RequestMapping(value ="/KBSearchResultDetails", method = RequestMethod.GET)
    public String callKBSearchResultDetails( Model model,HttpServletRequest request, HttpServletResponse response){
		 try{
	    	   String username =request.getUserPrincipal().getName();
	           model.addAttribute("userId",username);
	       }catch(Exception e){
	    	   logger.error(e.getMessage(),e);
	       }
      return "KBSearchResultDetails";        
    }

	@RequestMapping(value ="/ontologymanager", method = RequestMethod.GET)
    public String callOntologyManager( Model model,HttpServletRequest request, HttpServletResponse response){
       try{
    	   String username =request.getUserPrincipal().getName();
           model.addAttribute("userId",username);
       }catch(Exception e){
    	   
       }
        return "ontologymanager";        
    }
	
	@RequestMapping(value ="/projectontologymanager", method = RequestMethod.GET)
    public String callProjectOntologyManager( Model model,HttpServletRequest request, HttpServletResponse response){
       try{
    	   String username =request.getUserPrincipal().getName();
    	   String project = request.getParameter("project");
           model.addAttribute("userId",username);
           model.addAttribute("project", project);
       }catch(Exception e){
    	   
       }
        return "projectontologymanager";        
    }

	@RequestMapping(value = "/faq", method = RequestMethod.POST)
	@ResponseBody
	public String processMessage(@RequestBody String json) {
		String result = " ";
	    return result;
	}
	
	@RequestMapping(value = "/pageload", method = RequestMethod.POST)
	@ResponseBody
	public String onPageLoad(@RequestBody String json) {
		String result = " ";
	    return result;
	}
	
	@RequestMapping(value = "/faqload", method = RequestMethod.POST)
	@ResponseBody
	public String onFaqLoad(@RequestBody String json) {
		String result = " ";
	    return result;
	}
	
	@RequestMapping(value = "/latestload", method = RequestMethod.POST)
	@ResponseBody
	public String onLatestLoad(@RequestBody String json) {
		String result = " ";
	    return result;
	}
	
	@RequestMapping(value = "/dateRangeload", method = RequestMethod.POST)
	@ResponseBody
	public String onDateRangeLoad(@RequestBody String json) {
		String result = " ";
	    return result;
	}
	
	@RequestMapping(value = "/loadChatHistory", method = RequestMethod.POST)
	@ResponseBody
	public String onloadChatHistory(@RequestBody String transId) {
		String result = " ";
	    return result;
	}

	@RequestMapping(value = "/totalLoad", method = RequestMethod.POST)
	@ResponseBody
	public String ontotalLoad(@RequestBody String json) {
		String result = " ";
	    return result;
	}
		
	@RequestMapping(value = "/userList", method = RequestMethod.POST)
	@ResponseBody
	public String onUserList(@RequestBody String json) {
		String result = " ";
	    return result;
	}
	
	@RequestMapping(value = "/getFeedback", method = RequestMethod.POST)
	@ResponseBody
	public String onGetFeedback(@RequestBody String json) {
		String result = " ";
	    return result;
	}
	
	@RequestMapping(value = "/setFeedback", method = RequestMethod.POST)
	@ResponseBody
	public String onSetFeedback(@RequestBody String json) {
		String result = " ";
	    return result;				
	}
		
	@RequestMapping(value = "/selfLearning/add", method = RequestMethod.POST)
    @ResponseBody
    public String saveSelfLearningData(@RequestBody String param) {
		String result = " ";
	    return result;
    }
	
	@RequestMapping(value = "/selfLearning/update/{param}", method = RequestMethod.GET)
	@ResponseBody
	public String updateSelfLearningData(@PathVariable String param) {
		String result = " ";
	    return result;
	}
	
	@RequestMapping(value = "/getAllSLData", method = RequestMethod.POST)
	@ResponseBody
	public String ongetAllSLData(@RequestBody String json) {
		String result = " ";
	    return result;
	}
	
	@RequestMapping(value = "/getAppNames", method = RequestMethod.POST)
	@ResponseBody
	public String ongetAppNames() {
		String result = " ";
	    return result;
	}
	
	@RequestMapping(value = "/getQueByAppName", method = RequestMethod.POST)
	@ResponseBody
	public String ongetQueByAppName(@RequestBody String json) {
		
		String result = " ";
	    return result;
	}
	
	@RequestMapping(value = "/getNounsVerbs", method = RequestMethod.POST)
	@ResponseBody
	public String ongetNounsVerbs(@RequestBody String json) {
		
		String result = " ";
	    return result;
	}
		
	@RequestMapping(value = "/saveInOWLFile", method = RequestMethod.POST)
	@ResponseBody	
	public String onsaveInOWLFile(@RequestBody String json) {

		String result = " ";
	    return result;
	}
		
	@RequestMapping(value = "/deleteTransIDs", method = RequestMethod.POST)
	@ResponseBody
	public String ondeleteTransIDs(@RequestBody String json) {
		String result = " ";
	    return result;
	}
	
	@RequestMapping(value="/uploadfile", method=RequestMethod.POST)
    public @ResponseBody String handleFileUpload( Model model,HttpServletRequest request,
            HttpServletResponse response, @RequestParam("file") MultipartFile file ){
    		String result = " ";
    		return result;
		
    }
	
	@RequestMapping(value = "/ProcessFile", method = RequestMethod.POST)
	@ResponseBody
	public String onProcessFile(@RequestBody String json) {
		String result = " ";
	    return result;
	}
	
	@RequestMapping(value = "/saveNewKBNodeInOWLFile", method = RequestMethod.POST)
    @ResponseBody
    public String saveNewKBNodeInOWLFile(@RequestBody String json) {
		String result = " ";
	    return result;
    }

	@RequestMapping(value = "/getAllKBData", method = RequestMethod.POST)
	@ResponseBody
	public String ongetAllKBData(@RequestBody String json) {
		String result = " ";
	    return result;
	}
	
	@RequestMapping(value = "/getAllKBStatus", method = RequestMethod.POST)
	@ResponseBody
	public String ongetAllKBStatus(@RequestBody String json) {
		
		String result = " ";
	    return result;
	}
	
	@RequestMapping(value = "/KBManager/add", method = RequestMethod.POST)
    @ResponseBody
    public String saveKBManagerData(@RequestBody String param) {
		String result = " ";
	    return result;
    }
	
	@RequestMapping(value = "/KBManager/get", method = RequestMethod.POST)
    @ResponseBody
    public String getKBManagerData(@RequestBody String param) {
		String result = " ";
	    return result;
    }
	
	@RequestMapping(value = "/KBManager/addNodeInOntology", method = RequestMethod.POST)
    @ResponseBody
    public String addNodeInOntology(@RequestBody String param) {
		String result = " ";
	    return result;
    }
	
	@RequestMapping(value = "/assistedOntologyManager", method = RequestMethod.GET)
	public String callAssistedOntologyManagerLearning(Model model,HttpServletRequest request, HttpServletResponse response) {	
	        return "assistedOntologyManager";
    }
	
	@RequestMapping(value = "/dialogue", method = RequestMethod.GET)
	public String getDialogue(@ModelAttribute("messageBean")
		    MessageBean messageBean,BindingResult result, ModelMap model, 
		    HttpServletRequest request,  HttpServletResponse response) {
		
		 response.addHeader("Access-Control-Allow-Origin", "*");
	     response.addHeader("Access-Control-Allow-Methods", "POST, GET");
	     response.addHeader("Access-Control-Allow-Headers", "X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept");
		
		HashMap<String,String> userList = ConfigReader.getUsersMap();
		
		String user = (String)request.getParameter("username");
		String password = (String)request.getParameter("password");
		if(user != null && userList.containsKey(user) && userList.get(user).equals(password))
		{
			messageBean.setUserId(user);
			return "dialogue";
		}
		else
		 return "dialogueLogin";
		 
    }
	
	@RequestMapping(value = "/service", method = RequestMethod.GET)
	public String getService(@ModelAttribute("messageBean")
		    MessageBean messageBean,BindingResult result, ModelMap model, 
		    HttpServletRequest request,  HttpServletResponse response) {
				
		HashMap<String,String> userList = ConfigReader.getUsersMap();
		
		String domain = (String)request.getParameter("domain");
		String password = (String)request.getParameter("password");
		if(domain != null && userList.containsKey(domain) && userList.get(domain).equals(password))
		{
			messageBean.setUserId(domain);
			return "servicepage";
		}
		return "main_test";
		 
    }
	
	@RequestMapping(value = "/downloadExcel", method = RequestMethod.GET)
	public void downloadExcel(@ModelAttribute("messageBean")
		    MessageBean messageBean,BindingResult result, ModelMap model, 
		    HttpServletRequest request,  HttpServletResponse response) throws IOException {
		File file = new File("D:\\HMIPlatformCodeBase\\OntologyData.xlsx");
	    InputStream in = null;
	    OutputStream outstream = null;
	    try {
	      response.reset();
	      in = new FileInputStream(file);
	      response.setContentType("application/vnd.ms-excel");
	      response.addHeader("content-disposition", "attachment; filename=data.xls");
	      outstream = response.getOutputStream();
	      IOUtils.copyLarge(in, outstream);
	     }
	    catch (Exception e) {
	    	response.getWriter().write("Unable to download file");
	    }finally {
	        IOUtils.closeQuietly(outstream);
	        IOUtils.closeQuietly(in);
	        if (file != null)
	            file.delete();
	    }
		 
    }
	
	@RequestMapping(value = "/recordWav", method = RequestMethod.POST)
    @ResponseBody
    public String recordFile(HttpServletRequest request,  HttpServletResponse response) {
		String outputStr = "";
		   try {
			   BufferedReader in;
	            String url = request.getParameter("myUrl");
	            url = url.replace("data:audio/wav;base64,", "");
	            url = url.replace(" ", "+");
	            byte[] bytes = url.getBytes();
	            byte[] valueDecoded = Base64.decodeBase64(bytes);
	            String charset = "UTF-8";
	            	 
	            final File file1 = new File("infile");
	            FileUtils.writeByteArrayToFile(file1, valueDecoded);
	            final AudioInputStream in1 = AudioSystem.getAudioInputStream(file1);
	            
	            final File file2 = new File("outfile");
	            final AudioFormat inFormat = getOutFormat(in1.getFormat());
	            final AudioInputStream in2 = AudioSystem.getAudioInputStream(inFormat, in1);
	          //write the audio file in targeted pitch file
	           AudioSystem.write(in2, AudioFileFormat.Type.WAVE, file2);
	          
	           String url1 = ConfigReader.getParameter(SpeechToTextService);
	            URL obj = new URL(url1);
	           // Proxy proxy = new Proxy(Proxy.Type.HTTP, new InetSocketAddress("proxy2.wipro.com", 8080));
	            HttpURLConnection con = (HttpURLConnection) obj.openConnection();
	    		con.setRequestMethod("POST");
	    		con.setRequestProperty("Content-Type", "audio/x-wav; rate=8000");
	    		con.setDoOutput(true);
	    		IOUtils.copy(new FileInputStream(file2), con.getOutputStream());
	    		String responseCode = IOUtils.toString(con.getInputStream(), charset);
	    		
	            /*HttpURLConnection con = (HttpURLConnection) new URL(url1)
	                    .openConnection();
	            con.setRequestMethod("POST");
	            con.setRequestProperty("Content-Type", "audio/x-wav ; rate=8000");
	            con.setDoOutput(true);
	            IOUtils.copy(new FileInputStream(file2), con.getOutputStream());
	            String responseCode = con.getResponseMessage();*/
	            
	            System.out.println(responseCode);
	           // System.out.println(con.getInputStream().available());
	            //in = new BufferedReader(new InputStreamReader(con.getInputStream()));
	            //String inputLine;
	            ASRResponse asrresponse;
	            if(responseCode != null && !responseCode.isEmpty()) {
	            	 Gson gson=new Gson();
	            	 asrresponse=gson.fromJson(responseCode, ASRResponse.class);
	            	 System.out.println("Text for Voice:"+asrresponse.getHypotheses().get(0).getUtterance());
	            	 outputStr = asrresponse.getHypotheses().get(0).getUtterance();
	            }
	          
	                      
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
		   
		   return outputStr;
    }
	
	@RequestMapping(value = "/playWav", method = RequestMethod.GET)
    @ResponseBody
    public String playFile(HttpServletRequest request,  HttpServletResponse response) {
		String outputStr = "";
		String val = request.getParameter("input");
		val = val.replaceAll(" ", "%20");
		String BASE_URI = ConfigReader.getParameter(TextToSpeechService)+val;
		   try {
	            ClientConfig config=new DefaultClientConfig();	            
			    Client client = Client.create();

	            WebResource objWebResource = client.resource(BASE_URI);
	            ClientResponse responseObj = objWebResource.path("/")
	                    .type("audio/mpeg").get(ClientResponse.class);
	            OutputStream outputStream = null;
                File playFile = new File("voicefile");
	            System.out.println("response : " + response);
	            if (responseObj.getStatus() == Status.OK.getStatusCode()
	                    && responseObj.hasEntity()) {
	                InputStream is = (InputStream)responseObj.getEntity(InputStream.class);
	                
	                outputStream =
	                        new FileOutputStream(playFile);

	    		int read = 0;
	    		byte[] bytes1 = new byte[1024];

	    		while ((read = is.read(bytes1)) != -1) {
	    			outputStream.write(bytes1, 0, read);
	    		}

	    		System.out.println("Speech Done!");
	            }
	            
	            response.setContentType("audio/x-wav");
	    		ServletOutputStream outStream = response.getOutputStream();
	    		response.setHeader("Accept-Ranges", "bytes");
	    		InputStream resourceAsStream = new FileInputStream(playFile);
	    		IOUtils.copy(resourceAsStream, outStream);
	          
	                      
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
		   
		   return outputStr;
    }
	
	private static AudioFormat getOutFormat(AudioFormat inFormat) {
 		int ch = inFormat.getChannels();
 		float rate = inFormat.getSampleRate();	
 		return new AudioFormat(Encoding.PCM_SIGNED, 8000, 16, ch, ch * 2, rate,
 				inFormat.isBigEndian());
 	}

}
