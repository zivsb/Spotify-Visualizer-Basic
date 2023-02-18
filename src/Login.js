import React from 'react'
import { Container } from 'react-bootstrap';
import querystring from "querystring";

const AUTH_URL = 'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
        response_type: 'code',
        client_id: "14d6b0b1131f49888ad48a41767772a4",
        redirect_uri: "http://localhost:3000",
        scope: "streaming user-read-private user-read-email user-library-read user-library-modify user-read-playback-state user-modify-playback-state"
    });

export default function Login() {
  return (
    <Container className='d-flex justify-content-center align-items-center'
        style={{ minHeight: "100vh" }}
    >  
        <a className='btn btn-success btn-lg' href={AUTH_URL}>Login with Spotify</a>
    </Container>
  )
}
