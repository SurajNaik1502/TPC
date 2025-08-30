import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.54.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WebhookMessage {
  user_id?: string;
  message: string;
  sender?: string;
  timestamp?: string;
  metadata?: Record<string, any>;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Webhook received:', req.method, req.url);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    if (req.method === 'POST') {
      const payload: WebhookMessage = await req.json();
      console.log('Webhook payload:', payload);

      // Validate required fields
      if (!payload.message) {
        return new Response(
          JSON.stringify({ error: 'Message is required' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      // Store the webhook message in the database
      const chatMessage = {
        user_id: payload.user_id || null,
        message: payload.message,
        sender: payload.sender || 'webhook',
        created_at: payload.timestamp ? new Date(payload.timestamp).toISOString() : new Date().toISOString(),
        metadata: payload.metadata || {}
      };

      // If chat_messages table exists, store the message
      const { data: chatData, error: chatError } = await supabase
        .from('chat_messages')
        .insert([chatMessage])
        .select()
        .single();

      if (chatError) {
        console.error('Error storing chat message:', chatError);
        // Continue processing even if storage fails
      } else {
        console.log('Chat message stored:', chatData);
      }

      // Process the message with AI if needed
      let aiResponse = null;
      if (payload.metadata?.processWithAI !== false) {
        try {
          const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
          if (geminiApiKey) {
            const aiPrompt = `
              You are PlacementPro's AI assistant. Respond to this message in a helpful and professional manner:
              
              Message: ${payload.message}
              Sender: ${payload.sender || 'User'}
              
              Provide a concise, relevant response focused on career guidance, job placement, or training assistance.
            `;

            const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                contents: [{
                  parts: [{
                    text: aiPrompt
                  }]
                }],
                generationConfig: {
                  temperature: 0.7,
                  topK: 40,
                  topP: 0.95,
                  maxOutputTokens: 1000,
                }
              })
            });

            if (geminiResponse.ok) {
              const geminiData = await geminiResponse.json();
              aiResponse = geminiData.candidates[0]?.content?.parts[0]?.text || 'I apologize, but I could not process your message at this time.';
              
              // Store AI response
              const aiMessage = {
                user_id: payload.user_id || null,
                message: aiResponse,
                sender: 'assistant',
                created_at: new Date().toISOString(),
                metadata: { 
                  isAIResponse: true, 
                  originalMessage: payload.message,
                  responseToWebhook: true
                }
              };

              await supabase
                .from('chat_messages')
                .insert([aiMessage]);
            }
          }
        } catch (aiError) {
          console.error('Error processing AI response:', aiError);
        }
      }

      // Broadcast the message via Supabase Realtime
      try {
        const channel = supabase.channel('chat_messages');
        await channel.send({
          type: 'broadcast',
          event: 'new_message',
          payload: {
            message: chatMessage,
            aiResponse: aiResponse
          }
        });
      } catch (broadcastError) {
        console.error('Error broadcasting message:', broadcastError);
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Webhook processed successfully',
          data: {
            originalMessage: chatMessage,
            aiResponse: aiResponse
          }
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Handle GET requests for webhook verification
    if (req.method === 'GET') {
      const url = new URL(req.url);
      const challenge = url.searchParams.get('challenge');
      const verify_token = url.searchParams.get('verify_token');
      
      // Simple token verification (you can customize this)
      const expectedToken = Deno.env.get('WEBHOOK_VERIFY_TOKEN') || 'your_verify_token';
      
      if (verify_token === expectedToken && challenge) {
        return new Response(challenge, {
          headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
        });
      }
      
      return new Response('Webhook endpoint is active', {
        headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
      });
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});