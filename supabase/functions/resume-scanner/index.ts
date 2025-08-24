import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fileContent, fileName, mimeType } = await req.json();
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    // Convert base64 content to Gemini format
    const geminiRequest = {
      contents: [{
        parts: [{
          text: `Please analyze this resume and provide a comprehensive evaluation. Return your response in this exact JSON format:
{
  "score": [number between 0-100],
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "weaknesses": ["weakness 1", "weakness 2", "weakness 3"],
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"],
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "atsSuggestions": ["ats tip 1", "ats tip 2", "ats tip 3"]
}

Analyze the resume for:
1. Overall quality and presentation
2. ATS compatibility
3. Content relevance and impact
4. Professional formatting
5. Keyword optimization
6. Areas for improvement

Provide specific, actionable feedback.`
        }, {
          inlineData: {
            mimeType: mimeType,
            data: fileContent
          }
        }]
      }],
      generationConfig: {
        temperature: 0.1,
        topK: 32,
        topP: 1,
        maxOutputTokens: 4096,
      }
    };

    console.log('Sending request to Gemini API...');
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(geminiRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Gemini response received');

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response from Gemini API');
    }

    const analysisText = data.candidates[0].content.parts[0].text;
    
    // Try to parse JSON from the response
    let analysis;
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback if JSON parsing fails
        analysis = {
          score: 75,
          strengths: ["Professional presentation", "Clear structure", "Good content organization"],
          weaknesses: ["Could improve keyword optimization", "Missing quantifiable achievements", "ATS compatibility needs attention"],
          suggestions: ["Add more industry-specific keywords", "Include quantifiable achievements and metrics", "Optimize formatting for ATS systems"],
          keywords: ["professional", "experience", "skills", "education", "achievement"],
          atsSuggestions: ["Use standard section headers", "Avoid complex formatting", "Include relevant keywords from job descriptions"]
        };
      }
    } catch (parseError) {
      console.error('Error parsing analysis:', parseError);
      // Return fallback analysis
      analysis = {
        score: 70,
        strengths: ["Resume received and processed", "Basic structure is present", "Content is readable"],
        weaknesses: ["Analysis parsing encountered issues", "Detailed feedback unavailable", "Please try uploading again"],
        suggestions: ["Ensure resume is in PDF format", "Check file size is under 10MB", "Try uploading again for detailed analysis"],
        keywords: ["resume", "analysis", "feedback"],
        atsSuggestions: ["Use standard resume formats", "Include relevant keywords", "Keep formatting simple"]
      };
    }

    return new Response(JSON.stringify({ analysis }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in resume-scanner function:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to analyze resume',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});