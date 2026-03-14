import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { useLang } from '../context/LanguageContext';
import { t } from '../i18n';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_CHATBOT_API_URL || 'http://localhost:8000';

const Chatbot = () => {
    const { lang } = useLang();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [sessionId, setSessionId] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const [status, setStatus] = useState('ready'); // ready, typing, error
    const [options, setOptions] = useState(null);
    const [currentField, setCurrentField] = useState(null);
    const [checkedOptions, setCheckedOptions] = useState([]);
    const messagesEndRef = useRef(null);

    // Fields that should render as checkboxes (multiselect)
    const MULTISELECT_FIELDS = ['areas_of_interest', 'how_would_you_like_to_grow'];

    // Initial greeting and session setup
    useEffect(() => {
        const savedSession = localStorage.getItem('chatbot_session_id');
        if (savedSession) {
            setSessionId(savedSession);
            // fetchHistory(savedSession); // History disabled

            // Allow greeting even if session exists
            setMessages([{
                id: 'greeting',
                text: t('chatbot_greeting', lang),
                isBot: true,
                timestamp: new Date()
            }]);
        } else {
            const newSession = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            setSessionId(newSession);
            localStorage.setItem('chatbot_session_id', newSession);

            // Add initial greeting
            setMessages([{
                id: 'greeting',
                text: t('chatbot_greeting', lang),
                isBot: true,
                timestamp: new Date()
            }]);
        }
    }, [lang]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const fetchHistory = async (sid) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/chat/history/${sid}`);
            if (response.data && response.data.messages) {
                const history = response.data.messages.map((m, idx) => ([
                    { id: `u-${idx}`, text: m.user_message, isBot: false, timestamp: new Date(m.timestamp) },
                    { id: `b-${idx}`, text: m.bot_response, isBot: true, timestamp: new Date(m.timestamp) }
                ])).flat();

                if (history.length > 0) {
                    setMessages(history);
                } else {
                    setMessages([{
                        id: 'greeting',
                        text: t('chatbot_greeting', lang),
                        isBot: true,
                        timestamp: new Date()
                    }]);
                }
            }
        } catch (error) {
            console.error('Failed to fetch history:', error);
            // Fallback to greeting if history fails
            setMessages([{
                id: 'greeting',
                text: t('chatbot_greeting', lang),
                isBot: true,
                timestamp: new Date()
            }]);
        }
    };

    const handleSend = async (text = inputValue) => {
        const messageText = typeof text === 'string' ? text.trim() : inputValue.trim();
        if (!messageText || status === 'typing') return;

        // Add user message
        const userMsg = {
            id: Date.now().toString(),
            text: messageText,
            isBot: false,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setOptions(null);
        setCheckedOptions([]);
        setIsTyping(true);
        setStatus('typing');

        try {
            const response = await axios.post(`${API_BASE_URL}/api/chat/message`, {
                message: messageText,
                session_id: sessionId
            });

            const data = response.data;
            if (data.session_id) {
                setSessionId(data.session_id);
                localStorage.setItem('chatbot_session_id', data.session_id);
            }

            const botMsg = {
                id: (Date.now() + 1).toString(),
                text: data.response,
                isBot: true,
                timestamp: new Date(data.timestamp),
                detectedLang: data.detected_language
            };

            setMessages(prev => [...prev, botMsg]);
            setOptions(data.options);
            setCurrentField(data.current_field);
            setStatus('ready');
        } catch (error) {
            console.error('Chat error:', error);
            setStatus('error');
            const errorMsg = {
                id: (Date.now() + 1).toString(),
                text: t('chatbot_status_error', lang),
                isBot: true,
                isError: true,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleOptionClick = (option) => {
        handleSend(option);
    };

    const toggleChat = () => setIsOpen(!isOpen);

    const isRTL = lang === 'ar';

    return (
        <>
            {/* Floating Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleChat}
                className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-all`}
                style={{
                    background: 'linear-gradient(90deg, #94BD1C 0%, #29C28C 100%)',
                    color: 'white'
                }}
            >
                {isOpen ? <FaTimes size={24} /> : <FaComments size={24} />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        className={`fixed bottom-24 ${isRTL ? 'left-6' : 'right-6'} z-50 w-[90vw] sm:w-[380px] h-[500px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-gray-100 font-Manrope`}
                        dir={isRTL ? 'rtl' : 'ltr'}
                    >
                        {/* Header */}
                        <div
                            className="p-5 flex items-center justify-between"
                            style={{ background: 'linear-gradient(90deg, #94BD1C 0%, #29C28C 100%)' }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                                    <img src="/n-logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                                </div>
                                <div>
                                    <h3 className="text-white font-Urbanist font-bold text-lg leading-tight">
                                        {t('chatbot_title', lang)}
                                    </h3>
                                    <p className="text-white/80 text-xs">
                                        {isTyping ? t('chatbot_status_typing', lang) : t('chatbot_status_ready', lang)}
                                    </p>
                                </div>
                            </div>
                            <button onClick={toggleChat} className="text-white/80 hover:text-white transition-colors cursor-pointer">
                                <FaTimes size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${msg.isBot
                                            ? 'bg-white text-textPrimary border border-gray-100 rounded-ss-none'
                                            : 'text-white rounded-ee-none'
                                            }`}
                                        style={!msg.isBot ? { background: 'linear-gradient(90deg, #94BD1C 0%, #29C28C 100%)' } : {}}
                                    >
                                        {msg.isBot ? (
                                            <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                                        ) : (
                                            msg.text
                                        )}
                                        {msg.isError && (
                                            <button
                                                onClick={() => setMessages(prev => prev.filter(m => m.id !== msg.id))}
                                                className="block mt-2 text-xs underline opacity-70"
                                            >
                                                Dismiss
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white p-3.5 rounded-2xl rounded-ss-none border border-gray-100 flex gap-1">
                                        <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full"></motion.span>
                                        <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full"></motion.span>
                                        <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full"></motion.span>
                                    </div>
                                </div>
                            )}

                            {/* Options Area */}
                            {options && options.length > 0 && !isTyping && (
                                <div className="flex flex-col gap-2 pt-2">
                                    {MULTISELECT_FIELDS.includes(currentField) ? (
                                        /* Checkbox mode for multiselect fields */
                                        <>
                                            {options.map((option, idx) => (
                                                <label
                                                    key={idx}
                                                    className={`w-full flex items-center gap-3 p-3 bg-white border-2 rounded-xl text-sm font-Urbanist font-semibold transition-all cursor-pointer shadow-sm ${checkedOptions.includes(option)
                                                        ? 'border-[#94BD1C] text-[#94BD1C]'
                                                        : 'border-gray-100 hover:border-[#94BD1C] hover:text-[#94BD1C]'
                                                        }`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={checkedOptions.includes(option)}
                                                        onChange={() => {
                                                            setCheckedOptions(prev =>
                                                                prev.includes(option)
                                                                    ? prev.filter(o => o !== option)
                                                                    : [...prev, option]
                                                            );
                                                        }}
                                                        className="w-4 h-4 accent-[#94BD1C] cursor-pointer shrink-0"
                                                    />
                                                    <span>{option}</span>
                                                </label>
                                            ))}
                                            <button
                                                onClick={() => {
                                                    if (checkedOptions.length > 0) {
                                                        handleSend(checkedOptions.join(', '));
                                                        setCheckedOptions([]);
                                                    }
                                                }}
                                                disabled={checkedOptions.length === 0}
                                                className={`w-full p-3 rounded-xl text-sm font-Urbanist font-bold transition-all cursor-pointer shadow-sm text-white ${checkedOptions.length > 0
                                                    ? 'hover:scale-[1.02] active:scale-95'
                                                    : 'opacity-50 cursor-not-allowed'
                                                    }`}
                                                style={{ background: 'linear-gradient(90deg, #94BD1C 0%, #29C28C 100%)' }}
                                            >
                                                {lang === 'ar' ? 'تأكيد' : lang === 'de' ? 'Bestätigen' : 'Confirm'}
                                            </button>
                                        </>
                                    ) : (
                                        /* Single-click buttons for regular select fields */
                                        options.map((option, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleOptionClick(option)}
                                                className="w-full text-start p-3 bg-white border-2 border-gray-100 rounded-xl text-sm font-Urbanist font-semibold hover:border-[#94BD1C] hover:text-[#94BD1C] transition-all cursor-pointer shadow-sm"
                                            >
                                                {option}
                                            </button>
                                        ))
                                    )}
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-gray-100">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="relative flex items-center gap-2"
                            >
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder={t('chatbot_placeholder', lang)}
                                    className="flex-1 p-3.5 pr-12 rounded-2xl bg-gray-100 border-none text-sm focus:ring-2 focus:ring-[#94BD1C] outline-none transition-all font-Manrope"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isTyping}
                                    className={`absolute ${isRTL ? 'left-2' : 'right-2'} p-2 rounded-xl transition-all ${inputValue.trim() && !isTyping
                                        ? 'text-[#94BD1C] hover:bg-[#94BD1C]/10'
                                        : 'text-gray-400'
                                        } cursor-pointer`}
                                >
                                    <FaPaperPlane size={18} className={isRTL ? 'rotate-180' : ''} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
