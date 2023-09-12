import { Button, Select, Form, Input, Row, Col } from "antd";

type FieldType = {
  username?: string;
  userId?: string;
};
export default function LoginPage() {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const userIds = new Array(10).fill(null).map((_, index) => ({
    label: index + 1 + "",
    value: index + 1,
  }));
  return (
    <Row style={{ height: "95vh" }} justify="center" align="middle">
      <Col
        flex="333px"
        style={{
          backgroundColor: "lightgray",
          padding: "24px",
          borderRadius: "12px",
        }}
      >
        <Form
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="User Id"
            name="userId"
            rules={[{ required: true, message: "Please select one user id" }]}
          >
            <Select options={userIds} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ marginBottom: "0px" }}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
