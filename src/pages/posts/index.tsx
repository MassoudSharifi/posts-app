import { Row, Col, List, Typography, Spin, Button, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useGetPosts } from "../../hooks/use-get-posts";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firbase";

const { Title, Text } = Typography;
function PostsPage() {
  const navigate = useNavigate();
  const { data, isLoading, error, userData } = useGetPosts();

  const handleClickLogout = () => {
    localStorage.removeItem("userData");
    signOut(auth);
    navigate("/");
  };

  if (isLoading || error) {
    return (
      <Row style={styles.loader} justify="center" align="middle">
        {isLoading ? <Spin size="large" /> : "An error has occurred: "}
      </Row>
    );
  }

  return (
    <Row justify="center">
      <Col flex="600px" style={styles.body}>
        <Space align="start" size={15}>
          <Button danger onClick={handleClickLogout}>
            Log Out
          </Button>
          <Space direction="vertical" size={0}>
            <Text strong>User Name</Text>
            <Text>{userData?.username}</Text>
          </Space>
        </Space>
        <Title style={styles.postTitle}>Posts</Title>
        <List
          pagination={{
            position: "bottom",
            align: "end",
            pageSize: 5,
            showSizeChanger: false,
          }}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(post: { title: string; id: string; body: string }) => (
            <List.Item>
              <List.Item.Meta
                title={<Link to={`/posts/${post?.id}`}>{post.title}</Link>}
                description={post?.body}
              />
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
}

const styles = {
  postTitle: { margin: 0 },
  body: { paddingBottom: "40px" },
  loader: { height: "100vh" },
};

export default PostsPage;
