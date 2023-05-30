'use client';
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

import styles from './Input.module.css';


export default function DescriptionBox() {
    // Handles the submit event on form submit.

    const [postContent, setPostContent] = useState('');
    const [responseSrc, setResponseSrc] = useState("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      // Stop the form from submitting and refreshing the page.
      event.preventDefault();
   
      // Get data from the form.
      const form_data = event.target
      const data = {
        product_description: (event.target as any).product_description.value,
      };
   
      // Send the data to the server in JSON format.
      const JSONdata = JSON.stringify(data);
   
      // API endpoint where we send form data.
      const endpoint = 'api/social_media';
    //   const endpoint = '/api/social_media';
   
      // Form the request for sending data to the server.
      const options = {
        // The method is POST because we are sending data.
        method: 'POST',
        // Tell the server we're sending JSON.
        headers: {
          'Content-Type': 'application/json',
        },
        // Body of the request is the JSON data we created above.
        body: JSONdata
      };
   
      // Send the form data to our forms API on Vercel and get a response.
      console.log("calling endpoint");
      const response = await fetch(endpoint, options);
   
      // Get the response data from server as JSON.
      // If server returns the name submitted, that means the form works.
      const result = await response.json();
    //   alert(`Is this your full name: ${result.data}`);
      console.log(result)
     setPostContent(result.response)
     setResponseSrc(result.images[0])

    console.log("returning textarea");
    };
    return (
      // We pass the event to the handleSubmit() function on submit.
      <form onSubmit={handleSubmit}>
        <label htmlFor="first">Generate a social media marketing post</label>
        <textarea 
            className={styles.prompt_box}
            id="product_description"
            name="product_description"
            placeholder="Describe what you're trying to market"
             required />
        <button type="submit" className={styles.submit}>Submit</button>
        <div></div>
        <div></div>
        <textarea 
            className={styles.response_box} 
            id="response" 
            name="response" 
            defaultValue={postContent}
            placeholder="Response Area"    
        >
        </textarea>
        <Image
            id="response_image" 
            src={responseSrc}
            alt="" 
            className={styles.image} 
            width={600}
            height={600}
            />
      </form>
    );
  }