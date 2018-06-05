/**
 * 
 */
package com.wipro.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.wipro.cto.spellcorrection.SpellCorrectionUtil;
import com.wipro.model.SpellCheck;
import com.wipro.model.SpellSuggestion;

/**
 * @author SU360282
 *
 */
@Controller
public class SpellCheckController {
	private static final Logger logger = LoggerFactory.getLogger(SpellCheckController.class);
	
	@RequestMapping(value = "/getAutoSpellChecker", method = RequestMethod.POST)
	@ResponseBody
	public String callSpellChecker(@RequestBody String strInput) {	
	    String strResult="";
	    Gson gson=new Gson();
	    logger.debug("Inside callSpellChecker "+strInput);
	    SpellCheck spellCheck=gson.fromJson(strInput, SpellCheck.class);
	    logger.debug("Inside callSpellChecker json string :-"+spellCheck.getInputText());
	    //strResult=SpellCorrectionUtil.getAutoCorrectedValue(spellCheck.getInputText());
	    List<String> suggestionlst=SpellCorrectionUtil.getCorrectedorSuggestions(spellCheck.getInputText());
	    spellCheck=buildSpellCheckerObject(suggestionlst,spellCheck.getInputText());
	    strResult=gson.toJson(spellCheck);
	    logger.debug("Executed callSpellChecker returned string :-"+strResult);
		return strResult;
    }
	private SpellCheck buildSpellCheckerObject(List<String> strResult,String strInput){
		SpellCheck spellCheck=new SpellCheck();
		spellCheck.setInputText(strInput);
		
		if(strResult!=null && strResult.size()>0){
			SpellSuggestion spellSuggestion[]=new SpellSuggestion[strResult.size()];
			for(int i=0;i< strResult.size();i++){
				spellSuggestion[i]=new SpellSuggestion();
				spellSuggestion[i].setId(""+i);
				spellSuggestion[i].setSpellSuggestionWord(strInput);
				spellSuggestion[i].setSpellSuggestion(strResult.get(i));
				spellCheck.getSpellSuggestionList().add(spellSuggestion[i]);
			}
			if(strResult.size()==1){
				spellCheck.setIsAutoCorrect(true);
			}else{
				spellCheck.setIsAutoCorrect(false);
			}
		}
		spellCheck.setInputText(strInput);
		
		return spellCheck;
		
	}
	
	public static void main(String[] args) {
		String strResult="haev";
	    logger.debug("Inside callSpellChecker json string :-"+strResult);
	    strResult="{inputText:\"prescriptor \",spellSuggestionList:[{spellSuggestionWord:\"prescriptor \"}]}";
	    SpellCheckController spellCheckController=new SpellCheckController();
	    strResult=spellCheckController.callSpellChecker(strResult);
	    System.out.println("SpellCheckController.main()"+strResult);
	}

}
