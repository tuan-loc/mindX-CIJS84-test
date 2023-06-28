import { Button, Checkbox, List } from "antd";
import React from "react";

function TaskItemComponent(props) {
  const { item, icon, onDelete, onCompleted } = props;

  return (
    <List.Item
      actions={
        icon && [
          <Button danger onClick={() => onDelete(item.id)}>
            <i className="fa-regular fa-trash-can"></i>
          </Button>,
        ]
      }
    >
      <List.Item.Meta
        title={
          <Checkbox
            className={`${item.isCompleted && "text-decoration-line-through"}`}
            checked={item.isCompleted}
            onChange={() => onCompleted(item.id)}
          >
            {item.task}
          </Checkbox>
        }
        description={`Task ID: ${item.id}`}
      />
    </List.Item>
  );
}

export default TaskItemComponent;
