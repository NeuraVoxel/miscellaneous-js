import io from 'socket.io-client';

const socket = io('http://localhost:3000');
let localStream;
let remoteStream;
let peerConnection;

const configuration = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
    ]
};

const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startButton = document.getElementById('startButton');
const hangupButton = document.getElementById('hangupButton');

startButton.addEventListener('click', startCall);
hangupButton.addEventListener('click', hangup);

async function startCall() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideo.srcObject = localStream;

        createPeerConnection();
        
        // 加入一个固定的房间ID（在实际应用中应该是动态生成的）
        const roomId = 'test-room';
        socket.emit('join-room', roomId);
        
        startButton.disabled = true;
        hangupButton.disabled = false;
    } catch (err) {
        console.error('获取媒体流失败:', err);
    }
}

function createPeerConnection() {
    peerConnection = new RTCPeerConnection(configuration);

    localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
    });

    peerConnection.ontrack = event => {
        remoteVideo.srcObject = event.streams[0];
    };

    peerConnection.onicecandidate = event => {
        if (event.candidate) {
            socket.emit('ice-candidate', event.candidate, 'test-room');
        }
    };
}

function hangup() {
    if (peerConnection) {
        peerConnection.close();
        peerConnection = null;
    }
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
    }
    localVideo.srcObject = null;
    remoteVideo.srcObject = null;
    startButton.disabled = false;
    hangupButton.disabled = true;
}

// 信令处理
socket.on('user-connected', async (userId) => {
    try {
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        socket.emit('offer', offer, 'test-room');
    } catch (err) {
        console.error('创建offer失败:', err);
    }
});

socket.on('offer', async (offer, userId) => {
    try {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit('answer', answer, 'test-room');
    } catch (err) {
        console.error('处理offer失败:', err);
    }
});

socket.on('answer', async (answer, userId) => {
    try {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    } catch (err) {
        console.error('处理answer失败:', err);
    }
});

socket.on('ice-candidate', async (candidate, userId) => {
    try {
        await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (err) {
        console.error('添加ICE候选者失败:', err);
    }
});