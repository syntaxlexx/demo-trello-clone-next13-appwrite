"use client";

import { useBoardStore } from "@/store/BoardStore";
import { TaskType } from "@/types";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const types: TaskType[] = [
  {
    id: "todo",
    name: "Todo",
    description: "A new task to be completed",
    color: "bg-red-500",
    ringColor: "ring-offset-red-300",
  },
  {
    id: "inprogress",
    name: "In Progress",
    description: "A task that is currently being worked on",
    color: "bg-yellow-500",
    ringColor: "ring-offset-yellow-300",
  },
  {
    id: "done",
    name: "Done",
    description: "A task that has been completed",
    color: "bg-green-500",
    ringColor: "ring-offset-green-300",
  },
];

function TaskTypeRadioGroup() {
  const [newTaskType, setNewTaskType] = useBoardStore((state) => [
    state.newTaskType,
    state.setNewTaskType,
  ]);

  return (
    <div className="w-full py-5">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={newTaskType} onChange={(e) => setNewTaskType(e)}>
          <div className="space-y-2">
            {types.map((type) => (
              <RadioGroup.Option
                key={type.id}
                value={type.id}
                className={({ active, checked }) =>
                  `${
                    active
                      ? `ring-2 ring-white ring-opacity-60 ring-offset-2  ${type.ringColor}`
                      : ""
                  }
                  ${
                    checked
                      ? `${type.color} bg-opacity-75 text-white`
                      : "bg-white"
                  }
                  relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none 
                  `
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium ${
                              checked ? "text-white" : "text-gray-900"
                            }`}
                          >
                            <span>{type.name}</span>
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? "text-white" : "text-gray-500"
                            }`}
                          >
                            <span>{type.description}</span>
                          </RadioGroup.Description>
                        </div>
                      </div>

                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckCircleIcon className="h-6 w-6"></CheckCircleIcon>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

export default TaskTypeRadioGroup;
