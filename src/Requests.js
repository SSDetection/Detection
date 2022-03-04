import React from "react";
import { useEffect, useRef, useState } from 'react';
import { Form, Input, Button } from "semantic-ui-react";

export const Requests = ({ onNewUser }) => {
    // const [caption, setCaption] = useState("");
    // const [date, setDate] = useState("");
    const [username, setUsername] = useState("");
    return (
        <Form>
            <Form.Field>
                <Input
                    placeholder="@username"
                    onChange={e => setUsername(e.target.value)}

                />

            </Form.Field>
            <Form.Field>
                <Button onClick={async() => {
                    const data = {username};
                    fetch('./requests')
                        .then(response => response.text())
                        .then(response => console.log(response))
                    // const response = await fetch('/requests', {
                    // method: 'POST',
                    // headers: { 
                    //     'Content-Type' : 'application/json'},
                    //     body: JSON.stringify(data)
                    // })

                    // if (response.ok) {
                    //     setUsername(username)
                    //     // setCaption(data.caption)
                    //     // setDate(data.date)
                    //     onNewUser(username)
                    //     console.log(response)
                    // }
                }}>
                    Submit
                </Button>
            </Form.Field>

        </Form>
    )
}