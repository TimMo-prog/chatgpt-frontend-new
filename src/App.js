// ChatGPT frontend


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


import './App.css';
import userAvatar from './images/people.svg'; // Reference: https://www.shareicon.net/avatar-social-profile-people-user-794381#google_vignette
import chatbotAvatar from './images/ChatGPT_logo.svg'; // Reference: https://commons.wikimedia.org/wiki/File:ChatGPT_logo.svg
import sendIcon from './images/send-svgrepo-com.svg'; // Referfence: https://www.svgrepo.com/svg/451295/send
import thumbUp from './images/thumbs-up-svgrepo-com.svg';
import thumbDown from './images/thumb-down-svgrepo-com.svg';

function App() {
  const [userID, setUserID] = useState('user123');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [chatGPTOutput, setChatGPTOutput] = useState([]);
  const [latestInput, setLatestInput] = useState('');
  const [latestChatGPTMessage, setLatestChatGPTMessage] = useState('');
  const [latestFeedback, setLatestFeedback] = useState('');
  const [showPopup, setShowPopup] = useState(true);
  const [showTaskDescription, setShowTaskDescription] = useState(false);
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showLikePopup, setShowLikePopup] = useState(false);
  const [showDislikePopup, setShowDislikePopup] = useState(false);
  const [isFirstMessageSent, setIsFirstMessageSent] = useState(false);



  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const topicName = searchParams.get('TOPIC_NAME');
  const prolificPid = searchParams.get('PROLIFIC_PID');
  console.log(searchParams.toString());
  console.log("Prolific PID value:", prolificPid);

  const userMessageEvent = new Event('userMessageEvent');
  const chatGPTMessageEvent = new Event('chatGPTMessageEvent');
  const userFeedbackEvent = new Event('userFeedbackEvent');
  const handleKeyUp = (event) => {
    console.log(event);
};


    useEffect(() => {
        if (window.LogUI) {
        let configurationObject = {
            logUIConfiguration: {
                endpoint: 'wss://ubuntu2004with1.chatgptusage-tu.src.surf-hosted.nl:7000/ws/endpoint/', 
                authorisationToken: 'eyJ0eXBlIjoibG9nVUktYXV0aG9yaXNhdGlvbi1vYmplY3QiLCJhcHBsaWNhdGlvbklEIjoiNmQ1NWMwYTYtZmNlZC00ODk0LWFmMDctNDA1MDVkN2E0ZDEyIiwiZmxpZ2h0SUQiOiI0ZjFlMzIyYS0zZGU0LTQ4NDQtOGRjNS1lMmU5NjM3N2QyZTQifQ:1qohDw:-IQsoQqquGHrVHscBW-sMWhLpKQfp7ttYtBXIvq7OQM', 
                verbose: true,
                browserEvents: {
                    trackCursor: false,
                    cursorUpdateFrequency: 4000,
                },
            },
            applicationSpecificData: {
                userID: userID, 
                topicName: topicName,
            },
            trackingConfiguration: {
                'input-change': {
                    selector: '.chat-input input',
                    event: 'keyup',
                    name: 'INPUT_CHANGE',
                    metadata: [
                        {
                            nameForLog: 'inputValue',
                            sourcer: 'elementProperty',
                            lookFor: 'value',
                        }
                    ]
                },

                                'input-change': {
                    selector: '.chat-input input',
                    event: 'keyup',
                    name: 'INPUT_CHANGE',
                    metadata: [
                        {
                            nameForLog: 'inputValue',
                            sourcer: 'elementProperty',
                            lookFor: 'value',
                        }
                    ]
                },

                // Click event
                'message-send': {
                    selector: '.chat-input button',
                    event: 'click',
                    name: 'MESSAGE_SEND'
                },
                'positive-feedback-popup-opened': {
                    selector: '#positive-feedback-button',
                    event: 'click',
                    name: 'POSITIVE_FEEDBACK_POPUP_OPENED'
                },
                'negative-feedback-popup-opened': {
                    selector: '#negative-feedback-button',
                    event: 'click',
                    name: 'NEGATIVE_FEEDBACK_POPUP_OPENED'
                },
                'save-feedback': {
                    selector: '.feedback-saving-button',
                    event: 'click',
                    name: 'FEEDBACK_SAVED',
                },
                'task-started': {
                    selector: '.start-button',
                    event: 'click',
                    name: 'TASK_STARTED'
                },
                'task-description-viewed': {
                    selector: '.task-description-button',
                    event: 'click',
                    name: 'TASK_DESCRIPTION_VIEWED'
                },
                'task-description-closed': {
                    selector: '.task-description-closed-button',
                    event: 'click',
                    name: 'TASK_DESCRIPTION_CLOSED',
                },
                'task-completed': {
                    selector: '.finish-button',
                    event: 'click',
                    name: 'TASK_COMPLETED'
                },

                // Focus event
                'input-focus': {
                  selector: '.chat-input input',
                  event: 'focus',
                  name: 'INPUT_FOCUSED',
                },

                // Self-defined Events
                'user-feedback-event': {
                  selector: '.chat-window',
                  event: 'userFeedbackEvent',
                  name: 'USER_FEEDBACK_EVENT',
                  metadata: [
                      {
                          nameForLog: 'latestFeedback',
                          sourcer: 'elementProperty',
                          lookFor: 'value',
                          onElement: '#latestFeedback',
                      }
                  ]
                },

                'user-message-event': {
                  selector: '.chat-window',
                  event: 'userMessageEvent',
                  name: 'USER_MESSAGE_EVENT',
                  metadata: [
                      {
                          nameForLog: 'latestInput',
                          sourcer: 'elementProperty',
                          lookFor: 'value',
                          onElement: '#latestInput',
                      }
                  ]
                },

              'chatgpt-message-event': {
                  selector: '.chat-window',
                  event: 'chatGPTMessageEvent',
                  name: 'CHATGPT_MESSAGE_EVENT',
                  metadata: [
                      {
                          nameForLog: 'latestChatGPTMessage',
                          sourcer: 'elementProperty',
                          lookFor: 'value',
                          onElement: '#latestChatGPTMessage',
                      }
                  ]
              }
            },
        };
            window.LogUI.init(configurationObject);
        } else {
        console.error("LogUI is not available!");
    }
    }, [userID]);


  useEffect(() => {
    if (prolificPid) {
      setUserID(prolificPid);
    }
  }, [prolificPid]);


