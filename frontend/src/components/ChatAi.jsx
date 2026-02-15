import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosClient from "../utils/axiosClient";
import { Send } from 'lucide-react';
import { useSelector, useDispatch } from "react-redux";
import { addUserMessage, addModelMessage } from "../authSlice";
import ReactMarkdown from "react-markdown"
import MarkdownRenderer from "./MarkdownRenderer";



function ChatAi({ problem }) {
    // const [messages, setMessages] = useState([
    //     { role: 'model', parts:[{text: "Hi, How are you"}]},
    //     { role: 'user', parts:[{text: "I am Good"}]}
    // ]);

    const dispatch = useDispatch();
    const messages = useSelector((state) => state.auth.messages);


    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const onSubmit = async (data) => {

        // setMessages(prev => [...prev, { role: 'user', parts:[{text: data.message}] }]);
         const updatedMessages = [
        ...messages,
        { role: "user", parts: [{ text: data.message }] }
    ];
        dispatch(addUserMessage(data.message));
        reset();

        try {

            const response = await axiosClient.post("/ai/chat", {
                messages: updatedMessages,
                title: problem.title,
                description: problem.description,
                testCases: problem.visibleTestCases,
                startCode: problem.startCode
            });

            dispatch(addModelMessage(response.data.message));
            // setMessages(prev => [...prev, { 
            //     role: 'model', 
            //     parts:[{text: response.data.message}] 
            // }]);
        } catch (error) {
            console.error("API Error:", error);
            dispatch(addModelMessage("Error from AI Chatbot"));
            // setMessages(prev => [...prev, { 
            //     role: 'model', 
            //     parts:[{text: "Error from AI Chatbot"}]
            // }]);
        }
    };

    return (
        <div className="flex flex-col h-screen max-h-[80vh] min-h-[500px]">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat ${msg.role === "user" ? "chat-end" : "chat-start"}`}
                    >
                        <div className="chat-bubble bg-black-400 text-base-content">
                            <MarkdownRenderer content={msg.parts[0].text} />

                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="sticky bottom-0 p-4 bg-base-100 border-t"
            >
                <div className="flex items-center">
                    <input
                        placeholder="Ask me anything"
                        className="input input-bordered flex-1"
                        {...register("message", { required: true, minLength: 2 })}
                    />
                    <button
                        type="submit"
                        className="btn btn-ghost ml-2"
                        disabled={errors.message}
                    >
                        <Send size={20} />
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ChatAi;