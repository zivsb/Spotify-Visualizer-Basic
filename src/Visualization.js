import React, {useState, useRef, useEffect} from 'react'
import { Canvas, useFrame } from "react-three-fiber"
import "./Visualization.css"

function Box(){
    const mesh = useRef();
    const audioContextRef = useRef(null);

    const [bassValue, setBassValue] = useState(0);

    useEffect(() => {
        async function setupAudio() {
            audioContextRef.current = new AudioContext();
            const scriptNode = audioContextRef.current.createScriptProcessor(2048, 1, 1);

            scriptNode.onaudioprocess = function(event) {
                const inputBuffer = event.inputBuffer;
                const inputData = inputBuffer.getChannelData(0);

                const bufferLength = inputData.length;
                const dataArray = new Float32Array(bufferLength);

                for ( let i = 0; i < bufferLength; i++) {
                    dataArray[i] = inputData[i]
                }

                const bassArray = dataArray.slice(0, bufferLength / 8);
                const bassAvg = bassArray.reduce((acc, val) => acc + Math.abs(val)) / bassArray.length;

                console.log(bassAvg)

                // Do something w/ bassAvg here
                setBassValue(bassAvg);
            }

            // FOR NOW: using microphone to create a mediastreamsource unitl I figure out how to get that from spotify
            const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const sourceNode = audioContextRef.current.createMediaStreamSource(audioStream);

            sourceNode.connect(scriptNode);
            scriptNode.connect(audioContextRef.current.destination);
        }

        setupAudio()
    }, []);


    useFrame((state, delta) => (mesh.current.rotation.z += delta));
    return (
        <mesh
            ref={mesh}
            rotation-x={45}
            scale={1 + bassValue * 10}
        >
            <boxBufferGeometry attaach="geometry" />
            <meshLambertMaterial attach="material" color="hotpink" />
        </mesh>
    );
}

export default function Visualization() {
  return (
    <div className='Visualization'>
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]}/>
            <Box />
        </Canvas>
    </div>
  )
}
