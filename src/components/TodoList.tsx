import {
  Box,
  BoxProps,
  Button,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { LuGripVertical, LuX } from "react-icons/lu";
import { RadioChecked } from "./icons/RadioChecked";
import { RadioUnchecked } from "./icons/RadioUnchecked";
import { Todo } from "../types";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { CreateTodoInput } from "./CreateTodoInput";

interface TodoListProps extends BoxProps {
  todoList: { id: number; text: string; completed: boolean }[];
}

export const TodoList = ({ todoList, ...props }: TodoListProps) => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  const [parent, todos, _setTodos] = useDragAndDrop<HTMLUListElement, Todo>(
    todoList,
    {
      group: "todoList",
      dragHandle: ".drag-handle",
    }
  );

  return (
    <>
      <CreateTodoInput mt={12} onCreateTodo={_setTodos} todoList={todos} />
      <Box
        divideY="1px"
        divideStyle={"solid"}
        divideColor={isDarkTheme ? "#393A4B" : "#979797"}
        borderRadius={"md"}
        bg={isDarkTheme ? "gray.800" : "white"}
        boxShadow={"0px 35px 50px -15px rgba(0, 0, 0, 0.5)"}
        {...props}
      >
        <Box
          ref={parent}
          divideY="1px"
          divideStyle={"solid"}
          divideColor={isDarkTheme ? "#393A4B" : "#979797"}
        >
          {todos.map(({ text, id, completed }) => (
            <HStack
              key={id}
              p={4}
              alignItems={"center"}
              justifyContent="space-between"
            >
              <HStack>
                <LuGripVertical className="drag-handle" cursor={"pointer"} />
                <HStack>
                  <IconButton
                    aria-label={
                      completed ? "Mark as incomplete" : "Mark as complete"
                    }
                    variant="ghost"
                    borderRadius={"full"}
                    size="xs"
                    colorScheme={isDarkTheme ? "teal" : "blue"}
                    onClick={() => {
                      _setTodos((prev) =>
                        prev.map((todo) =>
                          todo.id === id
                            ? { ...todo, completed: !todo.completed }
                            : todo
                        )
                      );
                    }}
                  >
                    {completed ? <RadioChecked /> : <RadioUnchecked />}
                  </IconButton>
                  <Text
                    textDecoration={completed ? "line-through" : "none"}
                    fontSize={"18px"}
                  >
                    {text}
                  </Text>
                </HStack>
              </HStack>
              <IconButton
                aria-label="Delete todo"
                variant="ghost"
                size="xs"
                colorScheme={isDarkTheme ? "red" : "orange"}
                onClick={() => {
                  _setTodos((prev) => prev.filter((todo) => todo.id !== id));
                }}
              >
                <LuX />
              </IconButton>
            </HStack>
          ))}
        </Box>
        {/* Filters count section  */}
        <HStack p={3} justifyContent="space-between" alignItems={"center"}>
          <Text fontSize="sm" color={isDarkTheme ? "gray.400" : "gray.600"}>
            {todos.filter((todo) => !todo.completed).length} items left
          </Text>
          <HStack gap={2}>
            <Button
              variant="plain"
              _hover={{
                color: "#3A7CFD",
              }}
            >
              <Text fontSize="sm">All</Text>
            </Button>
            <Button
              variant="plain"
              _hover={{
                color: "#3A7CFD",
              }}
            >
              <Text fontSize="sm">Active</Text>
            </Button>
            <Button
              variant="plain"
              _hover={{
                color: "#3A7CFD",
              }}
            >
              <Text fontSize="sm">Completed</Text>
            </Button>
          </HStack>
          <Button
            variant="plain"
            _hover={{
              color: "#3A7CFD",
            }}
            onClick={() => {
              _setTodos((prev) => prev.filter((todo) => !todo.completed));
            }}
          >
            <Text fontSize="sm">Clear Completed</Text>
          </Button>
        </HStack>
      </Box>
    </>
  );
};
