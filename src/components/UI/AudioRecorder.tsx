import { useState, useRef } from 'react';

const mimeType = 'audio/webm';
type AudioRecorderProps = {
  onRecord: (record: Blob) => void;
};
const AudioRecorder: React.FC<AudioRecorderProps> = ({ onRecord }) => {
  const [permission, setPermission] = useState(false);

  const mediaRecorder = useRef<MediaRecorder | null>(null);

  const [recordingStatus, setRecordingStatus] = useState('inactive');

  const [stream, setStream] = useState<MediaStream | null>(null);

  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const getMicrophonePermission = async () => {
    if ('MediaRecorder' in window) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(mediaStream);
        await startRecording(mediaStream);
      } catch (err) {
        const error = err as Error;
        alert(error.message);
      }
    } else {
      alert('The MediaRecorder API is not supported in your browser.');
    }
  };

  const startRecording = async (mediaStream: MediaStream | null = null) => {
    setRecordingStatus('recording');
    const mediaStr = mediaStream ? mediaStream : stream;
    if (!mediaStr) return;
    const media = new MediaRecorder(mediaStr, {
      type: mimeType,
    } as MediaRecorderOptions);

    mediaRecorder.current = media;

    mediaRecorder.current.start();

    const localAudioChunks: Blob[] = [];

    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === 'undefined') return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };

    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    setRecordingStatus('inactive');

    if (mediaRecorder.current) {
      mediaRecorder.current.stop();

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: mimeType });
        onRecord(audioBlob);
        setAudioChunks([]);
      };
    }
  };

  return (
    <div className="audio-controls">
      {!permission ? (
        <button onClick={getMicrophonePermission} type="button" title="button">
          <svg
            width="17"
            height="24"
            viewBox="0 0 17 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.7314 10.234C16.7314 10.1937 16.7314 10.1535 16.7314 10.1132C16.7262 9.73588 16.4016 9.43902 16.0142 9.44406C15.6215 9.44909 15.3126 9.76104 15.3178 10.1334C15.3178 10.1686 15.3178 10.1988 15.3178 10.234C15.3178 13.7208 12.365 16.5636 8.73145 16.5636C5.09794 16.5636 2.14506 13.7258 2.14506 10.234C2.14506 10.1837 2.14506 10.1384 2.14506 10.0881C2.15553 9.71072 1.84663 9.4038 1.45396 9.39374C1.06652 9.38871 0.741917 9.68053 0.731445 10.0579C0.731445 10.1183 0.731445 10.1736 0.731445 10.234C0.731445 14.2441 3.94087 17.5447 8.02464 17.8919V22.6415H5.11888C4.72621 22.6415 4.41207 22.9434 4.41207 23.3208C4.41207 23.6981 4.72621 24 5.11888 24H12.344C12.7367 24 13.0508 23.6981 13.0508 23.3208C13.0508 22.9434 12.7367 22.6415 12.344 22.6415H9.43825V17.8868C13.5168 17.5447 16.7314 14.2441 16.7314 10.234Z"
              className="svgFill"
            />
            <path
              d="M8.65033 14.8428C11.2629 14.8428 13.3886 12.8 13.3886 10.2893V4.55346C13.3886 2.04277 11.2629 0 8.65033 0C6.03776 0 3.91211 2.04277 3.91211 4.55346V10.2893C3.91211 12.8 6.03776 14.8428 8.65033 14.8428ZM5.32572 4.55346C5.32572 2.79245 6.81787 1.35849 8.65033 1.35849C10.4828 1.35849 11.9749 2.79245 11.9749 4.55346V10.2893C11.9749 12.0503 10.4828 13.4843 8.65033 13.4843C6.81787 13.4843 5.32572 12.0503 5.32572 10.2893V4.55346Z"
              className="svgFill"
            />
          </svg>
        </button>
      ) : null}
      {permission && recordingStatus === 'inactive' ? (
        <button onClick={() => startRecording()} type="button" title="button">
          <svg
            width="17"
            height="24"
            viewBox="0 0 17 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.7314 10.234C16.7314 10.1937 16.7314 10.1535 16.7314 10.1132C16.7262 9.73588 16.4016 9.43902 16.0142 9.44406C15.6215 9.44909 15.3126 9.76104 15.3178 10.1334C15.3178 10.1686 15.3178 10.1988 15.3178 10.234C15.3178 13.7208 12.365 16.5636 8.73145 16.5636C5.09794 16.5636 2.14506 13.7258 2.14506 10.234C2.14506 10.1837 2.14506 10.1384 2.14506 10.0881C2.15553 9.71072 1.84663 9.4038 1.45396 9.39374C1.06652 9.38871 0.741917 9.68053 0.731445 10.0579C0.731445 10.1183 0.731445 10.1736 0.731445 10.234C0.731445 14.2441 3.94087 17.5447 8.02464 17.8919V22.6415H5.11888C4.72621 22.6415 4.41207 22.9434 4.41207 23.3208C4.41207 23.6981 4.72621 24 5.11888 24H12.344C12.7367 24 13.0508 23.6981 13.0508 23.3208C13.0508 22.9434 12.7367 22.6415 12.344 22.6415H9.43825V17.8868C13.5168 17.5447 16.7314 14.2441 16.7314 10.234Z"
              className="svgFill"
            />
            <path
              d="M8.65033 14.8428C11.2629 14.8428 13.3886 12.8 13.3886 10.2893V4.55346C13.3886 2.04277 11.2629 0 8.65033 0C6.03776 0 3.91211 2.04277 3.91211 4.55346V10.2893C3.91211 12.8 6.03776 14.8428 8.65033 14.8428ZM5.32572 4.55346C5.32572 2.79245 6.81787 1.35849 8.65033 1.35849C10.4828 1.35849 11.9749 2.79245 11.9749 4.55346V10.2893C11.9749 12.0503 10.4828 13.4843 8.65033 13.4843C6.81787 13.4843 5.32572 12.0503 5.32572 10.2893V4.55346Z"
              className="svgFill"
            />
          </svg>
        </button>
      ) : null}
      {recordingStatus === 'recording' ? (
        <button
          onClick={stopRecording}
          type="button"
          className="audio-controls__active"
          title="button"
        >
          <svg
            width="17"
            height="24"
            viewBox="0 0 17 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.7314 10.234C16.7314 10.1937 16.7314 10.1535 16.7314 10.1132C16.7262 9.73588 16.4016 9.43902 16.0142 9.44406C15.6215 9.44909 15.3126 9.76104 15.3178 10.1334C15.3178 10.1686 15.3178 10.1988 15.3178 10.234C15.3178 13.7208 12.365 16.5636 8.73145 16.5636C5.09794 16.5636 2.14506 13.7258 2.14506 10.234C2.14506 10.1837 2.14506 10.1384 2.14506 10.0881C2.15553 9.71072 1.84663 9.4038 1.45396 9.39374C1.06652 9.38871 0.741917 9.68053 0.731445 10.0579C0.731445 10.1183 0.731445 10.1736 0.731445 10.234C0.731445 14.2441 3.94087 17.5447 8.02464 17.8919V22.6415H5.11888C4.72621 22.6415 4.41207 22.9434 4.41207 23.3208C4.41207 23.6981 4.72621 24 5.11888 24H12.344C12.7367 24 13.0508 23.6981 13.0508 23.3208C13.0508 22.9434 12.7367 22.6415 12.344 22.6415H9.43825V17.8868C13.5168 17.5447 16.7314 14.2441 16.7314 10.234Z"
              className="svgFill"
            />
            <path
              d="M8.65033 14.8428C11.2629 14.8428 13.3886 12.8 13.3886 10.2893V4.55346C13.3886 2.04277 11.2629 0 8.65033 0C6.03776 0 3.91211 2.04277 3.91211 4.55346V10.2893C3.91211 12.8 6.03776 14.8428 8.65033 14.8428ZM5.32572 4.55346C5.32572 2.79245 6.81787 1.35849 8.65033 1.35849C10.4828 1.35849 11.9749 2.79245 11.9749 4.55346V10.2893C11.9749 12.0503 10.4828 13.4843 8.65033 13.4843C6.81787 13.4843 5.32572 12.0503 5.32572 10.2893V4.55346Z"
              className="svgFill"
            />
          </svg>
        </button>
      ) : null}
    </div>
  );
};

export default AudioRecorder;