const getTaskDescription = (topic) => {
    const descriptions = {
      'altitude_sickness': (
        <>
          Your task is to acquire information about <strong>the different treatments for altitude sickness</strong>.
        </>
      ),
      'american_revolutionary_war': (
        <>
          Your task is to acquire information about <strong>key battles of the American Revolutionary War and their impact</strong>.
        </>
      ),
      'carpenter_bees': (
        <>
          Your task is to acquire information about <strong>types of habitats carpenter bees prefer</strong>.
        </>
      ),
      'theory_of_evolution': (
        <>
          Your task is to acquire information about <strong>main criticisms of the theory of evolution</strong>.
        </>
      ),
      'NASA': (
        <>
          Your task is to acquire information about <strong>major discoveries from NASA’s Mars Opportunity Rover</strong>.
        </>
      ),
    };
    return descriptions[topic] || 'TOPIC_NAME does not exist';
};




useEffect(() => {
    if (latestChatGPTMessage) {
        const chatWindow = document.querySelector('.chat-window');
        const chatGPTMessageEvent = new CustomEvent('chatGPTMessageEvent', {
            detail: { content: latestChatGPTMessage }
        });
        console.log("Dispatching chatGPTMessageEvent:", chatGPTMessageEvent);
        chatWindow.dispatchEvent(chatGPTMessageEvent);
    }
}, [latestChatGPTMessage]);

