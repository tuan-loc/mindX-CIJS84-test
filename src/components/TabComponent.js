import { Button, Divider, List } from "antd";
import React from "react";
import ListTaskComponent from "./ListTaskComponent";
import TaskItemComponent from "./TaskItemComponent";
import AddComponent from "./AddComponent";

const TabComponent = ({
  icon = false,
  addTask = false,
  handleAddNewTask,
  content,
  setContent,
  tasks,
  handleDeleteTask,
  handleCompleteTask,
  handleDeleteAll,
}) => {
  return (
    <>
      {addTask && (
        <AddComponent
          handleAddNewTask={handleAddNewTask}
          content={content}
          setContent={setContent}
        />
      )}
      <Divider />

      <ListTaskComponent>
        {tasks?.length > 0 ? (
          <List
            itemLayout="horizontal"
            dataSource={tasks}
            renderItem={(item, index) => (
              <TaskItemComponent
                item={item}
                index={index}
                onDelete={(index) => handleDeleteTask(index)}
                onCompleted={(item) => handleCompleteTask(item)}
                icon={icon}
              />
            )}
          />
        ) : null}
        {tasks?.filter((task) => task.isCompleted === true).length > 0 &&
          icon && (
            <div className="d-flex justify-content-end">
              <Button
                danger
                type="primary"
                size="large"
                className="mt-3"
                onClick={() => handleDeleteAll()}
              >
                <i className="fa-regular fa-trash-can me-2"></i>
                Delete all
              </Button>
            </div>
          )}
      </ListTaskComponent>
      <Divider />
    </>
  );
};

export default TabComponent;
