//since the hackathon organisers stated "Use of other platforms is permitted only in areas where Bolt is currently less suited" i am using here Google Gemini SDK to leverage AI capabilities for the AI Doctor feature. 
// i tried to find similar functionality in Bolt but it was not available at the time of development.
//in the future if Bolt adds similar functionality, i will switch to it.

import { GoogleGenAI } from "@google/genai";
import conf from "../conf/conf";


const ai = new GoogleGenAI({ apiKey: conf.geminiApiKey });

export class Service {
    
    async generateContent(conversationHistory)  {
        try {
          const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: conversationHistory,
          });
          return response.text;
        } catch (error) {
          console.error("AI Service Error:", error);
          return "Error fetching AI response";
        }
      };
}

const service = new Service()
export default service