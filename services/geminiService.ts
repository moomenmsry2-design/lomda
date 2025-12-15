import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are ElectroBot, a specialized JSON generator for electronic circuit simulators.
Your ONLY goal is to output valid JSON matching specific interfaces.
Do not speak. Do not explain. Only output JSON.
`;

let aiClient: GoogleGenAI | null = null;

export const initializeGemini = () => {
  if (!process.env.API_KEY) {
    console.error("API_KEY is missing from environment variables.");
    return;
  }
  aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const sendMessageToGemini = async (history: {role: string, text: string}[], newMessage: string): Promise<string> => {
   // Kept for other parts of the app, though unused in Electricity now.
   if (!aiClient) initializeGemini();
   if (!aiClient) return "Error: No API Key";
   
   try {
    const model = aiClient.models;
    let promptContext = "";
    history.forEach(msg => promptContext += `${msg.role}: ${msg.text}\n`);
    promptContext += `User: ${newMessage}\nModel:`;
    
    const response = await model.generateContent({
      model: 'gemini-2.5-flash',
      contents: promptContext,
      config: { systemInstruction: "You are a helpful tutor." }
    });
    return response.text || "Error";
   } catch (e) { return "Error"; }
};

export const generateCircuitFromImage = async (base64Image: string): Promise<any> => {
    if (!aiClient) initializeGemini();
    if (!aiClient) throw new Error("API Key missing");
  
    const prompt = `
      Analyze this circuit image and reconstruct it into a simulation state.
      
      RULES:
      1. Identify components: RESISTOR, BATTERY, LAMP, SWITCH, CAPACITOR, INDUCTOR, DIODE.
      2. Estimate values (e.g., "100" for 100 Ohm, "9" for 9V). Default Resistor: 100, Battery: 9.
      3. Create a logical layout. Use a grid of 800x600.
      4. Connect them with wires.
      
      OUTPUT JSON FORMAT:
      {
        "components": [
          { "id": "c1", "type": "BATTERY", "value": 9, "label": "9V", "x": 100, "y": 300, "rotation": 0, "properties": {} },
          { "id": "c2", "type": "RESISTOR", "value": 100, "label": "100Ω", "x": 300, "y": 300, "rotation": 0, "properties": {} }
        ],
        "wires": [
           { "id": "w1", "sourceId": "c1", "sourceAnchor": "start", "targetId": "c2", "targetAnchor": "start" }
        ]
      }
      
      IMPORTANT:
      - "start" anchor is usually Left or Top.
      - "end" anchor is usually Right or Bottom.
      - Ensure the circuit is closed if possible.
    `;
  
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: {
            parts: [
                { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
                { text: prompt }
            ]
        },
        config: {
            responseMimeType: "application/json"
        }
      });
  
      const text = response.text;
      if (!text) throw new Error("No response text");
      return JSON.parse(text);
    } catch (error) {
      console.error("Circuit Analysis Error:", error);
      throw error;
    }
  };
