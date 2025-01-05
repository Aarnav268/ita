let counter = 0;
let workSheet = {};
let mediaRecorder;
let audioChunks = [];
let audioBlob;
let audioBlobList=[];
const saveButton = document.getElementById("conversation-saveButton");
const clearButton = document.getElementById("conversation-clear-btn");
const startBtn = document.getElementById('conversation-start-btn');
const sendBtn = document.getElementById('conversation-send-btn');
const transcription = document.getElementById('userInput');

async function getExercise() {
    const dropdown = document.getElementById("weeks");
    const selectedValue = dropdown.value; // Get the value of the selected option
    const selectedText = dropdown.options[dropdown.selectedIndex].text;
    const header = await getWorkSheet(null, "header")
    workSheet = await getWorkSheet(selectedText === "" ? "1" : selectedText, null);
    const startBtn = document.getElementById('conversation-start-btn');
    const topicSelected = document.getElementById('topicSelected');
    topicSelected.textContent = workSheet.intro[1]
    await speakApi(workSheet.intro[0])
    await speakApi(workSheet.intro[1])
    base64AudioList=[];
    startBtn.disabled = false;
    sendMessage();
}

async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.textContent.trim();
    if ((message || counter == 0) && workSheet && workSheet.conversations && workSheet.conversations.length > counter) {
        // Display the sent message
        if (message) {
            displayMessage(message, 'sent');
             // Clear input field
            userInput.textContent = "";
        }
        startBtn.disabled = false;
        let botResponse = workSheet.conversations[counter];
        counter++;
        displayMessage(botResponse, 'received');
        await speakApi(botResponse)
    }
    if (workSheet && workSheet.conversations && workSheet.conversations.length <= counter ){
        startBtn.disabled = true;
        clearButton.disabled = true;
        saveButton.disabled =false;
    }
}

saveButton.addEventListener("click",async (event) => {
    const chatBox = document.getElementById("chatBox");

    // Get all messages inside the chat box
    const messages = chatBox.querySelectorAll(".message");
    const formData = new FormData();
    audioBlob = new Blob(audioBlobList, { type: 'audio/wav' });
    const filename = `audio.wav`;
    formData.append(`audioFiles[]`,audioBlob, filename);
    const messageArray = Array.from(messages).map(message => message.textContent.trim());
    formData.append("content",JSON.stringify(messageArray));
    formData.append("work","conversation");
    // console.log(messageArray);
    fetch('https://infinite-sands-52519-06605f47cb30.herokuapp.com/save_form', {
        method: 'POST',
        headers: {
            'Authorization': sessionStorage.getItem('sessionToken')
        },
        body: formData
    })
        .then(response => {
            if (response.status === 401) {
                // Handle 401 Unauthorized - user is not authenticated
                console.log('Unauthorized! Redirecting to login...');
                // Redirect to login page (or handle error accordingly)
                window.location.href = "https://mperumal-usd.github.io/ita/Login"; // Redirect to login page
                return; // Stop further execution if 401 is encountered
            }
            // If the status is OK or other success code, handle it
            return response.json();  // Parse the JSON response
        })
        .then(data => {
            alert('Work saved successfully!  ' + (data.id ? "id :" + data.id : ""));
        })
        .catch(error => {
            alert('Failed to save work.'+ JSON.stringify(error));
        });
});


// Function to display a message
function displayMessage(message, type) {
    const chatBox = document.getElementById('chatBox');
    const msgElement = document.createElement('div');
    msgElement.classList.add('message', type);
    msgElement.textContent = message;
    chatBox.appendChild(msgElement);
    chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to the bottom
}
// Optionally, focus the input field on page load
window.onload = function () {
    document.getElementById('conversation-start-btn').focus();
};
// Check if the browser supports the Web Speech API
if (!('webkitSpeechRecognition' in window)) {
    alert('Sorry, your browser does not support speech recognition.');
} else {
    window.SpeechRecognition = window.SpeechRecognition
        || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    let mediaRecorder;
    let audioChunks = [];
    let audioBlob;
    recognition.lang = 'ta';
    recognition.continuous = true; // Keep recognizing speech continuously
    recognition.interimResults = true; // Show interim results

    clearButton.addEventListener('click',async ()=>{
        const userInput = document.getElementById('userInput');
        userInput.innerHTML="";
        transcription.innerHTML=""
        audioChunks=[]
        if(mediaRecorder){
            await mediaRecorder.stop();
            await mediaRecorder.start();
        }
        if(recognition){
            await recognition.stop();
            await recognition.start(); 
        }
        console.log('Audio recording started');
       // Start the speech recognition
        startBtn.disabled = true;
        sendBtn.disabled = false;
        startBtn.textContent='listening';
    });
    

    startBtn.addEventListener('click', async () => {
        recognition.start(); // Start the speech recognition
        startBtn.disabled = true;
        sendBtn.disabled = false;
        startBtn.textContent='listening';
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };
            mediaRecorder.onstop = async () => {
                audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const audioURL = URL.createObjectURL(audioBlob);
                console.log('Audio URL:', audioURL);
                audioBlobList.push(...audioChunks)
                // Clear chunks for the next recording
                audioChunks = [];
            };
            mediaRecorder.start();
            console.log('Audio recording started');
        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    });
    sendBtn.addEventListener('click', () => {
        recognition.stop(); // Stop the speech recognition
        startBtn.disabled = false;
        sendBtn.disabled = true;
        if (mediaRecorder) {
            mediaRecorder.stop();
            console.log('Audio recording stopped');
        }
        startBtn.textContent='record';
    });
    recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript;
            } else {
                interimTranscript += transcript;
            }
            transcription.innerHTML = `${transcript}`;
        }
        transcription.innerHTML = `${finalTranscript}`;
        event.results=[]
    };
    recognition.onerror = (event) => {
        console.error('Speech recognition error detected: ' + event.error);
    };
    recognition.onend = () => {
        console.log("Recognition on end")
    };
}