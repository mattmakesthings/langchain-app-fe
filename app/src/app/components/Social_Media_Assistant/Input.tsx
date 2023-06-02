'use client';
import Link from "next/link";
import Image from "next/image";
import React, { useState, ChangeEvent } from "react";

import styles from './Input.module.css';


export default function DescriptionBox() {
    // Handles the submit event on form submit.

    const [postContent, setPostContent] = useState('');
    const [responseSrc, setResponseSrc] = useState('');
    const inputFileRef = React.useRef<HTMLInputElement | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    function readFileDataAsBinary(e) {
      const file = e.target.files[0];
  
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
  
          reader.onload = (event) => {
              resolve(event.target.result);
          };
  
          reader.onerror = (err) => {
              reject(err);
          };
  
          reader.readAsBinaryString(file);
      });
  }

    const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files && event.target.files[0];
      readFileDataAsBinary(event)
        .then((file_binary) => {
          setSelectedFile(file_binary || null);
        }, (reason) => {
          const err = new Error("Trouble getting number", { cause: reason });
          console.error(err);
          throw err;
        })

    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      // Stop the form from submitting and refreshing the page.
      event.preventDefault();
   
      // Get data from the form.
      const data = {
        product_description:  (document.getElementById("product_description") as HTMLInputElement).value,
        image_data: selectedFile
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
        <div className={styles.form_group}>
        <label htmlFor="first">Generate a social media marketing post</label>
        <textarea 
            className={styles.prompt_box}
            id="product_description"
            name="product_description"
            placeholder="Describe what you're trying to market"
             required />
        <div>
        <label htmlFor="seed_image">Upload image to generate variations</label>
          <input type="file" accept="image/*" onChange={handleFileSelect} />
        </div>
        <button type="submit" className={styles.submit}>Generate</button>
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
        <img className={styles.image} id="response_image" src={responseSrc}></img>
        </div>
      </form>
    );
  }