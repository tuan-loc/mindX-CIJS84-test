import React, { useEffect, useState } from "react";
import { Tabs, message } from "antd";
import { TabComponent } from "../components";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [content, setContent] = useState("");
  const [taskComplete, setTaskComplete] = useState([]);

  useEffect(() => {
    const lstTask = localStorage.getItem("tasks");
    if (lstTask != null) {
      setTasks(JSON.parse(lstTask));
    } else {
      setTasks([]);
    }
  }, []);

  const handleSetTaskLocal = (tasks) => {
    setTasks(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const handleAddNewTask = () => {
    if (!content) {
      message.error("Please enter task!");
      return;
    }

    const cloneTask = [
      ...tasks,
      {
        id: tasks && tasks.length > 0 ? tasks[tasks.length - 1]?.id + 1 : 1,
        isCompleted: false,
        task: content,
      },
    ];
    handleSetTaskLocal(cloneTask);
    message.success(`Task ${content} added!`);
    setContent("");
  };

  const handleDeleteTask = (id) => {
    const cloneTask = [...tasks];
    const taskContent = cloneTask.find((task) => task.id === id).content;
    const indexTask = cloneTask.findIndex((task) => task.id === id);
    cloneTask.splice(indexTask, 1);
    handleSetTaskLocal(cloneTask);
    message.info(`Deleted task ${taskContent}`);
  };

  const handleCompleteTask = (id) => {
    const cloneTask = [...tasks];
    let findTask = cloneTask?.find((task) => task.id === id);
    findTask.isCompleted = !findTask.isCompleted;
    handleSetTaskLocal(cloneTask);
    message.info(`Change task state!`);
  };

  const handleDeleteAll = () => {
    const cloneTask = [...tasks];
    for (let i = 0; i < cloneTask.length; i++) {
      if (cloneTask[i].isCompleted === true) {
        cloneTask.splice(i, 1);
      }
    }
    handleSetTaskLocal(cloneTask);
    message.success(`Deleted all task!`);
  };

  return (
    <Tabs
      defaultActiveKey="1"
      tabBarGutter={120}
      size="large"
      centered
      items={[
        {
          label: `All`,
          key: 1,
          children: (
            <TabComponent
              tabName="all"
              addTask={true}
              handleAddNewTask={handleAddNewTask}
              content={content}
              setContent={setContent}
              tasks={tasks}
              handleDeleteTask={handleDeleteTask}
              handleCompleteTask={handleCompleteTask}
            />
          ),
        },
        {
          label: `Active`,
          key: 2,
          children: (
            <TabComponent
              tabName="active"
              addTask={true}
              tasks={tasks?.filter((task) => task.isCompleted === false)}
              handleAddNewTask={handleAddNewTask}
              content={content}
              setContent={setContent}
              handleDeleteTask={handleDeleteTask}
              handleCompleteTask={handleCompleteTask}
            />
          ),
        },
        {
          label: `Completed`,
          key: 3,
          children: (
            <TabComponent
              tabName="completed"
              icon={true}
              tasks={tasks?.filter((task) => task.isCompleted === true)}
              handleAddNewTask={handleAddNewTask}
              content={content}
              setContent={setContent}
              handleDeleteTask={handleDeleteTask}
              handleCompleteTask={handleCompleteTask}
              handleDeleteAll={handleDeleteAll}
            />
          ),
        },
      ]}
    />
  );
};

export default Home;
