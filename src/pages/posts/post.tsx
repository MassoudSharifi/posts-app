import { useParams } from "react-router-dom";
import { useGetPost } from "../../hooks/user-get-post";
import { Row, Col, Button, Typography, Spin } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;
export default function PostPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetPost(params?.postId as string);

  const handleClickBack = () => {
    navigate("/posts");
  };

  const isNotFound = data?.length === 0;
  if (isLoading || isNotFound || error) {
    return (
      <Row style={styles.loader} justify="center" align="middle">
        {isLoading ? (
          <Spin size="large" />
        ) : isNotFound ? (
          "Sorry, This page does not exist"
        ) : (
          "An error has occurred: "
        )}
      </Row>
    );
  }
  const post = data?.[0];
  return (
    <Row justify="center">
      <Col flex="600px">
        <Button style={styles.backButton} onClick={handleClickBack}>
          Back
        </Button>
        <Title>{post?.title}</Title>
        <Paragraph>{post?.body}</Paragraph>
      </Col>
    </Row>
  );
}

const styles = {
  backButton: { marginTop: "24px" },
  loader: { height: "100vh" },
};
