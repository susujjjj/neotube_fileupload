import React, { useState, useEffect } from 'react'
import { Typography, Button, Form, message, Input} from 'antd';
// import Icon from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useSelector } from "react-redux";
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

const PrivateOptions = [
    { value: 0, label: 'Private' },
    { value: 1, label: 'Public' }
]

const CatogoryOptions = [
    { value: 0, label: "Film & Animation" },
    { value: 0, label: "Autos & Vehicles" },
    { value: 0, label: "Music" },
    { value: 0, label: "Pets & Animals" },
    { value: 0, label: "Sports" },
]

function VideoUploadPage(props) {
    const user = useSelector(state => state.user);

    const [VideoTitle, setVideoTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("Film & Animation")
    // const [FilePath, setFilePath] = useState("")
    // const [Duration, setDuration] = useState("")
    // const [Thumbnail, setThumbnail] = useState("")

    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value)
    }

    const onDecsriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }

    const onPrivateChange = (event) => {
        setPrivate(event.currentTarget.value)
    }

    const onCategoryChange = (event) => {
        setCategory(event.currentTarget.value)
    }


    const onDrop = (files) => {

        let formData = new FormData;
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        // console.log(files, "files")
        formData.append("file", files[0])

        Axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data , "response.data")

                    let variable = {
                        url: response.data.url,
                        fileName: response.data.fileName
                    }
                    // setFilePath(resp onse.data.filePath)

                    // //gerenate thumbnail with this filepath ! 

                    Axios.post('/api/video/thumbnail', variable)
                        .then(response => {
                            if (response.data.success) {
                                // setDuration(response.data.fileDuration)
                                // setThumbnail(response.data.thumbsFilePath)
                            } else {
                                alert('Failed to make the thumbnails');
                            }
                        })


                } else {
                    alert('failed to save the video in server')
                }
            })

    }

    // const onSubmit = (event) => {

    //     event.preventDefault();

    //     if (user.userData && !user.userData.isAuth) {
    //         return alert('Please Log in First')
    //     }

    //     if (title === "" || Description === "" ||
    //         Categories === "" || FilePath === "" ||
    //         Duration === "" || Thumbnail === "") {
    //         return alert('Please first fill all the fields')
    //     }

    //     const variables = {
    //         writer: user.userData._id,
    //         title: title,
    //         description: Description,
    //         privacy: privacy,
    //         filePath: FilePath,
    //         category: Categories,
    //         duration: Duration,
    //         thumbnail: Thumbnail
    //     }

    //     axios.post('/api/video/uploadVideo', variables)
    //         .then(response => {
    //             if (response.data.success) {
    //                 alert('video Uploaded Successfully')
    //                 props.history.push('/')
    //             } else {
    //                 alert('Failed to upload video')
    //             }
    //         })

    // }



    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2} > Upload Video</Title>
            </div>


            <Form 
            // onSubmit={onSubmit}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={800000000}>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                {/* <Icon type="plus" style={{ fontSize: '3rem' }} /> */}

                            </div>
                        )}
                    </Dropzone>

                    {/* {Thumbnail !== "" &&
                        <div>
                            <img src={`http://localhost:5000/${Thumbnail}`} alt="haha" />
                        </div>
                    } */}
                </div>

                <br /><br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={VideoTitle}
                />
                <br /><br />
                <label>Description</label>
                <TextArea
                    onChange={onDecsriptionChange}
                    value={Description}
                />
                <br /><br />

                <select 
                onChange={onPrivateChange}
                >
                    {PrivateOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br /><br />

                <select 
                onChange={onCategoryChange}
                >
                    {CatogoryOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br /><br />

                <Button type="primary" size="large" 
                //onClick={onSubmit}
                >
                    Submit
            </Button>

            </Form> 
        </div>
    )
}

export default VideoUploadPage
