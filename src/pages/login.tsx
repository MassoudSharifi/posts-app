import { Button, Form, Input, Row, Col, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../config/firbase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

type FieldType = {
  phoneNumber?: string;
  code?: string;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [showVerification, setShowVerification] = useState(false);
  const [loading, setLoading] = useState(false);

  function onCaptchVerify() {
    //@ts-ignore
    if (!window.recaptchaVerifier) {
      //@ts-ignore
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
        size: "invisible",
        //@ts-ignore
        callback: (response) => {
          console.log(response);
        },
      });
    }
  }

  function onSignUp(values: any) {
    onCaptchVerify();
    setLoading(true);
    //@ts-ignore
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, values?.phoneNumber, appVerifier)
      .then((confirmationResult) => {
        message.success("Successfully sent the Verification code");
        //@ts-ignore
        window.confirmationResult = confirmationResult;
        setShowVerification(true);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }

  function onOTPVerify(values: any) {
    setLoading(true);
    //@ts-ignore
    window?.confirmationResult
      .confirm(values.code)
      .then(() => {
        message.success("User signed in successfully.");
        setLoading(false);
        localStorage.setItem(
          "userData",
          JSON.stringify({ userName: "Massoud", userId: "1" })
        );
        navigate("/posts");
      })
      .catch(() => {
        setLoading(false);
      });
  }

  return (
    <Row style={styles.body} justify="center" align="middle">
      <Col
        flex="333px"
        style={{
          backgroundColor: "lightgray",
          padding: "24px",
          borderRadius: "12px",
        }}
      >
        <div id="sign-in-button"></div>
        <Form
          name="basic"
          onFinish={showVerification ? onOTPVerify : onSignUp}
          autoComplete="off"
          layout="vertical"
        >
          {!showVerification ? (
            <Form.Item<FieldType>
              label="Phone number"
              name="phoneNumber"
              rules={[
                { required: true, message: "Please enter your phone number!" },
              ]}
            >
              <Input />
            </Form.Item>
          ) : (
            <Form.Item<FieldType>
              label="Verification Code"
              name="code"
              rules={[
                {
                  required: true,
                  message: "Please enter your verification code",
                },
              ]}
            >
              <Input />
            </Form.Item>
          )}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={styles.login}
              loading={loading}
            >
              {showVerification ? "SEND" : "Log in"}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

const styles = {
  login: { marginBottom: "0px" },
  body: { height: "95vh" },
};
