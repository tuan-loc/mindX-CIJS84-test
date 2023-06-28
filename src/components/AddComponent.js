import { Button, Input } from "antd";
import React from "react";

const AddComponent = ({ handleAddNewTask, content, setContent }) => {
  return (
    <div className="d-flex gap-3">
      <Input
        onChange={(val) => {
          setContent(val.target.value);
        }}
        value={content}
        placeholder="Add details"
        size="large"
        allowClear
        onPressEnter={handleAddNewTask}
      />
      <Button type="primary" size="large" onClick={handleAddNewTask}>
        Add
      </Button>
    </div>
  );
};

export default AddComponent;
