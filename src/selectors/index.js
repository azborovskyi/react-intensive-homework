export const getAllTasks = (state) => state.tasks;

export const getTask = (state, taskId) => {
    const tasks = getAllTasks(state);

    return tasks.find((task) => task.id === taskId);
};
