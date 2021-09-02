import React, { useEffect, useState } from 'react'
import { Row, Col, List, Avatar } from 'antd';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';

function VIdeoDetailPage(props) {

    const videoId = props.match.params.videoId
    const [Video, setVideo] = useState([]); //videoDetail
    const [CommentLists, setCommentLists] = useState([]);

    const videoVariable = {
      videoId: videoId,
    };
    


    useEffect(() => { //axios로 리퀭스트 보내기 
         Axios.post("/api/video/getVideo", videoVariable).then((response) => {
           if (response.data.success) {
             console.log(response.data.video);
             setVideo(response.data.video);
           } else {
             alert("Failed to get video Info");
           }
         });
    }, [])

    console.log(Video, "VideoDetail");



  if (Video.writer) {

    const subscribeButton = Video.writer._id !== localStorage.getItem('userId') && 
    <Subscribe
      userTo={Video.writer._id}
      userFrom={localStorage.getItem("userId")}
    />


    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <div style={{ width: "100%", padding: "3rem 4rem" }}>
            <video
              style={{ width: "100%" }}
              src={`http://localhost:5000/${Video.filePath}`}
              controls
            />
            {/*like dislike  */}
            {/*subscriber만을 위한 컴포넌트만들기 */}
            <List.Item
              actions={[subscribeButton]}
              // actions={[
              //   <Subscribe
              //     userTo={Video.writer && Video.writer._id}
              //     userFrom={localStorage.getItem("userId")}
              //   />,
              // ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={Video.writer && Video.writer.image} />}
                title={<a href="https://ant.design">{Video.title}</a>}
                description={Video.description}
              />
            </List.Item>

            {/* Comments */}
            <Comment postId={videoId} />
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return <div>Loading...</div>;
  }

}

export default VIdeoDetailPage
