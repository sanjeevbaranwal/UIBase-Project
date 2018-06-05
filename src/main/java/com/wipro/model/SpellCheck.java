/**
 * 
 */
package com.wipro.model;

import java.util.ArrayList;
import java.util.List;

/**
 * @author SU360282
 *
 */
public class SpellCheck {
	
	private String inputText;
	private boolean isAutoCorrect;
	private List<SpellSuggestion> spellSuggestionList=new ArrayList<SpellSuggestion>();
	
	public String getInputText() {
		return inputText;
	}
	public void setInputText(String inputText) {
		this.inputText = inputText;
	}
	public boolean getIsAutoCorrect() {
		return isAutoCorrect;
	}
	public void setIsAutoCorrect(boolean isAutoCorrect) {
		this.isAutoCorrect = isAutoCorrect;
	}
	public List<SpellSuggestion> getSpellSuggestionList() {
		return spellSuggestionList;
	}
	public void setSpellSuggestionList(List<SpellSuggestion> spellSuggestionList) {
		this.spellSuggestionList = spellSuggestionList;
	}
	public void setAutoCorrect(boolean isAutoCorrect) {
		this.isAutoCorrect = isAutoCorrect;
	}
	
	

}
