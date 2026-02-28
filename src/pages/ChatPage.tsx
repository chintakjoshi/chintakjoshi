import type { FormEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Layout } from '../components/Layout';

type ChatSender = 'bot' | 'user';

type Message = {
  id: number;
  sender: ChatSender;
  text: string;
};

const STORAGE_TOKEN = 'chatbot_token';
const STORAGE_TOKEN_EXPIRY = 'chatbot_token_expiry';
const DEFAULT_CHATBOT_API_URL = '';
const DEFAULT_CHATBOT_API_KEY = '';

async function parseJsonResponse(response: Response) {
  const contentType = response.headers.get('content-type') || '';

  if (!contentType.includes('application/json')) {
    throw new Error(`Server returned ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  const chatbotApiUrl = (
    import.meta.env.REACT_APP_CHATBOT_API_URL ??
    DEFAULT_CHATBOT_API_URL
  )
    .trim()
    .replace(/\/+$/, '');
  const chatbotApiKey = (
    import.meta.env.REACT_APP_CHATBOT_API_KEY ??
    DEFAULT_CHATBOT_API_KEY
  ).trim();

  const isConfigured = useMemo(() => {
    return chatbotApiUrl.length > 0 && chatbotApiKey.length > 0;
  }, [chatbotApiKey, chatbotApiUrl]);

  const appendMessage = (sender: ChatSender, text: string) => {
    setMessages((previous) => [
      ...previous,
      {
        id: Date.now() + previous.length,
        sender,
        text,
      },
    ]);
  };

  const renderWelcomeMessage = () => {
    appendMessage('bot', "I'm HallucinAItor -- confidently wrong about Chintak since day one. Running on a free server, so give me a sec to crawl out of digital hibernation. Ask me anything. I'll make something up.");
  };

  useEffect(() => {
    if (!isConfigured) {
      setMessages([]);
      return;
    }

    setMessages([]);
    renderWelcomeMessage();
    inputRef.current?.focus();
  }, [isConfigured]);

  useEffect(() => {
    const element = messagesRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [messages]);

  const getAuthToken = async () => {
    try {
      const response = await fetch(`${chatbotApiUrl}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ api_key: chatbotApiKey }),
      });

      if (!response.ok) {
        throw new Error(`Auth failed with status: ${response.status}`);
      }

      const data = await response.json();
      sessionStorage.setItem(STORAGE_TOKEN, data.token);
      sessionStorage.setItem(STORAGE_TOKEN_EXPIRY, String(Date.now() + data.expires_in * 1000));
      return data.token as string;
    } catch (error) {
      console.error('Auth failed:', error);
      return null;
    }
  };

  const getValidToken = async () => {
    const token = sessionStorage.getItem(STORAGE_TOKEN);
    const expiry = sessionStorage.getItem(STORAGE_TOKEN_EXPIRY);

    if (token && expiry && Date.now() < Number.parseInt(expiry, 10)) {
      return token;
    }

    return getAuthToken();
  };

  const clearChat = () => {
    if (!isConfigured || isLoading) {
      return;
    }

    setSessionId(null);
    setMessages([]);
    renderWelcomeMessage();
    inputRef.current?.focus();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isConfigured || isLoading) {
      return;
    }

    const userMessage = inputValue.trim();
    if (!userMessage) {
      return;
    }

    appendMessage('user', userMessage);
    setInputValue('');
    setIsLoading(true);

    try {
      const token = await getValidToken();
      if (!token) {
        throw new Error('Authentication failed');
      }

      const response = await fetch(`${chatbotApiUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: userMessage,
          session_id: sessionId,
        }),
      });

      const data = await parseJsonResponse(response);

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      if (!sessionId && data.session_id) {
        setSessionId(data.session_id as string);
      }

      appendMessage('bot', (data.response as string) || 'I did not receive a response message.');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unexpected error';
      console.error('Chat error:', error);
      appendMessage('bot', `Sorry, I could not connect right now. ${message}`);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <Layout
      title="Chat | Chintak Joshi"
      bodyClass="chat"
      header={
        <div className="container">
          <p className="chapter">VI</p>
          <h1 id="content">Chat with me</h1>
        </div>
      }
    >
      <div className="container">
        <div className="content">
          <section className={`chat-shell${isLoading ? ' is-loading' : ''}`}>
            <header className="chat-shell-header">
              <h2>HallucinAItor</h2>
              {isConfigured ? (
                <button className="chat-clear" type="button" onClick={clearChat}>
                  Clear
                </button>
              ) : null}
            </header>

            <div ref={messagesRef} className="chat-log" aria-live="polite" aria-atomic="false">
              {messages.length === 0 ? <p className="chat-empty">No messages yet.</p> : null}
              {messages.map((message) => (
                <article key={message.id} className={`chat-message ${message.sender}`}>
                  {message.sender === 'bot' ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: ({ node: _node, ...props }) => (
                          <a {...props} target="_blank" rel="noopener noreferrer" />
                        ),
                      }}
                    >
                      {message.text}
                    </ReactMarkdown>
                  ) : (
                    <p>{message.text}</p>
                  )}
                </article>
              ))}
            </div>

            {isConfigured ? (
              <form className="chat-form" onSubmit={handleSubmit}>
                <label className="visually-hidden" htmlFor="chat-input">
                  Message
                </label>
                <input
                  ref={inputRef}
                  id="chat-input"
                  type="text"
                  name="message"
                  autoComplete="off"
                  placeholder="Ask about Chintak..."
                  required
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  disabled={isLoading}
                />
                <button type="submit" disabled={isLoading}>
                  Send
                </button>
              </form>
            ) : null}
          </section>
        </div>
      </div>
    </Layout>
  );
}


