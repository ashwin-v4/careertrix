import fitz  
from django.conf import settings
import os
from .gemini_api import get_gemini_response

def extract_text_from_resume(resume_file):
    try:
        doc = fitz.open(stream=resume_file.read(), filetype="pdf")
        full_text = ""
        for page in doc:
            full_text += page.get_text()
        return full_text
    except Exception as e:
        print(f"Error processing the resume: {e}")
        return ""



def extract_skills_from_text(text):
    """
    Sends the extracted resume text to the Gemini API to extract skills.
    """
    input_text = f"Here is my resume text: {text}. Please extract the skills mentioned in the text. just provide the skill in a comma separated format no headings no spaces just seperated by commas."
    gemini_response = get_gemini_response(input_text)  
    skills = gemini_response.split(',')
    return [skill.strip() for skill in skills]  