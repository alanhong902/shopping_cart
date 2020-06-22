import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "antd";
import PlusOutlined from "@ant-design/icons/PlusOutlined";
import { Row, Col, Divider } from "antd";
export default function MyDropzone(props) {
  const [state, setState] = React.useState({
    imagePath: "",
    imageB64: "",
  });
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files

    var reader = new FileReader();

    var file = acceptedFiles[0];

    reader.onload = function (upload) {
      setState({
        imageB64: upload.target.result,
      });
      props.imagePath(upload.target.result);
    };
    reader.readAsDataURL(file);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <Button className="btnUpload">
                <PlusOutlined />
              </Button>
            ) : (
              <Button className="btnUpload">
                <PlusOutlined />
              </Button>
            )}
          </div>
        </Col>
        <Col className="gutter-row" span={12}>
          {state.imageB64 === "" ? (
            ""
          ) : (
            <img
              src={state.imageB64}
              className="uploadedImage"
              width="300px"
              height="250px"
            />
          )}
        </Col>
      </Row>
    </>
  );
}
