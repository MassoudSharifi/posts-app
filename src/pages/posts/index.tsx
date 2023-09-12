import { Row, Col, List, Typography, Spin } from "antd";
import { Link } from "react-router-dom";
import { useGetPosts } from "../../hooks/use-get-posts";

const { Title } = Typography;
function PostsPage() {
  const { data, isLoading, error } = useGetPosts();

  if (isLoading || error) {
    return (
      <Row style={{ height: "100vh" }} justify="center" align="middle">
        {isLoading ? <Spin size="large" /> : "An error has occurred: "}
      </Row>
    );
  }

  return (
    <Row justify="center">
      <Col flex="600px" style={{ paddingBottom: "40px" }}>
        <Title>Posts</Title>
        <List
          pagination={{
            position: "bottom",
            align: "end",
            pageSize: 5,
            showSizeChanger: false,
          }}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(
            post: { title: string; id: string; body: string },
            index
          ) => (
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

export default PostsPage;
