'use client';
import Link from "next/link";
import Image from "next/image";
import React, { useState, ChangeEvent, SetStateAction } from "react";

import styles from './Input.module.css';


export default function DescriptionBox() {
    // Handles the submit event on form submit.

    const [prompt, setPrompt] = useState('');
    const [postContent, setPostContent] = useState('');
    const [responseSrc, setResponseSrc] = useState([]);
    const inputFileRef = React.useRef<HTMLInputElement | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confCode, setConfCode] = useState('');

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
      setUsername(event.target.value);
    };
  
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    };

    const handleConfCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
      setConfCode(event.target.value);
    };


    function readFileDataAsBinary(e: ChangeEvent<HTMLInputElement>) {
      if (!e.target.files) throw Error("file is null");
      const file = e.target.files[0];
  
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
  
          reader.onload = (event: any) => {
              resolve(event.target.result);
          };
  
          reader.onerror = (err) => {
              reject(err);
          };
  
          reader.readAsBinaryString(file);
      });
  }

    const handlePrompt = (event: ChangeEvent<HTMLTextAreaElement>) => {
      setPrompt(event.target.value)
    }
    
    const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files && event.target.files[0];
      readFileDataAsBinary(event)
        .then((file_binary: any) => {
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
        product_description:  prompt
      };     
   
      // Send the data to the server in JSON format.
      const JSONdata = JSON.stringify(data);
   
      // API endpoint where we send form data.
   
      // Send the form data to our forms API on Vercel and get a response.
      try {
        const response = await fetch(
          'api/generate_caption',  {
            method: 'POST',
            body: JSONdata,
            headers: {
              'Content-Type': 'application/json',
            },
        });
        if (!response.ok) throw response;
        const result = await response.json();

        console.log(result)
        setPostContent(result.response)
      }catch(e){
        console.error(e);
      }
      
      try {
        const response = await fetch(
          'api/upload_image',  {
          method: 'POST',
          body: selectedFile
        });
        if (!response.ok) throw response;

        const result = await response.json();

        // const image_list = []
        // result.images.forEach(element => image_list.push({
        //   "original": element,
        // }))
      setResponseSrc(result.images || [])
    console.log("returning textarea");
    }catch(e){
      console.error(e);
    }
  };

  const handleInstagramSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      caption:  postContent.replaceAll("\"", ""),
      image_urls:  responseSrc,
      username: username,
      password: password,
      verification_code: confCode
    };
    
    const JSONdata = JSON.stringify(data);

    try {
      const response = await fetch(
        'api/post_instagram',  {
        method: 'POST',
        body: JSONdata,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw response;

      const result = await response.json();

      // const image_list = []
      // result.images.forEach(element => image_list.push({
      //   "original": element,
      // }))
      }catch(e){
        console.error(e);
      }
  };
    return (
      // We pass the event to the handleSubmit() function on submit.
      <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.form_group}>
        <label htmlFor="first">Generate a social media marketing post</label>
        <textarea 
            className={styles.prompt_box}
            id="product_description"
            name="product_description"
            placeholder="Describe what you're trying to market"
            onChange={handlePrompt}
             required />
        <div>
        <label htmlFor="seed_image">Upload image to generate photo variations</label>
          <input type="file" accept="image/png" onChange={handleFileSelect} />
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
        <div>
          <div>
            <div >
              { (typeof responseSrc === 'undefined') ? false: responseSrc.length !== 0 && responseSrc.map((photo, index) => (
                <img className={styles.image} key={index} src={photo} />
            ))}
            </div>
          </div>
        </div>
        </div>
      </form>
      <div>
        <h1>Instagram Login Information</h1>
        <form onSubmit={handleInstagramSubmit} >
          <div>
            <div>
              <label>Username:</label>
              <input type="text" value={username} onChange={handleUsernameChange} />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" value={password} onChange={handlePasswordChange} />
            </div>
            <div>
              <label>Confirmation Code:</label>
              <input type="text" value={confCode} onChange={handleConfCodeChange}  />
            </div>
            <div>
              <button type="submit" className={styles.submit}>Post to Instagram</button>
            </div>
          </div>
        </form>
    </div>
    </div>
    );
  }