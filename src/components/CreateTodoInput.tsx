import { Box, BoxProps, Input, InputGroup, Kbd } from "@chakra-ui/react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Todo } from "../types";
import { useDispatch } from "react-redux";
import { addTodo } from "../app/todos/todosSlice";

interface CreateTodoInputProps extends BoxProps {
  onCreateTodo?: (todoList: Todo[]) => void;
  todoList: Todo[];
}

export const CreateTodoInput = ({
  todoList,
  onCreateTodo,
  ...props
}: CreateTodoInputProps) => {
  const { theme } = useTheme();
  const [todoItem, setTodoItem] = useState("");
  const dispatch = useDispatch();

  const handleCreateTodo = () => {
    if (todoItem.trim() === "") return;
    const newTodo: Todo = {
      id: todoList.length ? todoList.length + 1 : 1,
      text: todoItem,
      completed: false,
    };

    setTodoItem("");
    if (onCreateTodo) {
      onCreateTodo(todoList.length ? [...todoList, newTodo] : [newTodo]);

      dispatch(addTodo({ text: todoItem }));
    }
  };
  return (
    <InputGroup
      startElement={
        <Box flexShrink={0} display={"flex"} alignItems={"center"}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              paddingRight: 12,
              paddingLeft: 8,
            }}
          >
            <circle cx="12" cy="12" r="11.5" stroke="#393A4B" />
          </svg>
        </Box>
      }
      endElement={
        <Kbd variant={"raised"} marginRight={4}>
          Enter
        </Kbd>
      }
      {...props}
    >
      <Input
        id="create-todo-input"
        value={todoItem}
        p={8}
        outline={"none"}
        border={"none"}
        fontSize={20}
        display={"flex"}
        alignItems={"center"}
        color={theme === "light" ? "#393A4B" : "#C8CBE7"}
        placeholder="Create a new todo..."
        colorPalette={"gray"}
        variant={"subtle"}
        boxShadow={"0px 35px 50px -15px rgba(0, 0, 0, 0.5)"}
        borderRadius={"lg"}
        caretColor="#3A7CFD"
        onChange={(e) => setTodoItem(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
            handleCreateTodo();
          }
        }}
      />
    </InputGroup>
  );
};
