import React, { useState } from 'react'

const App = () => {
  const [selectFile , setSelectFile] = useState()
const [text , setText] = useState()
const [texts , setTexts] = useState()


  const handleUpload = async ()=>{

try {
  if(selectFile !== undefined){
    let fr = new FileReader();
  fr.readAsDataURL(selectFile);
  fr.onload=()=>{
      let res = fr.result;
      extractText(res)
     
  }
  }
} catch (error) {
  console.log(error)
}
  }

  const extractText = async (Url)=>{
    try {
      let pdf;
      pdf = await pdfjsLib.getDocument(Url).promise;
      let pages = pdf.numPages;

 
        let page = await pdf.getPage(1); // Get the page object for each page
        let txt = await page.getTextContent(); // Get the text content of the page
        let text = txt?.items?.map((s) => s.str).join(""); // Concatenate the text items into a single string
        setTexts(text); // Add the extracted text to the array
        setText([text]); // Add the extracted text to the array
        console.log(text)
       
      console.log(pages)
    } catch (error) {
      
    }
  }
  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([texts], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "myTextFile.txt";
    document.body.appendChild(element);
    element.click();
  };
  const downloadTxtFileCSV = () => {
    const element = document.createElement("a");
    const file = new Blob([texts], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "myTextFile.csv";
    document.body.appendChild(element);
    element.click();
  };


  return (
    <>
    
    <div className='w-full flex flex-col justify-center items-center h-screen bg-slate-700' >
      <div className='w-1/2 bg-slate-600 h-[600px]  rounded-2xl flex flex-col items-center justify-center ' >
        <h1 className='text-white text-2xl py-4 pb-10' >PDF Converter</h1>
        <input type="file" onChange={(e)=>setSelectFile(e.target.files[0])} className='w-56 text-white' title='Upload Pdf' />
        <button className='px-5 py-2 bg-green-600 text-white rounded-3xl mt-4' onClick={handleUpload} >Upload</button>
        <button className='px-5 py-2 bg-green-600 text-white rounded-3xl mt-4' onClick={downloadTxtFile} >Download Text</button>
        <button className='px-5 py-2 bg-green-600 text-white rounded-3xl mt-4' onClick={downloadTxtFileCSV} >Download CSV</button>
      </div>
      <div className='mt-5 text-gray-300 w-1/2 bg-slate-600 px-3 py-5 rounded-md '>
        <p>
          {text?.map(val=>val)}
          
        </p>
      </div>
    </div>
    </>
  )
}

export default App