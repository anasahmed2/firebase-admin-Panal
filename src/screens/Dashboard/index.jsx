import { useState } from "react";
import Pricing from "../../component/Pricing";
import { Button } from "@nextui-org/react";
import { storage, ref,  uploadBytesResumable, getDownloadURL } from "../../config/Firebase/index.js"

function Dashboard() {

  const [images, setImages] = useState("");
  const uploadimg = async () => {
    const fileUplaod = document.getElementById("file")
    const imageUrl = await uploadFile(fileUplaod.files[0])
    setImages(imageUrl)
  }


  const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
      const mountainsRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(mountainsRef, file);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          reject(error)
        },
        () => {

          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    })
  }

  return (
    <>
      <div className=" w-full flex-col min-h-[100vh] flex  justify-center items-center">
        <input type="file" id="file" />
        <div className="w-[200px] h-[200px] bg-[#000] mt-5">
          <img src={images && images} className="w-full h-full" id="upload" />
        </div>
        <Button onClick={uploadimg}>upload</Button>
      </div>
      {/* <Pricing/>/ */}
    </>
  )
}

export default Dashboard;