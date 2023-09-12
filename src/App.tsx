import { Row, Col, List, Typography, Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import "./styles/main.css";
import axios from "axios";

const { Title } = Typography;
function App() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      axios
        .get("https://jsonplaceholder.typicode.com/posts?userId=1")
        .then((res) => res.data),
  });
  console.log(data);
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
                title={<a href="https://ant.design">{post.title}</a>}
                description={post?.body}
              />
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
}

export default App;