useEffect(() => {
    if (latestInput) {
        const chatWindow = document.querySelector('.chat-window');
        const userMessageEvent = new CustomEvent('userMessageEvent', {
            detail: { content: latestInput }
        });
        console.log("Dispatching userMessageEvent:", userMessageEvent);
        chatWindow.dispatchEvent(userMessageEvent);
    }
}, [latestInput]);

useEffect(() => {
    if (latestFeedback) {
        const chatWindow = document.querySelector('.chat-window');
        const userFeedbackEvent = new CustomEvent('userFeedbackEvent', {
            detail: { content: latestFeedback }
        });
        console.log("Dispatching userFeedbackEvent:", userFeedbackEvent);
        chatWindow.dispatchEvent(userFeedbackEvent);
    }
}, [latestFeedback]);


useEffect(() => {
  const chatWindow = document.querySelector('.chat-window');
  chatWindow.scrollTop = chatWindow.scrollHeight;
}, [messages]);




  const handleSend = async () => {
    if (input.trim() === '') return;


    setInput('');

    setMessages([...messages, { type: 'User', text: input }]);
    setLatestInput(input);
    setIsFirstMessageSent(true);
    setMessages(prevMessages => [...prevMessages, { type: 'ChatGPT', text: "Generating answer…" }]);

    try {
      const response = await fetch('https://ubuntu2004with1.chatgptusage-tu.src.surf-hosted.nl:7000/exp/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();

        console.log("data.message: ")
        console.log(data.message)
        setMessages(prevMessages => {
            const newMessages = [...prevMessages];
            newMessages[newMessages.length - 1] = {
                type: 'ChatGPT',
                text: data.message,
                name: `CHATGPT_RESPONSE_${data.message.substring(0, 10).toUpperCase().replace(/\s+/g, '_')}`
            };
            return newMessages;
        });

setLatestChatGPTMessage(data.message);


    } catch (error) {
      console.error("Error communicating with backend:", error);
      setMessages(prevMessages => [...prevMessages, { type: 'ChatGPT', text: "Sorry, I couldn't process that request." }]);
      setLatestChatGPTMessage("Sorry, I couldn't process that request.");
    }

  };

  const handleStart = () => {
  setShowPopup(false);
};

const handleFeedbackPopup = (thumb) => {
    if (thumb === 'up') {
        setShowLikePopup(true);
    } else if (thumb === 'down') {
        setShowDislikePopup(true);
    }
};

const saveFeedback = () => {
    console.log(feedback);
    setFeedback(feedback);
    setLatestFeedback(feedback);
    setShowLikePopup(false);
    setShowDislikePopup(false);
    setFeedback('');
};

const navigate = useNavigate();

const handleFinish = () => {
    navigate(`/finish?PROLIFIC_PID=${prolificPid}`);
};

const handleTaskDescriptionToggle = () => {   
    setShowTaskDescription(!showTaskDescription);
};

return (
  <>
        {/* Like Popup */}
        {showLikePopup && (
            <div className="popup-overlay">
                <div className="popup">
                    <p>Provide additional feedback</p>
                    <textarea
                        placeholder="What would you like about the response?" 
                        rows="4" 
                        cols="50" 
                        value={feedback} 
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                    <button className="feedback-saving-button" onClick={saveFeedback}>Submit Feedback</button>
                </div>
            </div>
        )}

        {/* Dislike Popup */}
        {showDislikePopup && (
            <div className="popup-overlay">
                <div className="popup">
                    <p>Provide additional feedback</p>
                    <textarea
                        placeholder="What was the issue with the response? How could it be improved?" 
                        rows="4" 
                        cols="50" 
                        value={feedback} 
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                    <button className="feedback-saving-button" onClick={saveFeedback}>Submit Feedback</button>
                </div>
            </div>
        )}

    {/* Task Starting Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3> Welcome to the Chat with ChatGPT!</h3>
            <div className="task-description-frame">
            {getTaskDescription(topicName)}
            </div>
            <div className="underlined-text">
                <p><em>Please engage with ChatGPT to the best of your ability to gain as much information as possible. You will have the opportunity to attain a bonus payoff depending on a knowledge test on this topic at the end of the task. To maximize your potential to receive this bonus, do your best to satisfy your information needs in this task!</em></p>
            </div>
            <p>If you forget the task contents, you can click the 'Task Description' button on the top left corner.</p>
            <div className="underlined-text">
            <p>
              When you complete the conversation, you can click the "I am done!" button at the top right of your screen to take you to another page where you can learn about the next steps.
            </p>
            </div>
            <button className="start-button" onClick={handleStart}>Start</button>
          </div>
        </div>
      )}

    {/* Task Description Popup */}
      {showTaskDescription && ( 
        <div className="popup-overlay">
          <div className="popup">
            <p>{getTaskDescription(topicName)}</p>
            <button className="task-description-closed-button" onClick={handleTaskDescriptionToggle}>Close</button>
          </div>
        </div>
      )}

    {/* Main Chat Interface */}
    <div className="App">
      <div className="chat-header">
        <button className="task-description-button" onClick={handleTaskDescriptionToggle}>Task Description</button>
        Chat with ChatGPT 
        {isFirstMessageSent && <button className="finish-button" onClick={handleFinish}>I am done!</button>}

      </div>

<div className="chat-window">
    {messages.map((message, index) => (
        <div key={index} className={`message ${message.type.toLowerCase()} ${index % 2 === 0 ? 'even' : 'odd'}`}>
            <div className="message-content">
                <div className="text-avatar">
                    <img src={message.type === 'User' ? userAvatar : chatbotAvatar} alt={`${message.type} avatar`} className="avatar" />
                </div>
                <span data-name={message.name} style={{ whiteSpace: 'pre-line' }}><strong>{message.type}:</strong> {message.text}</span>
{message.type === 'ChatGPT' && 
    <div>
            <button className="feedback-button" id="negative-feedback-button" onClick={() => handleFeedbackPopup('down')}>
            <img src={thumbDown} alt="Thumb Down" className="thumb-icon"/>
        </button>
        <button className="feedback-button" id = "positive-feedback-button" onClick={() => handleFeedbackPopup('up')}>
            <img src={thumbUp} alt="Thumb Up" className="thumb-icon" />
        </button>

    </div>
}
            </div>
        </div>
    ))}
    <input type="hidden" id="latestInput" value={latestInput} />
    <input type="hidden" id="latestChatGPTMessage" value={latestChatGPTMessage} />
    <input type="hidden" id="latestFeedback" value={latestFeedback} />
</div>





<div class="chat-input-wrapper">
      <div className="chat-input">
        <input 
            placeholder="Send a message..." 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            onKeyUp={(e) => handleKeyUp(e)}
        />
        <div className="disclaimer">
            ChatGPT may produce inaccurate information about people, places, or facts.
        </div>
      </div>
              <button className="input-button" onClick={handleSend}  aria-label="Send message">
        <img src={sendIcon} alt="Send" className="send-icon" />
        </button>
      </div>
    </div>
  </>
);


}

function FinishPage() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const prolificPid = searchParams.get('PROLIFIC_PID');
    const hashString = hashCode(prolificPid).toString(16);
    const code = prolificPid ? hashString.slice(0, 8) : 'NO_PID';
    console.log(searchParams.toString());
    console.log("Prolific PID value:", prolificPid);

    return (
        <div className="finish-page-container">
            <div className="finish-page-content">
                <h1>Thank you for intertacting with the ChatGPT bot!</h1>
                <ol>
                    <li>Please copy the <strong>{code}</strong> to the Qualtrics.</li>
                    <li>Close this page.</li>
                </ol>
            </div>
        </div>
    );
}

function hashCode(str) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
}


function Main() {
    return (
        <Router basename="/exp">
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/finish" element={<FinishPage />} />
            </Routes>
        </Router>
    );
}
export default Main;
