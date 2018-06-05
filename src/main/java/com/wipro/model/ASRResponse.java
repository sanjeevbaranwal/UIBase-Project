package com.wipro.model;

import java.util.List;

/**
 * @author SU357848
 *
 */
public class ASRResponse {

	private List<ASRUtterance> hypotheses;
	private String id;
	private String status;

	
	public List<ASRUtterance> getHypotheses() {
		return hypotheses;
	}
	public void setHypotheses(List<ASRUtterance> hypotheses) {
		this.hypotheses = hypotheses;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}

	
}
