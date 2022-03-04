import React from "react";
import { useEffect, useRef, useState } from 'react';
import { Form, Input, Button, List, Header } from "semantic-ui-react";

export const Posts = ({ data }) => {
    return (
        <List>
            {data.map(post =>{
                return (
                    <List.Item key = {data[post]}>
                        <Header>{post.path}</Header>
                    </List.Item>
                );
            })}
        </List>
    );
};